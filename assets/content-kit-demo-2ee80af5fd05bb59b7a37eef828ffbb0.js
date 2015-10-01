"use strict";define("content-kit-demo/app",["exports","ember","ember/resolver","ember/load-initializers","content-kit-demo/config/environment"],function(e,t,n,a,d){var o;t["default"].MODEL_FACTORY_INJECTIONS=!0,o=t["default"].Application.extend({modulePrefix:d["default"].modulePrefix,podModulePrefix:d["default"].podModulePrefix,Resolver:n["default"]}),a["default"](o,d["default"].modulePrefix),e["default"]=o}),define("content-kit-demo/components/app-version",["exports","ember-cli-app-version/components/app-version","content-kit-demo/config/environment"],function(e,t,n){var a=n["default"].APP,d=a.name,o=a.version;e["default"]=t["default"].extend({version:o,name:d})}),define("content-kit-demo/components/content-kit-component-card",["exports","ember-content-kit/components/content-kit-component-card/component"],function(e,t){e["default"]=t["default"]}),define("content-kit-demo/components/content-kit-editor",["exports","ember-content-kit/components/content-kit-editor/component"],function(e,t){e["default"]=t["default"]}),define("content-kit-demo/components/content-kit-link-prompt",["exports","ember-content-kit/components/content-kit-link-prompt/component"],function(e,t){e["default"]=t["default"]}),define("content-kit-demo/components/content-kit-toolbar",["exports","ember-content-kit/components/content-kit-toolbar/component"],function(e,t){e["default"]=t["default"]}),define("content-kit-demo/components/mobiledoc-dom-renderer",["exports","ember","content-kit-demo/mobiledoc-cards/index"],function(e,t,n){var a=t["default"].computed,d=t["default"].run;e["default"]=t["default"].Component.extend({domRenderer:a(function(){return new window.MobiledocDOMRenderer}),didRender:function(){var e=this,t=this.get("domRenderer"),a=this.get("mobiledoc");d(function(){var d=e.$(".rendered-mobiledoc");d.empty(),a&&t.render(a,d[0],n.cardsHash)})}})}),define("content-kit-demo/components/tether-to-selection",["exports","ember-content-kit/components/tether-to-selection/component"],function(e,t){e["default"]=t["default"]}),define("content-kit-demo/controllers/array",["exports","ember"],function(e,t){e["default"]=t["default"].Controller}),define("content-kit-demo/controllers/index",["exports","ember","content-kit-demo/mobiledocs/index"],function(e,t,n){var a=t["default"].$,d=t["default"].computed;e["default"]=t["default"].Controller.extend({mobiledocName:"simple",mobiledoc:d("mobiledocName",function(){return n[this.get("mobiledocName")]}),editedMobiledoc:d("mobiledoc",function(){return this.get("mobiledoc")}),actions:{changeMobiledoc:function(){var e=a("#select-mobiledoc"),t=e.val();this.set("mobiledocName",t);var n=this.get("mobiledoc");this.set("editedMobiledoc",n)},didEdit:function(e){this.set("editedMobiledoc",e)}}})}),define("content-kit-demo/controllers/object",["exports","ember"],function(e,t){e["default"]=t["default"].Controller}),define("content-kit-demo/helpers/content-kit-cards-list",["exports","ember","content-kit-demo/mobiledoc-cards/index"],function(e,t,n){function a(){return n.cardsList}e.contentKitCardsList=a,e["default"]=t["default"].Helper.helper(a)}),define("content-kit-demo/helpers/format-object",["exports","ember"],function(e,t){function n(e){var t=a(e,1),n=t[0];return JSON.stringify(n,null,"  ")}e.formatObject=n;var a=function(){function e(e,t){var n=[],a=!0,d=!1,o=void 0;try{for(var i,r=e[Symbol.iterator]();!(a=(i=r.next()).done)&&(n.push(i.value),!t||n.length!==t);a=!0);}catch(l){d=!0,o=l}finally{try{!a&&r["return"]&&r["return"]()}finally{if(d)throw o}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();e["default"]=t["default"].Helper.helper(n)}),define("content-kit-demo/helpers/hash",["exports","ember-content-kit/helpers/hash"],function(e,t){e["default"]=t["default"],e.hash=t.hash}),define("content-kit-demo/helpers/in-array",["exports","ember-content-kit/helpers/in-array"],function(e,t){e["default"]=t["default"],e.inArray=t.inArray}),define("content-kit-demo/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","content-kit-demo/config/environment"],function(e,t,n){var a=n["default"].APP,d=a.name,o=a.version;e["default"]={name:"App Version",initialize:t["default"](d,o)}}),define("content-kit-demo/initializers/export-application-global",["exports","ember","content-kit-demo/config/environment"],function(e,t,n){function a(){var e=arguments[1]||arguments[0];if(n["default"].exportApplicationGlobal!==!1){var a,d=n["default"].exportApplicationGlobal;a="string"==typeof d?d:t["default"].String.classify(n["default"].modulePrefix),window[a]||(window[a]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete window[a]}}))}}e.initialize=a,e["default"]={name:"export-application-global",initialize:a}}),define("content-kit-demo/mobiledoc-cards/index",["exports","content-kit-demo/mobiledoc-cards/input","content-kit-demo/mobiledoc-cards/simple","content-kit-demo/mobiledoc-cards/selfie"],function(e,t,n,a){function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var o,i=[t.inputCard,n.simpleCard,a.selfieCard],r=(o={},d(o,"input-card",t.inputCard),d(o,"simple-card",n.simpleCard),d(o,"selfie-card",a.selfieCard),o);e.cardsList=i,e.cardsHash=r}),define("content-kit-demo/mobiledoc-cards/input",["exports","ember"],function(e,t){var n=t["default"].$,a={name:"input-card",display:{setup:function(e,t,a,d){n(e).empty();var o="I am in display mode";d.name&&(o="Hello, "+d.name+"!");var i=document.createElement("div");i.innerText=o;var r=document.createElement("button");r.innerText="Edit",r.onclick=a.edit,a.edit&&i.appendChild(r),e.appendChild(i)}},edit:{setup:function(e,t,a){n(e).empty();var d=document.createElement("div");d.innerHTML="What is your name?";var o=document.createElement("input");o.placeholder="Enter your name...";var i=document.createElement("button");i.innerText="Save",i.onclick=function(){var e=o.value;a.save({name:e})},d.appendChild(o),d.appendChild(i),e.appendChild(d)}}};e.inputCard=a}),define("content-kit-demo/mobiledoc-cards/selfie",["exports","ember"],function(e,t){var n=t["default"].$,a={name:"selfie-card",display:{setup:function(e,t,a,d){n(e).empty(),d.src?e.appendChild(n('<div><img src="'+d.src+'"><br><div>You look nice today.</div>'+(a.edit?"<div><button id='go-edit'>Take a better picture</button></div>":"")+"</div>")[0]):e.appendChild(n("<div>Hello there!"+(a.edit?"<button id='go-edit'>Click here to take a picture</button>":"")+"</div>")[0]),n("#go-edit").click(function(){a.edit()})}},edit:{setup:function(e,t,a){n(e).empty();var d=n('<div><video id="video" width="160" height="120" autoplay></video><button id="snap">Snap Photo</button><canvas id="canvas" width="160" height="120"></canvas></div>');e.appendChild(d[0]);var o=document.getElementById("canvas"),i=o.getContext("2d"),r=document.getElementById("video"),l={video:!0},c=function(){alert("error getting video feed")};navigator.getMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia,navigator.getMedia(l,function(e){var t;navigator.mozGetUserMedia?r.mozSrcObject=e:(t=window.URL||window.webkitURL,r.src=t.createObjectURL(e),r.play()),n("#snap").click(function(){i.drawImage(r,0,0,160,120);var e=o.toDataURL("image/png");a.save({src:e})})},c)}}};e.selfieCard=a}),define("content-kit-demo/mobiledoc-cards/simple",["exports","ember"],function(e,t){var n=t["default"].$,a={name:"simple-card",display:{setup:function(e,t,a){var d=document.createElement("span");d.innerHTML="Hello, world",e.appendChild(d);var o=n("<button>Remove card</button>");o.on("click",a.remove),n(e).append(o)}}};e.simpleCard=a}),define("content-kit-demo/mobiledocs/empty",["exports"],function(e){var t={version:"0.2.0",sections:[[],[]]};e.empty=t}),define("content-kit-demo/mobiledocs/index",["exports","content-kit-demo/mobiledocs/simple","content-kit-demo/mobiledocs/empty","content-kit-demo/mobiledocs/simple-list","content-kit-demo/mobiledocs/simple-card","content-kit-demo/mobiledocs/input-card","content-kit-demo/mobiledocs/selfie-card"],function(e,t,n,a,d,o,i){e.simple=t.simple,e.empty=n.empty,e.simpleList=a.simpleList,e.simpleCard=d.simpleCard,e.inputCard=o.inputCard,e.selfieCard=i.selfieCard}),define("content-kit-demo/mobiledocs/input-card",["exports"],function(e){var t={version:"0.2.0",sections:[[],[[1,"H2",[[[],0,"Input Card"]]],[10,"input-card"],[1,"P",[[[],0,"Text after the card."]]]]]};e.inputCard=t}),define("content-kit-demo/mobiledocs/selfie-card",["exports"],function(e){var t={version:"0.2.0",sections:[[],[[1,"H2",[[[],0,"Selfie Card"]]],[10,"selfie-card"]]]};e.selfieCard=t}),define("content-kit-demo/mobiledocs/simple-card",["exports"],function(e){var t={version:"0.2.0",sections:[[],[[10,"simple-card"]]]};e.simpleCard=t}),define("content-kit-demo/mobiledocs/simple-list",["exports"],function(e){var t={version:"0.2.0",sections:[[],[[1,"H2",[[[],0,"To do today:"]]],[3,"ul",[[[[],0,"buy milk"]],[[[],0,"water plants"]],[[[],0,"world domination"]]]]]]};e.simpleList=t}),define("content-kit-demo/mobiledocs/simple",["exports"],function(e){var t={version:"0.2.0",sections:[[],[[1,"H2",[[[],0,"headline h2"]]],[1,"P",[[[],0,"hello world"]]]]]};e.simple=t}),define("content-kit-demo/router",["exports","ember","content-kit-demo/config/environment"],function(e,t,n){var a=t["default"].Router.extend({location:n["default"].locationType});a.map(function(){}),e["default"]=a}),define("content-kit-demo/templates/application",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@1.13.7",loc:{source:null,start:{line:1,column:0},end:{line:8,column:0}},moduleName:"content-kit-demo/templates/application.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createElement("div");e.setAttribute(n,"class","section");var a=e.createTextNode("\n  ");e.appendChild(n,a);var a=e.createElement("h1"),d=e.createTextNode("Content-Kit");e.appendChild(a,d);var d=e.createElement("span");e.setAttribute(d,"class","headline-note");var o=e.createTextNode("alpha!");e.appendChild(d,o),e.appendChild(a,d),e.appendChild(n,a);var a=e.createTextNode("\n  ");e.appendChild(n,a);var a=e.createElement("p");e.setAttribute(a,"class","subheadline");var d=e.createTextNode("A WYSIWYG editor for rich content");e.appendChild(a,d),e.appendChild(n,a);var a=e.createTextNode("\n");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createElement("hr");e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(1);return a[0]=e.createMorphAt(t,4,4,n),a},statements:[["content","outlet",["loc",[null,[7,0],[7,10]]]]],locals:[],templates:[]}}())}),define("content-kit-demo/templates/components/mobiledoc-dom-renderer",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@1.13.7",loc:{source:null,start:{line:1,column:0},end:{line:3,column:0}},moduleName:"content-kit-demo/templates/components/mobiledoc-dom-renderer.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createElement("div");e.setAttribute(n,"class","rendered-mobiledoc");var a=e.createTextNode("\n");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}())}),define("content-kit-demo/templates/index",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{meta:{revision:"Ember@1.13.7",loc:{source:null,start:{line:28,column:6},end:{line:35,column:6}},moduleName:"content-kit-demo/templates/index.hbs"},arity:1,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("        ");e.appendChild(t,n);var n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(1);return a[0]=e.createMorphAt(t,1,1,n),a},statements:[["inline","content-kit-toolbar",[],["contentKit",["subexpr","@mut",[["get","contentKit",["loc",[null,[34,41],[34,51]]]]],[],[]]],["loc",[null,[34,8],[34,53]]]]],locals:["contentKit"],templates:[]}}();return{meta:{revision:"Ember@1.13.7",loc:{source:null,start:{line:1,column:0},end:{line:55,column:0}},moduleName:"content-kit-demo/templates/index.hbs"},arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createElement("div");e.setAttribute(n,"class","section");var a=e.createTextNode("\n  ");e.appendChild(n,a);var a=e.createElement("p"),d=e.createTextNode("\n    Content-Kit is a publishing solution designed for both text and\n    dynamically rendered cards. Posts are serialized into ");e.appendChild(a,d);var d=e.createElement("a");e.setAttribute(d,"href","https://github.com/bustlelabs/content-kit-editor/blob/master/MOBILEDOC.md");var o=e.createTextNode("Mobiledoc");e.appendChild(d,o),e.appendChild(a,d);var d=e.createTextNode(", and\n    rendered to DOM in a reader's browser.\n  ");e.appendChild(a,d),e.appendChild(n,a);var a=e.createTextNode("\n  ");e.appendChild(n,a);var a=e.createElement("p"),d=e.createTextNode("\n    Read more on the ");e.appendChild(a,d);var d=e.createElement("a");e.setAttribute(d,"href","https://github.com/bustlelabs/content-kit-editor");var o=e.createTextNode("content-kit-editor");e.appendChild(d,o),e.appendChild(a,d);var d=e.createTextNode("\n    GitHub repo, or on the ");e.appendChild(a,d);var d=e.createElement("a");e.setAttribute(d,"href","http://madhatted.com/2015/7/31/announcing-content-kit-and-mobiledoc");var o=e.createTextNode("announcement blog post");e.appendChild(d,o),e.appendChild(a,d);var d=e.createTextNode(".\n  ");e.appendChild(a,d),e.appendChild(n,a);var a=e.createTextNode("\n");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createElement("div");e.setAttribute(n,"class","section");var a=e.createTextNode("\n  ");e.appendChild(n,a);var a=e.createElement("br");e.appendChild(n,a);var a=e.createTextNode("\n  ");e.appendChild(n,a);var a=e.createElement("h2"),d=e.createTextNode("Try a Demo");e.appendChild(a,d),e.appendChild(n,a);var a=e.createTextNode("\n");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createElement("div");e.setAttribute(n,"class","container");var a=e.createTextNode("\n  ");e.appendChild(n,a);var a=e.createElement("div");e.setAttribute(a,"class","pane");var d=e.createTextNode("\n    ");e.appendChild(a,d);var d=e.createElement("div");e.setAttribute(d,"class","output full-left");var o=e.createTextNode("\n      ");e.appendChild(d,o);var o=e.createElement("select");e.setAttribute(o,"id","select-mobiledoc");var i=e.createTextNode("\n        ");e.appendChild(o,i);var i=e.createElement("option");e.setAttribute(i,"disabled","");var r=e.createTextNode("Load a new Mobiledoc");e.appendChild(i,r),e.appendChild(o,i);var i=e.createTextNode("\n        ");e.appendChild(o,i);var i=e.createElement("option");e.setAttribute(i,"value","simple");var r=e.createTextNode("Simple text content");e.appendChild(i,r),e.appendChild(o,i);var i=e.createTextNode("\n        ");e.appendChild(o,i);var i=e.createElement("option");e.setAttribute(i,"value","empty");var r=e.createTextNode("Empty mobiledoc");e.appendChild(i,r),e.appendChild(o,i);var i=e.createTextNode("\n        ");e.appendChild(o,i);var i=e.createElement("option");e.setAttribute(i,"value","simpleList");var r=e.createTextNode("List example");e.appendChild(i,r),e.appendChild(o,i);var i=e.createTextNode("\n        ");e.appendChild(o,i);var i=e.createElement("option");e.setAttribute(i,"value","simpleCard");var r=e.createTextNode("Simple Card");e.appendChild(i,r),e.appendChild(o,i);var i=e.createTextNode("\n        ");e.appendChild(o,i);var i=e.createElement("option");e.setAttribute(i,"value","inputCard");var r=e.createTextNode("Card with Input");e.appendChild(i,r),e.appendChild(o,i);var i=e.createTextNode("\n        ");e.appendChild(o,i);var i=e.createElement("option");e.setAttribute(i,"value","selfieCard");var r=e.createTextNode("Selfie Card");e.appendChild(i,r),e.appendChild(o,i);var i=e.createTextNode("\n      ");e.appendChild(o,i),e.appendChild(d,o);var o=e.createTextNode("\n");e.appendChild(d,o);var o=e.createComment("");e.appendChild(d,o);var o=e.createTextNode("    ");e.appendChild(d,o),e.appendChild(a,d);var d=e.createTextNode("\n  ");e.appendChild(a,d),e.appendChild(n,a);var a=e.createTextNode("\n\n  ");e.appendChild(n,a);var a=e.createElement("div");e.setAttribute(a,"class","pane");var d=e.createTextNode("\n    ");e.appendChild(a,d);var d=e.createElement("div");e.setAttribute(d,"class","output");var o=e.createTextNode("\n      ");e.appendChild(d,o);var o=e.createElement("h4"),i=e.createTextNode("Mobiledoc Output");e.appendChild(o,i),e.appendChild(d,o);var o=e.createTextNode("\n      ");e.appendChild(d,o);var o=e.createElement("pre");e.setAttribute(o,"class","serialized-mobiledoc-wrapper");var i=e.createElement("code");e.setAttribute(i,"id","serialized-mobiledoc");var r=e.createComment("");e.appendChild(i,r),e.appendChild(o,i),e.appendChild(d,o);var o=e.createTextNode("\n    ");e.appendChild(d,o),e.appendChild(a,d);var d=e.createTextNode("\n  ");e.appendChild(a,d),e.appendChild(n,a);var a=e.createTextNode("\n  ");e.appendChild(n,a);var a=e.createElement("div");e.setAttribute(a,"class","pane");var d=e.createTextNode("\n    ");e.appendChild(a,d);var d=e.createElement("div");e.setAttribute(d,"class","output full-right");var o=e.createTextNode("\n      ");e.appendChild(d,o);var o=e.createElement("h4"),i=e.createTextNode("Rendered with ");e.appendChild(o,i);var i=e.createElement("a");e.setAttribute(i,"href","https://github.com/bustlelabs/mobiledoc-dom-renderer");var r=e.createTextNode("DOM-Renderer");e.appendChild(i,r),e.appendChild(o,i),e.appendChild(d,o);var o=e.createTextNode("\n      ");e.appendChild(d,o);var o=e.createComment("");e.appendChild(d,o);var o=e.createTextNode("\n    ");e.appendChild(d,o),e.appendChild(a,d);var d=e.createTextNode("\n  ");e.appendChild(a,d),e.appendChild(n,a);var a=e.createTextNode("\n\n");e.appendChild(n,a),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=e.childAt(t,[4]),d=e.childAt(a,[1,1]),o=e.childAt(d,[1]),i=new Array(4);return i[0]=e.createElementMorph(o),i[1]=e.createMorphAt(d,3,3),i[2]=e.createMorphAt(e.childAt(a,[3,1,3,0]),0,0),i[3]=e.createMorphAt(e.childAt(a,[5,1]),3,3),i},statements:[["element","action",["changeMobiledoc"],["on","change","value","target"],["loc",[null,[19,36],[19,91]]]],["block","content-kit-editor",[],["class","post-editor__editor","mobiledoc",["subexpr","@mut",[["get","mobiledoc",["loc",[null,[30,20],[30,29]]]]],[],[]],"cards",["subexpr","content-kit-cards-list",[],[],["loc",[null,[31,16],[31,40]]]],"on-change",["subexpr","action",["didEdit"],[],["loc",[null,[32,20],[32,38]]]]],0,null,["loc",[null,[28,6],[35,29]]]],["inline","format-object",[["get","editedMobiledoc",["loc",[null,[43,24],[43,39]]]]],[],["loc",[null,[43,6],[43,43]]]],["inline","mobiledoc-dom-renderer",[],["mobiledoc",["subexpr","@mut",[["get","editedMobiledoc",["loc",[null,[50,41],[50,56]]]]],[],[]]],["loc",[null,[50,6],[50,58]]]]],locals:[],templates:[e]}}())}),define("content-kit-demo/config/environment",["ember"],function(e){var t="content-kit-demo";try{var n=t+"/config/environment",a=e["default"].$('meta[name="'+n+'"]').attr("content"),d=JSON.parse(unescape(a));return{"default":d}}catch(o){throw new Error('Could not read config from meta tag with name "'+n+'".')}}),runningTests?require("content-kit-demo/tests/test-helper"):require("content-kit-demo/app")["default"].create({name:"content-kit-demo",version:"0.0.0+0be1a85e"});