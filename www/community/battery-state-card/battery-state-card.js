!function(){"use strict";var t=t||Object.getPrototypeOf(customElements.get("home-assistant-main"));const{html:e,css:i}=t.prototype;console.info("%c BATTERY-STATE-CARD %c 1.5.2","color: white; background: forestgreen; font-weight: 700;","color: forestgreen; background: white; font-weight: 700;");const n=(t,e="warn")=>{console[e]("[battery-state-card] "+t)},r=t=>(t=t.replace("#",""),{r:parseInt(t.substr(0,2),16),g:parseInt(t.substr(2,2),16),b:parseInt(t.substr(4,2),16)}),s=t=>!isNaN(Number(t)),o=t=>Array.isArray(t)?t:t?[t]:[],a=(t,e)=>{switch(typeof t){case"string":const i={};return i[e]=t,i;case"object":return Object.assign({},t)}return t},c=t=>t&&e`<div class="secondary">${t}</div>`,l=(t,i)=>t&&e`<div class="icon"><ha-icon style="color:${i}" icon="${t}"></ha-icon></div>`,h=t=>e`<div class="entity-row entity-spacing battery ${t.classNames}" @click="${t.action}">${l(t.icon,t.levelColor)}<div class="name truncate">${t.name} ${c(t.secondary_info)}</div><div class="state">${t.level}${s(t.level)?e` %`:""}</div></div>`,d=(t,i)=>{return e`<ha-card>${t?(n=t,e`<div class="card-header"><div class="truncate">${n}</div></div>`):""}<div class="card-content">${i}</div></ha-card>`;var n},u=i`.clickable{cursor:pointer}.truncate{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.entity-spacing{margin:8px 0}.entity-spacing:first-child{margin-top:0}.entity-spacing:last-child{margin-bottom:0}.entity-row{display:flex;align-items:center}.entity-row .name{flex:1;margin:0 6px}.entity-row .secondary{color:var(--primary-color)}.entity-row .icon{flex:0 0 40px;border-radius:50%;text-align:center;line-height:40px;margin-right:10px}.expandWrapper>.toggler{cursor:pointer}.expandWrapper>.toggler>.name{flex:1}.expandWrapper>.toggler div.chevron{transform:rotate(-90deg);font-size:26px;height:40px;width:40px;display:flex;justify-content:center;align-items:center}.expandWrapper>.toggler .chevron,.expandWrapper>.toggler+div{transition:all .5s ease}.expandWrapper>.toggler.expanded .chevron{transform:rotate(-90deg) scaleX(-1)}.expandWrapper>.toggler+div{overflow:hidden}.expandWrapper>.toggler:not(.expanded)+div{max-height:0!important}`,g={"more-info":t=>{const e=new Event("hass-more-info",{composed:!0});e.detail={entityId:t.entity.entity},t.card.dispatchEvent(e)},navigate:t=>{if(!t.config.navigation_path)return void n("Missing 'navigation_path' for 'navigate' tap action");window.history.pushState(null,"",t.config.navigation_path);const e=new Event("location-changed",{composed:!0});e.detail={replace:!1},window.dispatchEvent(e)},"call-service":t=>{if(!t.config.service)return void n("Missing 'service' for 'call-service' tap action");const[e,i]=t.config.service.split(".",2),r=Object.assign({},t.config.service_data);f.hass.callService(e,i,r)},url:t=>{t.config.url_path?window.location.href=t.config.url_path:n("Missing 'url_path' for 'url' tap action")}};class f{static getAction(t){return t.config&&"none"!=t.config.action?e=>{e.stopPropagation(),t.config.action in g?g[t.config.action](t):n("Unknown tap action type: "+t.config.action)}:null}}class p{constructor(t,e){this.config=t,this.action=e,this._level="Unknown",this._charging=!1,this._secondary_info=null,this._is_hidden=!1,this.updated=!1,this.colorPattern=/^#[A-Fa-f0-9]{6}$/,this.stringValuePattern=/\b([0-9]{1,3})\s?%/,this._name=t.name||t.entity}get entity_id(){return this.config.entity}get data_required_for(){var t;return(null===(t=this.config.charging_state)||void 0===t?void 0:t.entity_id)?[this.config.entity,this.config.charging_state.entity_id]:[this.config.entity]}set name(t){this.updated=this.updated||this._name!=t,this._name=t}get name(){let t=this._name;return o(this.config.bulk_rename).forEach(e=>{t="/"==e.from[0]&&"/"==e.from[e.from.length-1]?t.replace(new RegExp(e.from.substr(1,e.from.length-2)),e.to||""):t.replace(e.from,e.to||"")}),t}set level(t){this.updated=this.updated||this._level!=t,this._level=t}get level(){return this._level}set charging(t){this.updated=this.updated||this.charging!=t,this._charging=t}get charging(){return this._charging}get is_hidden(){return this._is_hidden}set is_hidden(t){this.updated=this.updated||this._is_hidden!=t,this._is_hidden=t}get secondary_info(){return this._secondary_info}set secondary_info(t){this.updated=this.updated||this._secondary_info!=t,this._secondary_info=t}get levelColor(){var t,e;const i="inherit",n=Number(this._level);if(this.charging&&(null===(t=this.config.charging_state)||void 0===t?void 0:t.color))return this.config.charging_state.color;if(isNaN(n)||n>100||n<0)return i;if(this.config.color_gradient&&this.isColorGradientValid(this.config.color_gradient))return function(t,e){e/=100;const i=t.map((e,i)=>({pct:1/(t.length-1)*i,color:r(e)}));let n=1;for(n=1;n<i.length-1&&!(e<i[n].pct);n++);const s=i[n-1],o=i[n],a=o.pct-s.pct,c=(e-s.pct)/a,l=1-c,h=c,d={r:Math.floor(s.color.r*l+o.color.r*h),g:Math.floor(s.color.g*l+o.color.g*h),b:Math.floor(s.color.b*l+o.color.b*h)};return"rgb("+[d.r,d.g,d.b].join(",")+")"}(this.config.color_gradient,n);return(null===(e=(this.config.color_thresholds||[{value:20,color:"var(--label-badge-red)"},{value:55,color:"var(--label-badge-yellow)"},{value:101,color:"var(--label-badge-green)"}]).find(t=>n<=t.value))||void 0===e?void 0:e.color)||i}get icon(){var t;const e=Number(this._level);if(this.charging&&(null===(t=this.config.charging_state)||void 0===t?void 0:t.icon))return this.config.charging_state.icon;if(isNaN(e)||e>100||e<0)return"mdi:battery-unknown";const i=10*Math.round(e/10);switch(i){case 100:return this.charging?"mdi:battery-charging-100":"mdi:battery";case 0:return this.charging?"mdi:battery-charging-outline":"mdi:battery-outline";default:return(this.charging?"mdi:battery-charging-":"mdi:battery-")+i}}get classNames(){const t=[];return this.action&&t.push("clickable"),!s(this.level)&&t.push("non-numeric-state"),t.join(" ")}update(t){const e=t.states[this.config.entity];e?(this.updated=!1,this.name=this.config.name||e.attributes.friendly_name,this.level=this.getLevel(e,t),this.charging=this.getChargingState(t),this.secondary_info=this.setSecondaryInfo(t,e)):n("Entity not found: "+this.config.entity,"error")}getLevel(t,e){var i;const r=e.localize("state.default.unknown");let o;if(this.config.attribute)o=t.attributes[this.config.attribute],null==o&&(n(`Attribute "${this.config.attribute}" doesn't exist on "${this.config.entity}" entity`),o=r);else{const e=[t.attributes.battery_level,t.attributes.battery,t.state];o=(null===(i=e.find(t=>null!=t))||void 0===i?void 0:i.toString())||r}if(this.config.state_map){const t=this.config.state_map.find(t=>t.from==o);null==t?n(`Missing option for '${o}' in 'state_map'`):o=t.to.toString()}if(!s(o)){const t=this.stringValuePattern.exec(o);null!=t&&(o=t[1])}return this.config.multiplier&&s(o)&&(o=(this.config.multiplier*Number(o)).toString()),o=void 0===this.config.value_override?o:this.config.value_override,s(o)||(o=o.charAt(0).toUpperCase()+o.slice(1)),o}getChargingState(t){const e=this.config.charging_state;if(!e)return!1;let i=this.level,r=t.states[this.config.entity];if(e.entity_id){if(r=t.states[e.entity_id],!r)return n(`'charging_state' entity id (${e.entity_id}) not found`),!1;i=r.state}const s=o(e.attribute);if(0!=s.length){const t=s.find(t=>null!=r.attributes[t.name]);return!!t&&(null==t.value||r.attributes[t.name]==t.value)}const a=o(e.state);return 0==a.length?!!i:a.some(t=>t==i)}setSecondaryInfo(t,e){var i;if(this.config.secondary_info){if("charging"==this.config.secondary_info)return this.charging?(null===(i=this.config.charging_state)||void 0===i?void 0:i.secondary_info_text)||"Charging":null;{const i=e[this.config.secondary_info]||e.attributes[this.config.secondary_info]||this.config.secondary_info;return isNaN(Date.parse(i))?i:((t,e)=>{let i=Date.parse(e);if(isNaN(i))return t.localize("ui.components.relative_time.never");i=Math.round((Date.now()-i)/1e3);let n="";return n=i<60?t.localize("ui.components.relative_time.duration.second","count",i):i<3600?t.localize("ui.components.relative_time.duration.minute","count",Math.round(i/60)):i<86400?t.localize("ui.components.relative_time.duration.hour","count",Math.round(i/3600)):i<604800?t.localize("ui.components.relative_time.duration.day","count",Math.round(i/86400)):t.localize("ui.components.relative_time.duration.week","count",Math.round(i/604800)),t.localize("ui.components.relative_time.past","time",n)})(t,i)}}return null}isColorGradientValid(t){if(!(t.length<2)){for(const e of t)if(!this.colorPattern.test(e))return n("Color '${color}' is not valid. Please provide valid HTML hex color in #XXXXXX format."),!1;return!0}n("Value for 'color_gradient' should be an array with at least 2 colors.")}}const v=(t,e,i)=>t.findIndex(t=>{var n,r;if(t.group_id&&!(null===(r=null===(n=i[t.group_id])||void 0===n?void 0:n.entity_id)||void 0===r?void 0:r.some(t=>e.entity_id==t)))return!1;if(t.entities&&!t.entities.some(t=>e.entity_id==t))return!1;const s=isNaN(Number(e.level))?0:Number(e.level);return s>=t.min&&s<=t.max});var m=t=>t.forEach(t=>{null==t.min&&(t.min=0),null!=t.max&&t.max<t.min?n("Collapse group min value should be lower than max.\n"+JSON.stringify(t,null,2)):null==t.max&&(t.max=100)});const y=(t,e=[],i)=>{if((null==i?void 0:i.group_id)&&!t[i.group_id])throw new Error("Group not found: "+i.group_id);let n=null==i?void 0:i.name;!n&&(null==i?void 0:i.group_id)&&(n=t[i.group_id].friendly_name);let r=null==i?void 0:i.icon;return void 0===r&&(null==i?void 0:i.group_id)&&(r=t[i.group_id].icon),{name:n,icon:r,batteries:e,secondary_info:null==i?void 0:i.secondary_info}},_=(t,e)=>t=t.replace(/\{[a-z]+\}/g,t=>{switch(t){case"{min}":return e.batteries.reduce((t,e)=>t>Number(e.level)?Number(e.level):t,100).toString();case"{max}":return e.batteries.reduce((t,e)=>t<Number(e.level)?Number(e.level):t,0).toString();case"{count}":return e.batteries.length.toString();case"{range}":const i=e.batteries.reduce((t,e)=>t>Number(e.level)?Number(e.level):t,100).toString(),n=e.batteries.reduce((t,e)=>t<Number(e.level)?Number(e.level):t,0).toString();return i==n?i:i+"-"+n;default:return t}}),b=["tap_action","state_map","charging_state","secondary_info","color_thresholds","color_gradient","bulk_rename"],x={exists:t=>void 0!==t,contains:(t,e)=>void 0!==t&&-1!=t.toString().indexOf(e.toString()),"=":(t,e)=>t==e,">":(t,e)=>Number(t)>e,"<":(t,e)=>Number(t)<e,">=":(t,e)=>Number(t)>=e,"<=":(t,e)=>Number(t)<=e,matches:(t,e)=>{if(void 0===t)return!1;let i;return"/"==(e=e.toString())[0]&&"/"==e[e.length-1]?i=new RegExp(e.substr(1,e.length-2)):-1!=e.indexOf("*")&&(i=new RegExp("^"+e.replace(/\*/g,".*")+"$")),i?i.test(t.toString()):t===e}};class w{constructor(t){this.config=t}get is_permanent(){return"state"!=this.config.name}isValid(t,e){const i=this.getValue(t,e);return this.meetsExpectations(i)}getValue(t,e){if(this.config.name)return 0==this.config.name.indexOf("attributes.")?t.attributes[this.config.name.substr(11)]:"state"==this.config.name&&void 0!==e?e:t[this.config.name];n("Missing filter 'name' property")}meetsExpectations(t){let e=this.config.operator;if(!e)if(void 0===this.config.value)e="exists";else{const t=this.config.value.toString();e=-1!=t.indexOf("*")||"/"==t[0]&&"/"==t[t.length-1]?"matches":"="}const i=x[e];return i?i(t,this.config.value):(n(`Operator '${this.config.operator}' not supported. Supported operators: ${Object.keys(x).join(", ")}`),!1)}}class N{constructor(t,e){var i,n,r,s;this.config=t,this.cardNode=e,this.batteries=[],this.groupsToResolve=[],this.groupsData={},this.initialized=!1,this.include=null===(n=null===(i=t.filter)||void 0===i?void 0:i.include)||void 0===n?void 0:n.map(t=>new w(t)),this.exclude=null===(s=null===(r=t.filter)||void 0===r?void 0:r.exclude)||void 0===s?void 0:s.map(t=>new w(t)),this.include||(this.initialized=!1),this.processExplicitEntities()}update(t){let e=!1;return this.initialized||(this.initialized=!0,e=this.processGroups(t)||e,e=this.processIncludes(t)||e),e=this.updateBatteries(t)||e,e&&this.processExcludes(t),e}getBatteries(){return((t,e,i)=>{const n={batteries:[],groups:[]};return t?("number"==typeof t?(n.batteries=e.slice(0,t),n.groups.push(y(i,e.slice(t)))):(m(t),e.forEach(e=>{const r=v(t,e,i);-1==r?n.batteries.push(e):(n.groups[r]=n.groups[r]||y(i,[],t[r]),n.groups[r].batteries.push(e))})),n.groups.forEach(t=>{t.name&&(t.name=_(t.name,t)),t.secondary_info&&(t.secondary_info=_(t.secondary_info,t))}),n):(n.batteries=e,n)})(this.config.collapse,this.batteries,this.groupsData)}createBattery(t){return b.filter(e=>null==t[e]).forEach(e=>t[e]=this.config[e]),new p(t,f.getAction({card:this.cardNode,config:a(t.tap_action||this.config.tap_action||null,"action"),entity:t}))}processExplicitEntities(){let t=this.config.entity?[this.config]:(this.config.entities||[]).map(t=>("string"==typeof t&&(t={entity:t}),t));t=t.filter(t=>{if(!t.entity)throw new Error("Invalid configuration - missing property 'entity' on:\n"+JSON.stringify(t));return!t.entity.startsWith("group.")||(this.groupsToResolve.push(t.entity),!1)}),this.config.collapse&&Array.isArray(this.config.collapse)&&this.config.collapse.forEach(e=>{e.group_id?-1==this.groupsToResolve.indexOf(e.group_id)&&this.groupsToResolve.push(e.group_id):e.entities&&e.entities.forEach(e=>{t.some(t=>t.entity==e)||t.push({entity:e})})}),this.batteries=t.map(t=>this.createBattery(t))}processIncludes(t){let e=!1;return this.include?(Object.keys(t.states).forEach(i=>{var n;(null===(n=this.include)||void 0===n?void 0:n.some(e=>e.isValid(t.states[i])))&&!this.batteries.some(t=>t.entity_id==i)&&(e=!0,this.batteries.push(this.createBattery({entity:i})))}),e):e}processGroups(t){let e=!1;return this.groupsToResolve.forEach(i=>{const r=t.states[i];if(!r)return void n(`Group "${i}" not found`);const s=r.attributes;Array.isArray(s.entity_id)?(s.entity_id.forEach(t=>{this.batteries.some(e=>e.entity_id==t)||(e=!0,this.batteries.push(this.createBattery({entity:t})))}),this.groupsData[i]=s):n(`Entities not found in "${i}"`)}),this.groupsToResolve=[],e}processExcludes(t){if(null==this.exclude)return;const e=this.exclude,i=[];this.batteries.forEach((n,r)=>{let s=!1;for(let o of e)o.isValid(t.states[n.entity_id],n.level)&&(o.is_permanent?i.push(r):s=!0);n.is_hidden=s}),i.reverse().forEach(t=>this.batteries.splice(t,1))}updateBatteries(t){let e=!1;if(this.batteries.forEach((i,n)=>{i.update(t),e=e||i.updated}),e){switch(this.config.sort_by_level){case"asc":this.batteries.sort((t,e)=>this.sort(t.level,e.level));break;case"desc":this.batteries.sort((t,e)=>this.sort(e.level,t.level));break;default:this.config.sort_by_level&&n("Unknown sort option. Allowed values: 'asc', 'desc'")}this.batteries=[...this.batteries]}return e}sort(t,e){let i=Number(t),n=Number(e);return i=isNaN(i)?-1:i,n=isNaN(n)?-1:n,i-n}}customElements.define("battery-state-card",class extends t{constructor(){super(...arguments),this.rawConfig="",this.config={},this.simpleView=!1,this.batteryProvider=null,this.cssStyles="",this.triggerRender=function(t,e){let i;return(...e)=>{i&&(clearTimeout(i),i=null),i=setTimeout(()=>t.apply(null,e),100)}}(()=>this.requestUpdate())}static get styles(){return u}setConfig(t){var e;if(!(t.entities||t.entity||(null===(e=t.filter)||void 0===e?void 0:e.include)||Array.isArray(t.collapse)))throw new Error("You need to define entities, filter.include or collapse.group");const i=JSON.stringify(t);this.rawConfig!==i&&(this.rawConfig=i,this.config=JSON.parse(i),this.simpleView=!!this.config.entity,this.batteryProvider=new N(this.config,this),this.triggerRender())}set hass(t){f.hass=t;this.batteryProvider.update(t)&&this.triggerRender()}render(){const t=this.batteryProvider.getBatteries();if(this.simpleView)return h(t.batteries[0]);let i=[];return t.batteries.forEach(t=>!t.is_hidden&&i.push(h(t))),t.groups.forEach(t=>{const n=[];var r,s;t.batteries.forEach(t=>!t.is_hidden&&n.push(h(t))),n.length&&i.push((r=n,s=t,Math.random().toString().substr(2),e`<div class="expandWrapper entity-spacing"><div class="entity-row toggler" @click="${t=>t.currentTarget.classList.toggle("expanded")}">${l(s.icon,s.iconColor)}<div class="name truncate">${s.name} ${c(s.secondary_info)}</div><div class="chevron">‹</div></div><div style="max-height:${50*r.length}">${r}</div></div>`))}),0==i.length?e``:d(this.config.name||this.config.title,i)}updated(){var t;if(!(null===(t=this.config)||void 0===t?void 0:t.style)||this.cssStyles==this.config.style)return;this.cssStyles=this.config.style;let e=this.shadowRoot.querySelector("style");e||(e=document.createElement("style"),e.type="text/css",this.shadowRoot.appendChild(e)),e.innerHTML=((t,e)=>e.replace(/([^\r\n,{}]+)(,(?=[^}]*{)|\s*{)/g,e=>`${t} ${e}`))("ha-card",this.cssStyles)}getCardSize(){var t;let e=(null===(t=this.config.entities)||void 0===t?void 0:t.length)||1;return this.config.collapse?"number"==typeof this.config.collapse?this.config.collapse+1:this.config.collapse.length+1:e+1}})}();
//# sourceMappingURL=battery-state-card.js.map