(function (exports) {
  'use strict';

  var rt=Object.defineProperty,at=Object.defineProperties;var it=Object.getOwnPropertyDescriptors;var _=Object.getOwnPropertySymbols;var ke=Object.prototype.hasOwnProperty,Pe=Object.prototype.propertyIsEnumerable;var ve=(e,t,o)=>t in e?rt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,h=(e,t)=>{for(var o in t||(t={}))ke.call(t,o)&&ve(e,o,t[o]);if(_)for(var o of _(t))Pe.call(t,o)&&ve(e,o,t[o]);return e},P=(e,t)=>at(e,it(t));var Ce=(e,t)=>{var o={};for(var n in e)ke.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(e!=null&&_)for(var n of _(e))t.indexOf(n)<0&&Pe.call(e,n)&&(o[n]=e[n]);return o};var f=(e,t,o)=>new Promise((n,r)=>{var a=l=>{try{i(o.next(l));}catch(d){r(d);}},s=l=>{try{i(o.throw(l));}catch(d){r(d);}},i=l=>l.done?n(l.value):Promise.resolve(l.value).then(a,s);i((o=o.apply(e,t)).next());});var we="fp-session-id",be=typeof window!="undefined",G="xfpsessionid",dt=()=>"10000000-1000-4000-8000-100000000000".replace(/[018]/g,e=>(+e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>+e/4).toString(16)),Se=(e,t)=>new URL(t).searchParams.get(e),lt=e=>{var t,o;try{let n=(o=(t=window==null?void 0:window.top)==null?void 0:t.location)==null?void 0:o.href;return n?Se(e,n):null}catch(n){return null}},B=()=>be?Se(G,window.location.href)||lt(G):null,Ve=()=>{if((!be||!window.sessionStorage))return !1;try{let e="test";return sessionStorage.setItem(e,e),sessionStorage.removeItem(e),!0}catch(e){return !1}},pt=()=>{let e=B()||dt();if(Ve())try{sessionStorage.setItem(we,e);}catch(t){console.error("Failed to create session id",t);}return e},ct=()=>{let e=B();return e||(Ve()?sessionStorage.getItem(we):null)},Ee=()=>ct()||pt(),R=(e,t=Ee())=>{let o=new URL(e);return o.searchParams.set(G,t),o.toString()};var U=Ee;var E="application/x-postmate-v1+json",ut=5,ft=0,yt=function(){return ++ft};var gt=function(t){var o=document.createElement("a");o.href=t;var n=o.protocol.length>4?o.protocol:window.location.protocol,r=o.host.length?o.port==="80"||o.port==="443"?o.hostname:o.host:window.location.host;return o.origin||n+"//"+r},ht={handshake:1,"handshake-reply":1,call:1,emit:1,reply:1,request:1},ee=function(t,o){return !(typeof o=="string"&&t.origin!==o||!t.data||typeof t.data=="object"&&!("postmate"in t.data)||t.data.type!==E||!ht[t.data.postmate])},vt=function(t,o){var n=typeof t[o]=="function"?t[o]():t[o];return O.Promise.resolve(n)},kt=function(){function e(o){var n=this;this.parent=o.parent,this.frame=o.frame,this.child=o.child,this.childOrigin=o.childOrigin,this.events={},this.listener=function(r){if(!ee(r,n.childOrigin))return !1;var a=((r||{}).data||{}).value||{},s=a.data,i=a.name;r.data.postmate==="emit"&&i in n.events&&n.events[i].forEach(function(l){l.call(n,s);});},this.parent.addEventListener("message",this.listener,!1);}var t=e.prototype;return t.get=function(n){var r=this;return new O.Promise(function(a){var s=yt(),i=function l(d){d.data.uid===s&&d.data.postmate==="reply"&&(r.parent.removeEventListener("message",l,!1),a(d.data.value));};r.parent.addEventListener("message",i,!1),r.child.postMessage({postmate:"request",type:E,property:n,uid:s},r.childOrigin);})},t.call=function(n,r){this.child.postMessage({postmate:"call",type:E,property:n,data:r},this.childOrigin);},t.on=function(n,r){this.events[n]||(this.events[n]=[]),this.events[n].push(r);},t.destroy=function(){window.removeEventListener("message",this.listener,!1),this.frame.parentNode.removeChild(this.frame);},e}(),Pt=function(){function e(o){var n=this;this.model=o.model,this.parent=o.parent,this.parentOrigin=o.parentOrigin,this.child=o.child,this.child.addEventListener("message",function(r){if(ee(r,n.parentOrigin)){var a=r.data,s=a.property,i=a.uid,l=a.data;if(r.data.postmate==="call"){s in n.model&&typeof n.model[s]=="function"&&n.model[s](l);return}vt(n.model,s).then(function(d){return r.source.postMessage({property:s,postmate:"reply",type:E,uid:i,value:d},r.origin)});}});}var t=e.prototype;return t.emit=function(n,r){this.parent.postMessage({postmate:"emit",type:E,value:{name:n,data:r}},this.parentOrigin);},e}(),O=function(){function e(o){var n=o.container,r=n===void 0?typeof r!="undefined"?r:document.body:n,a=o.model,s=o.url,i=o.name,l=i===void 0?"":i,d=o.allow,p=o.id,g=o.classListArray,k=g===void 0?[]:g;return this.parent=window,this.frame=document.createElement("iframe"),this.frame.name=l||"",this.frame.classList.add.apply(this.frame.classList,k),d&&(this.frame.allow=d),p&&(this.frame.id=p),r.appendChild(this.frame),this.child=this.frame.contentWindow||this.frame.contentDocument.parentWindow,this.model=a||{},this.sendHandshake(s)}var t=e.prototype;return t.sendHandshake=function(n){var r=this,a=gt(n),s=0,i;return new e.Promise(function(l,d){var p=function m(v){return ee(v,a)?v.data.postmate==="handshake-reply"?(clearInterval(i),r.parent.removeEventListener("message",m,!1),r.childOrigin=v.origin,l(new kt(r))):d("Failed handshake"):!1};r.parent.addEventListener("message",p,!1);var g=function(){if(s++,r.child.postMessage({postmate:"handshake",type:E,model:r.model},a),s===ut)return clearInterval(i),d("Failed to handshake")},k=function(){g(),i=setInterval(g,500);};r.frame.attachEvent?r.frame.attachEvent("onload",k):r.frame.addEventListener("load",k),r.frame.src=n;})},e}();O.debug=!1;O.Promise=function(){try{return window?window.Promise:Promise}catch(e){return null}}();O.Model=function(){function e(o){return this.child=window,this.model=o,this.parent=this.child.parent,this.sendHandshakeReply()}var t=e.prototype;return t.sendHandshakeReply=function(){var n=this;return new O.Promise(function(r,a){var s=function i(l){if(l.data.postmate){if(l.data.postmate==="handshake"){n.child.removeEventListener("message",i,!1),l.source.postMessage({postmate:"handshake-reply",type:E},l.origin),n.parentOrigin=l.origin;var d=l.data.model;return d&&Object.keys(d).forEach(function(p){n.model[p]=d[p];}),r(new Pt(n))}return a("Handshake Reply Failed")}};n.child.addEventListener("message",s,!1);})},e}();var Oe=O;var D="3.15.1";var M=(i=>(i.Auth="auth",i.Components="components",i.Form="form",i.Render="render",i.UpdateLoginMethods="update_login_methods",i.Verify="verify",i.VerifyButton="verify-button",i))(M||{});var K=(s=>(s.auth="auth",s.canceled="canceled",s.clicked="clicked",s.closed="closed",s.completed="completed",s.relayToComponents="relayToComponents",s))(K||{}),N=(s=>(s.formSaveComplete="formSaveComplete",s.formSaveFailed="formSaveFailed",s.formSaved="formSaved",s.propsReceived="propsReceived",s.started="started",s.relayFromComponents="relayFromComponents",s))(N||{});var Ie="footprint-inline-container",Ae="footprint-body-locked",xe="footprint-overlay",wt="footprint-overlay-container",Le=Ie,Fe=xe,Re="footprint-loading-indicator",$=e=>`${wt}-${e}`,I=(e,t)=>`${e}-${t}`,De=e=>f(void 0,null,function*(){te(e),St(e),yield bt(e);}),Ke=e=>{let t=$(e),o=document.getElementById(t);if(o)return o;let n=document.createElement("div");return n.setAttribute("id",t),document.body.appendChild(n),n},bt=e=>f(void 0,null,function*(){let t=$(e),o=document.getElementById(t);if(!o)return;let n=o.querySelector("iframe.footprint-drawer");n&&(n==null||n.classList.add("footprint-drawer-closing"),yield new Promise(i=>{setTimeout(i,300);}));let r=o.querySelector("iframe.footprint-modal");r&&(r==null||r.classList.add("footprint-modal-closing"),yield new Promise(i=>{setTimeout(i,100);}));let a=I(Fe,e),s=document.getElementById(a);s&&(s.classList.add("footprint-overlay-fading"),yield new Promise(i=>{setTimeout(i,200);}),o.remove(),s.remove(),document.body.classList.remove(Ae));}),Te=(e,t)=>{let o=I(Le,e),n=document.createElement("div");return n.classList.add(Ie),n.setAttribute("id",o),t.appendChild(n),n},St=e=>{let t=I(Le,e),o=document.getElementById(t);o&&o.remove();},te=e=>{let t=I(Re,e),o=document.getElementById(t);o&&o.remove();},oe=(e,t)=>{let o=I(Re,t),n=Vt(o);e.appendChild(n);},_e=(e,t)=>{document.body.classList.add(Ae);let o=document.createElement("div"),n=I(Fe,t);return o.setAttribute("id",n),o.classList.add(xe),e.appendChild(o),o},Vt=e=>{let t=document.createElement("div");t.setAttribute("id",e),t.classList.add("footprint-loading-indicator");let o=document.createElement("div");o.classList.add("footprint-loading-spin");let n=document.createElementNS("http://www.w3.org/2000/svg","svg");n.setAttribute("width","24px"),n.setAttribute("height","24px"),n.setAttribute("fill","none"),n.setAttribute("aria-hidden","true");let r=document.createElementNS("http://www.w3.org/2000/svg","path");return r.setAttribute("d","M12 2a10 10 0 0 1 10 10h-2a7.999 7.999 0 0 0-8-8V2Z"),n.appendChild(r),o.appendChild(n),t.appendChild(o),t},Be=e=>{let t=document.getElementById($(e));t&&(t.style.opacity="1",t.style.display="block");},Ue=e=>{let t=document.getElementById($(e));t&&(t.style.opacity="0",t.style.display="none");},ne=(e,t="It looks like there was an issue loading the page. Try reloading and we'll get things back on track.")=>{let o=document.createElement("div");o.classList.add("modal-error-container"),o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),o.setAttribute("aria-label","Oops! Something's not quite right.");let n=document.createElement("div");n.classList.add("modal-error");let r=document.createElement("button");r.setAttribute("aria-label","Close"),r.classList.add("modal-error-close-button"),r.addEventListener("click",()=>{e.remove();});let a=document.createElementNS("http://www.w3.org/2000/svg","svg");a.setAttribute("xmlns","http://www.w3.org/2000/svg"),a.setAttribute("width","20"),a.setAttribute("height","20"),a.setAttribute("viewBox","0 0 20 20"),a.setAttribute("fill","none");let s=document.createElementNS("http://www.w3.org/2000/svg","path");s.setAttribute("d","M5 5L15 15M15 5L5 15"),s.setAttribute("stroke","black"),s.setAttribute("stroke-width","1.5"),s.setAttribute("stroke-linecap","round"),a.appendChild(s),r.appendChild(a);let i=document.createElementNS("http://www.w3.org/2000/svg","svg");i.setAttribute("xmlns","http://www.w3.org/2000/svg"),i.setAttribute("width","40"),i.setAttribute("height","40"),i.setAttribute("viewBox","0 0 40 40"),i.setAttribute("fill","none"),i.setAttribute("class","error-icon");let l=document.createElementNS("http://www.w3.org/2000/svg","path");l.setAttribute("d","M25 15L15 25M25 25L15 15M35 20C35 28.2843 28.2843 35 20 35C11.7157 35 5 28.2843 5 20C5 11.7157 11.7157 5 20 5C28.2843 5 35 11.7157 35 20Z"),l.setAttribute("stroke","black"),l.setAttribute("stroke-width","3.33333"),l.setAttribute("stroke-linecap","round"),l.setAttribute("stroke-linejoin","round"),i.appendChild(l);let d=document.createElement("h2");d.textContent="Oops! Something's not quite right.";let p=document.createElement("p");p.textContent=t,n.appendChild(r),n.appendChild(i),n.appendChild(d),n.appendChild(p),o.appendChild(n),e.appendChild(o);};var Et=()=>Math.random().toString(36).substring(2),H=Et;var j="https://api.onefootprint.com",q=D,z="footprint-js";var w={["auth"]:"auth_v1",["form"]:"form_v1",["render"]:"render_v1",["update_login_methods"]:"update_auth_methods_v1",["verify"]:"verify_v1",["verify-button"]:"verify_button_v1",["components"]:"verify_v1"};var Ot=e=>e.replace(/[A-Z]/g,t=>`_${t.toLowerCase()}`),re=e=>t=>{if(!t||typeof t!="object")return t;let o=Object.entries(t).map(([n,r])=>{let a;return Array.isArray(r)?a=r.map(re(e)):Object(r)===r?a=re(e)(r):a=r,[e(n),a]});return Object.fromEntries(o)},It=re(Ot),J=It;var At=(e,t,o,n)=>{let r={tenantDomain:n,sdkKind:e,sdkName:z,sdkVersion:q,logLevel:o,logMessage:t,sessionId:U()};try{fetch(`${j}/org/sdk_telemetry`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(J(r))});}catch(a){}},W=At;var A=(e,t)=>{let o=`@onefootprint/footprint-js: ${t}`;{let n;try{n=window.location.href;}catch(r){}W(e,t,"info",n);}return o},ie=(e,t)=>{let o=`@onefootprint/footprint-js: ${t}`;{let n;try{n=window.location.href;}catch(r){}W(e,t,"warn",n);}return o},Me=(e,t)=>{let o=`@onefootprint/footprint-js: ${t}`;{let n;try{n=window.location.href;}catch(r){}W(e,t,"error",n);}return o};var Ne={["auth"]:{["canceled"]:"onCancel",["closed"]:"onClose",["completed"]:"onComplete"},["update_login_methods"]:{["canceled"]:"onCancel",["closed"]:"onClose",["completed"]:"onComplete"},["form"]:{["canceled"]:"onCancel",["closed"]:"onClose",["completed"]:"onComplete"},["verify"]:{["auth"]:"onAuth",["canceled"]:"onCancel",["closed"]:"onClose",["completed"]:"onComplete"},["components"]:{["auth"]:"onAuth",["canceled"]:"onCancel",["closed"]:"onClose",["completed"]:"onComplete",["relayToComponents"]:"onRelayToComponents"},["verify-button"]:{["auth"]:"onAuth",["canceled"]:"onCancel",["clicked"]:"onClick",["closed"]:"onClose",["completed"]:"onComplete"},["render"]:{}},$e={["auth"]:[],["form"]:[],["render"]:[],["update_login_methods"]:[],["verify"]:[],["components"]:[],["verify-button"]:[]};var He={["auth"]:["modal","drawer"],["components"]:["modal"],["form"]:["inline","modal","drawer"],["render"]:["inline"],["update_login_methods"]:["modal","drawer"],["verify"]:["modal","drawer"],["verify-button"]:["inline"]},xt=Object.values(K),Lt=(...e)=>{},C=e=>e!=null&&typeof e=="object"&&!Array.isArray(e),se=e=>C(e)&&Object.keys(e).length>0,Ft=(e,t)=>{if(e==="inline"&&!t)throw new Error(`Inline component requires a containerId. Received ${t}`)},Q=(e,t)=>{var r;if(!t)return;let o=(r=He[e])!=null?r:[];if(!o.includes(t))throw new Error(`Invalid variant: ${JSON.stringify(t)}. Valid variants for ${e} are ${o.join(", ")}`)},x=e=>{var o;let t=(o=He[e])!=null?o:[];if(!t.length)throw new Error(`Invalid kind: ${e}`);return t[0]},X=e=>{if(!e)throw new Error("Kind is required");let t=Object.values(M);if(!t.includes(e))throw new Error(`Invalid kind: ${e}. Valid kinds are: ${t.join(", ")}`)},je=e=>{if(e.kind==="verify-button"){let t=e,{kind:o,appearance:n,variant:r,dialogVariant:a,onClick:s,label:i,containerId:l}=t,d=Ce(t,["kind","appearance","variant","dialogVariant","onClick","label","containerId"]);return P(h({},d),{variant:a,kind:"verify"})}};var qe=(e,t)=>(Object.prototype.hasOwnProperty.call(e,t)&&typeof e[t]=="function"?e[t]:void 0)||Lt,de=(e,t,o)=>{var i;let{kind:n}=e,r=(i=Ne[n])!=null?i:{},a={},s=je(e);return Object.entries(r).forEach(([l,d])=>{let p=l;if(!xt.includes(p))return;let g=qe(e,d),k=p==="closed"||p==="canceled",m=n==="verify-button"&&p==="clicked";a[p]=v=>{g(v),k&&(t==null||t()),m&&s&&(o==null||o(s));};}),a},T=e=>{let{kind:t,variant:o,containerId:n}=e,r=o||x(t);return X(t),Q(t,o),Ft(r,n),se(e==null?void 0:e.userData)&&console.warn("userData is deprecated and will be removed in the next major version. Please use bootstrapData instead."),P(h({},e),{variant:r})},b=e=>se(e==null?void 0:e.bootstrapData)?{userData:e.bootstrapData}:se(e==null?void 0:e.userData)?{userData:e.userData}:void 0;var Rt=e=>e==="auth";var Dt=e=>e==="update_login_methods";var le=e=>e.kind==="components";var pe=e=>typeof e=="string"&&e.length>0,Y=e=>Rt(e.kind)&&!!("updateLoginMethods"in e&&e.updateLoginMethods)&&!!e.authToken&&/tok_/.test(e.authToken),Kt=e=>Dt(e.kind)&&!!e.authToken&&/tok_/.test(e.authToken),ce=e=>[Y,Kt].some(t=>t(e));var Tt=!1,_t=e=>ce(e)?"update_auth_methods_v1":w[e.kind],Bt=e=>{var o,n;let{kind:t}=e;if(t==="verify"||t==="components")return P(h({},b(e)),{publicKey:e.publicKey,authToken:e.authToken,options:e.options,l10n:e.l10n,fixtureResult:(o=e.sandboxOutcome)==null?void 0:o.overallOutcome,documentFixtureResult:(n=e.sandboxOutcome)==null?void 0:n.documentOutcome,sandboxId:e.sandboxId,isComponentsSdk:t==="components",shouldRelayToComponents:t==="components"?e.shouldRelayToComponents:void 0});if(t==="update_login_methods")return P(h({},b(e)),{authToken:e.authToken,options:e.options,l10n:e.l10n});if(t==="auth")return Y(e)?P(h({},b(e)),{authToken:e.authToken,updateLoginMethods:e.updateLoginMethods,options:e.options,l10n:e.l10n}):e.authToken&&Tt?P(h({},b(e)),{authToken:e.authToken,options:e.options,l10n:e.l10n}):P(h({},b(e)),{publicKey:e.publicKey,options:e.options,l10n:e.l10n});if(t==="form")return {authToken:e.authToken,options:e.options,title:e.title,l10n:e.l10n};if(t==="render")return {authToken:e.authToken,canCopy:e.canCopy,defaultHidden:e.defaultHidden,id:e.id,label:e.label,showHiddenToggle:e.showHiddenToggle,l10n:e.l10n};if(t==="verify-button")return P(h({},b(e)),{publicKey:e.publicKey,options:e.options,authToken:e.authToken,label:e.label,l10n:e.l10n});throw new Error("Invalid kind provided")},Ut=e=>f(void 0,null,function*(){let t=_t(e);A(t,"Sending SDK args");let o=Bt(e),n=yield fetch(`${j}/org/sdk_args`,{method:"POST",headers:{"x-fp-client-version":`${z} ${q} ${t}`.trim(),"Content-Type":"application/json"},body:JSON.stringify({data:J(o),kind:t})});if(!n.ok){let a=yield n.json();throw a.message&&a.support_id?new Error(`${a.message} (Support ID: ${a.support_id})`):new Error("An error occurred while sending SDK args. Please try again later.")}let r=yield n.json();if((r==null?void 0:r.token)===void 0)throw new Error("Token is undefined");return r.token}),ze=Ut;var Je=({fontSrc:e,variables:t={},rules:o={},variant:n}={})=>{let r=()=>Object.keys(t).length?encodeURIComponent(JSON.stringify(t)):void 0,a=()=>Object.keys(o).length?encodeURIComponent(JSON.stringify(o)):void 0;return {fontSrc:e,variables:r(),rules:a(),variant:n}},We=()=>{let e=window.footprintAppearance;return !e||!C(e)?{}:{fontSrc:e.fontSrc,rules:e.rules,variables:e.variables}};var Qe=()=>{var e;return typeof window!="undefined"?((e=window.location)==null?void 0:e.href)||window.location.toString():""},Mt=(e,t)=>{let{appearance:o,kind:n,l10n:r,variant:a}=e,{fontSrc:s,rules:i,variables:l}=Je(o),d=new URLSearchParams;return l&&d.append("variables",l),i&&d.append("rules",i),s&&d.append("font_src",s),r!=null&&r.language&&d.append("lng",r.language),d.append("variant",a||x(n)),`${d.toString()}#${t}`},Nt=(e,t)=>{let{kind:o}=e,n=Mt(e,t),r=`https://components.onefootprint.com/${o}`,a=`https://components2.onefootprint.com/${o}`;if(o==="update_login_methods"&&(r="https://auth.onefootprint.com/user",a="https://auth2.onefootprint.com/user"),o==="auth"&&(r="https://auth.onefootprint.com",a="https://auth2.onefootprint.com"),(o==="verify"||o==="verify-button"||o==="components")&&(r="https://id.onefootprint.com",a="https://id2.onefootprint.com"),!pe(r))throw new Error(`${o}_URL environment variable is not defined.`);return r+=`?${n}`.trim(),a+=`?${n}`.trim(),{url:r,fallbackUrl:a}},Xe=Nt;var $t=e=>{let t=null,o=!1,n,r,{formSaveComplete:a,formSaved:s,formSaveFailed:i,started:l}=N,d=T(e),{variant:p,containerId:g}=d,k=p==="modal"||p==="drawer",m=H();A(w[d.kind],Ht(d));let v=(c,u)=>{var V;let y=Me(w[d.kind],c);(V=d.onError)==null||V.call(d,y),o&&u&&(n(),o=!1);},tt=()=>{if(!t){v("Footprint should be initialized in order to register callback props");return}let c=de(d,n,r);Object.entries(c).forEach(([u,y])=>{t==null||t.on(u,y),t==null||t.on(`${m}:${u}`,y);});},ot=()=>{if(k)return Ke(m);if(!g){v("containerId is required when rendering inline");return}let c=document.getElementById(g);if(!c){v(`Could not find container with id ${g} while rendering footprint`);return}return Te(m,c)},Z=(c,u)=>{if(!u){te(m),t==null||t.frame.classList.remove("fp-hide"),t==null||t.frame.classList.remove(`footprint-${p}-loading`),t==null||t.frame.classList.add(`footprint-${p}-loaded`);return}if(k){let y=_e(c,m);oe(y,m);}else oe(c,m);},fe=()=>{var u;if(!t){v("Footprint should be initialized in order to set up refs");return}if(d.kind!=="form"||!d.getRef)return;let c={save:()=>(t||v("Footprint should be initialized to call ref methods"),new Promise((y,V)=>{t==null||t.on(a,()=>{y();}),t==null||t.on(i,L=>{V(L);}),t==null||t.on(`${m}:${a}`,y),t==null||t.on(`${m}:${i}`,V),t==null||t.call(s);}))};(u=d.getRef)==null||u.call(d,c);},ye=(c,u)=>f(void 0,null,function*(){try{return t=yield new Oe({classListArray:[`footprint-${p}`,`footprint-${p}-loading`,"fp-hide"],container:c,name:`footprint-iframe-${m}`,url:u,allow:"otp-credentials; publickey-credentials-get *; camera *; clipboard-write;",model:{authToken:d.authToken,initId:m,sdkUrl:Qe(),sdkVersion:D||""}}),{success:!0,parentApi:t}}catch(y){return v(`Initializing iframe with ${new URL(u).host} failed with error ${y}`),{success:!1}}}),nt=(V,L)=>f(void 0,[V,L],function*(c,{url:u,fallbackUrl:y}){let F=w[d.kind];A(F,`Initializing iframe with ${new URL(u).host}`);let ge=yield ye(c,u);if(ge.success)return ge.parentApi;A(F,`Initializing iframe with ${new URL(y).host} as fallback`);let he=yield ye(c,y);if(!he.success)throw new Error("Failed to initialize iframe");return he.parentApi});return {relayFromComponents:()=>{t&&(t.call("relayFromComponents"),Be(m));},props:d,isRendered:o,render:()=>f(void 0,null,function*(){if(o){ie(w[d.kind],"Footprint component is already rendered");return}o=!0;let c=ot();if(!c){ie(w[d.kind],"Unable to create container for Footprint component");return}c.hasChildNodes()&&(c.innerHTML=""),Z(c,!0);let u;try{u=yield ze(d);}catch(L){let F=`${L instanceof Error?L.message:"Unknown error"}`;Z(c,!1),ne(c,F),v(`Unable to get SDK args token: ${F}`,!1);return}let{url:y,fallbackUrl:V}=Xe(d,u||"");try{yield nt(c,{url:R(y),fallbackUrl:R(V)}),tt();}catch(L){ne(c),o=!1;}Z(c,!1),t==null||t.on(l,()=>fe()),t==null||t.on(`${m}:${l}`,fe),d.kind==="components"&&(t==null||t.on(`${m}:${"relayToComponents"}`,()=>{Ue(m);}));}),destroy:()=>f(void 0,null,function*(){o&&(o=!1,yield De(m),t&&(t.destroy(),t=null));}),registerOnDestroy:c=>{!c||typeof c!="function"||(n=c);},registerOnRenderSecondary:c=>{!c||typeof c!="function"||(r=c);}}},Ht=e=>{let{variant:t="-",kind:o="-",l10n:n,authToken:r,publicKey:a}=e;return [`variant: ${t}`,`kind: ${o}`,n&&`l10n: ${JSON.stringify(n)}`,`hasAuthToken: ${!!r}`,`publicKey: ${a!=null?a:"-"}`,`sdkVersion: ${D}`].filter(Boolean).join(", ")},me=$t;var S=e=>{let t=T(e);return JSON.stringify(t)},jt=()=>{let e=Object.create(null);return {getOrCreate:a=>{let s=S(a.props),i=Object.values(e).find(l=>S(l.iframe.props)===s);return i?i.iframe:(e[s]={iframe:a,secondaryIframes:{}},a)},getOrCreateSecondary:(a,s)=>{let i=S(a.props),l=S(s.props);if(!e[i])throw new Error("iframe manager: primary iframe does not exist while adding secondary");let{secondaryIframes:d}=e[i],p=Object.values(d).find(g=>S(g.props)===l);return p||(d[l]=s,s)},remove:a=>{let s=S(a.props),i=e[s];i&&(Object.keys(i.secondaryIframes).forEach(l=>{i.secondaryIframes[l].destroy();}),delete e[s]);},removeSecondary:(a,s)=>{let i=S(a.props),l=S(s.props);if(!e[i])throw new Error("iframe manager: primary iframe does not exist while removing secondary");let{secondaryIframes:d}=e[i],p=d[l];p&&(p.destroy(),delete d[l]);}}},Ye=jt;var qt=()=>{let e=Ye();return {init:o=>{let n=me(o),r=()=>f(void 0,null,function*(){e.remove(n),yield n.destroy();}),a=d=>f(void 0,null,function*(){e.removeSecondary(n,d),yield d.destroy();}),s=d=>f(void 0,null,function*(){let p=me(d);p=e.getOrCreateSecondary(n,p),p.registerOnDestroy(()=>{a(p);}),p.render();}),i=()=>f(void 0,null,function*(){n=e.getOrCreate(n),n.registerOnDestroy(r),n.registerOnRenderSecondary(s),yield n.render();}),l={};return le(o)&&(l={relayFromComponents:()=>{n.relayFromComponents();}}),h({render:i,destroy:r},l)}}},zt=qt(),ue=zt;var Jt=e=>{window.setTimeout(e,0);},Wt=e=>{if(typeof window=="undefined")return;let t=r=>{var i;let a=(i=window.footprintCallbacks)!=null?i:{};if(!C(a))throw Error("`window.footprintCallbacks` must be a valid mapping from callback names to functions.");return $e[r].forEach(l=>{if(!a[l])throw Error(`Callback '${l}' must be defined in window.footprintCallbacks`)}),a},o=r=>{var m;let a=r.getAttribute("data-kind");X(a);let s=(m=r.getAttribute("data-variant"))!=null?m:x(a);Q(a,s);let i=We(),l=t(a),d=r.getAttribute("data-props")||"",p;try{p=JSON.parse(d);}catch(v){throw Error("Could not parse `data-props` for footprint.")}if(!C(p))throw Error("`data-props` on the footprint element has to be a valid JSON object stringified.");let g=H();r.setAttribute("id",g),e.init(h(h({kind:a,variant:s,appearance:i,containerId:r.id},l),p)).render();},n=()=>{let r=document.querySelectorAll("[data-footprint]");r.length&&r.forEach(a=>{o(a);});};document.addEventListener("DOMContentLoaded",()=>Jt(n));},Ze=Wt;var Qt="http://test",Ge=e=>f(void 0,null,function*(){let t=yield fetch(`${Qt}/hosted/identify/lite`,{method:"POST",body:JSON.stringify(e)});if(!t.ok)throw Error(t.statusText);return (yield t.json()).user_found}),Xt=e=>f(void 0,null,function*(){if(!C(e))throw new Error("User data must be passed in order to identify an user");let t=e["id.email"],o=e["id.phone_number"];return t&&(yield Ge({email:t}))?!0:o?yield Ge({phone_number:o}):!1}),et=Xt;var _n=ue;Ze(ue);/*! Bundled license information:

  @onefootprint/postmate/build/postmate.es.js:
    (**
      @onefootprint/postmate - A powerful, simple, promise-based postMessage library
      @version v2.1.2
      @link https://github.com/dollarshaveclub/postmate
      @author Jacob Kelley <jakie8@gmail.com>
      @license MIT
    **)
  */

  exports.FootprintComponentKind = M;
  exports.FootprintPrivateEvent = N;
  exports.FootprintPublicEvent = K;
  exports.default = _n;
  exports.identifyFootprintUser = et;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});
