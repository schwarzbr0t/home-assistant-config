"""Turns on speakers and plays Spotify on a playlist.

# Example `apps.yaml` config:
```
start_spotify:
  module: start_spotify
  class: StartSpotify
  speaker: media_player.kef
  speaker_name: "KEF LS50 Wireless"
  playlist: "spotify:playlist:6rPTm9dYftKcFAfwyRqmDZ"
  volume: 0.3
  input_boolean: input_boolean.start_spotify
```
# Example `configuration.yaml`:
```
input_boolean:
  start_spotify:
    name: Start on speakers
    initial: off
    icon: mdi:music
```
"""

from functools import partial

import hassapi as hass

DEFAULT_SPEAKER = "media_player.kef"
DEFAULT_SPEAKER_NAME = "KEF LS50 Wireless"
DEFAULT_PLAYLIST = "spotify:playlist:6rPTm9dYftKcFAfwyRqmDZ"
DEFAULT_VOLUME = 0.3
DEFAULT_INPUT_BOOLEAN = "input_boolean.start_spotify"

DEFAULTS = {
    "speaker": DEFAULT_SPEAKER,
    "speaker_name": DEFAULT_SPEAKER_NAME,
    "playlist": DEFAULT_PLAYLIST,
    "volume": DEFAULT_VOLUME,
    "input_boolean": DEFAULT_INPUT_BOOLEAN,
}


class StartSpotify(hass.Hass):
    def initialize(self):
        self.input_boolean = self.args.get("input_boolean", DEFAULT_INPUT_BOOLEAN)
        self.call_spotify = partial(self.call_service, entity_id="media_player.spotify")
        self.listen_state(self.start_cb, self.input_boolean, new="on")
        self.listen_event(self.start, "start_spotify")
        self._handle = None

    def maybe_default(self, key, kwargs):
        default_value = self.args.get(key, DEFAULTS[key])
        if kwargs is None:
            return default_value
        return kwargs.get(key, default_value)

    def start_cb(self, entity, attribute, old, new, kwargs):
        self.set_state(self.input_boolean, state="off")
        self.start()

    def start(self, event_name=None, data=None, kwargs=None):
        data = data or {}
        data["volume"] = self.maybe_default("volume", data)
        data["speaker"] = self.maybe_default("speaker", data)
        self.fire_event("start_speakers", **data)
        self._handle = self.listen_event(
            self.select_source, "start_speakers_done", timeout=30
        )

    def source_available(self, speaker_name):
        return speaker_name in self.get_state(
            "media_player.spotify", attribute="source_list", default=[]
        )

    def select_source(self, event=None, data=None, kwargs=None):
        self._handle = self.cancel_listen_event(self._handle)
        self.log("Starting `select_source`")
        speaker_name = self.maybe_default("speaker_name", data)
        if not self.source_available(speaker_name):
            self.log("Source not available")
            self.call_spotify("homeassistant/update_entity")
            self.run_in(self.try_again, 1, data=data)
        else:
            self.log("Source is available")
            self.call_spotify("media_player/select_source", source=speaker_name)
            self.start_playlist()

    def try_again(self, kwargs):
        self.log("Starting `try_again`")
        return self.select_source(data=kwargs["data"])

    def start_playlist(self, event=None, data=None, kwargs=None):
        playlist = self.maybe_default("playlist", kwargs)
        self.call_service(
            "spotify/play_playlist", media_content_id=playlist, random_song=True
        )
        self.call_spotify("media_player/media_play")
        self.fire_event("start_spotify_done", **(data or {}))
        self.log("start_spotify_done")