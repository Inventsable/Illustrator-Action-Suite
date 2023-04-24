function extendPrototype(t){var e,n,r;for(e=1;e<arguments.length;++e)for(r in n=arguments[e])n.hasOwnProperty(r)&&(t[r]=n[r]);return t}function ActionParameters(t,e){return extendPrototype(t=t||[],{add:function(){for(var t=0;t<arguments.length;t++)arguments[t].parent=this,arguments[t].typename&&"ActionParameter"==arguments[t].typename?this.push(arguments[t]):arguments[t].typename||this.push(new ActionParameter(arguments[t]));this.parent.parameterCount=this.length},removeAll:function(){for(var t=this.length;t;t--)this.pop();this.parent.parameterCount=this.length}}),t.parent=e,t.typename="ActionParameters",t}function ActionEvents(t,e){return extendPrototype(t=t||[],{add:function(){for(var t=0;t<arguments.length;t++)arguments[t].parent=this,arguments[t].typename&&"ActionEvent"==arguments[t].typename?this.push(arguments[t]):arguments[t].typename||this.push(new ActionEvent(arguments[t]));this.parent.eventCount=this.length},removeAll:function(){for(var t=this.length;t;t--)this.pop();this.parent.eventCount=this.length}}),t.parent=e,t.typename="ActionEvents",t}function Actions(t,e){return extendPrototype(t=t||[],{add:function(){for(var t=0;t<arguments.length;t++)arguments[t].parent=this,arguments[t].typename&&"Action"==arguments[t].typename?this.push(arguments[t]):arguments[t].typename||this.push(new Action(arguments[t]));this.parent.actionCount=this.length},removeAll:function(){for(var t=this.length;t;t--)this.pop();this.parent.actionCount=this.length},getByName:function(t){for(var e=0;e<this.length;e++)if(this[e].name&&this[e].name==t)return this[e];return null}}),t.parent=e||null,t.typename="ActionCollection",t}function ActionParameter(t,e){for(var n in this.typename="ActionParameter",this.parent=e||null,this.key=null,this.showInPalette=-1,this.type=null,this.value=null,t)this[n]=t[n]}function ActionEvent(t,e){for(var n in this.typename="ActionEvent",this.parent=e||null,this.useRulersIn1stQuadrant=0,this.internalName=null,this.localizedName=null,this.isOpen=0,this.isOn=1,this.hasDialog=0,this.parameterCount=0,this.parameters=new ActionParameters([],this),t)if("parameters"==n)for(var r=0;r<t.parameters.length;r++)this.parameters.add(t.parameters[r]);else this[n]=t[n]}function Action(t,e){for(var n in this.parent=e||null,this.typename="Action",this.eventCount=0,this.events=new ActionEvents([],this),t)if("events"==n)for(var r=0;r<t.events.length;r++)this.events.add(t.events[r]);else this[n]=t[n]}function ActionSet(t){var e;this.typename="ActionSet",this.name="",this.version=3,this.isOpen=0,this.actionCount=0,this.actions=new Actions([],this),this.rawtext=null;try{if(/string/i.test(typeof t))ActionBoyIsJSON(t)?e=JSON.parse(t):/^\/version/.test(t)&&(e=i(t));else if(/object/i.test(typeof t))if(t.typename&&/file/i.test(t.typename)){t.encoding="UTF8",t.open("r");var n=t.read();t.close(),e=i(n)}else e=t;if(e)for(var r in e)this[r]=e[r]}catch(t){alert("Construct Error: "+t)}function i(t){try{for(var e=ActionBoyMap(ActionBoyFilter(t.split(/(\r\n|\r|\n)/g),(function(t){return t.replace(/(\r\n|\r|\n)/g,"").length})),(function(t,e,n){var r={raw:t,index:e,depth:/\t/.test(t)?t.match(/\t/gm).length:0,parent:-1,hasBrackets:/[\]\}]/.test(t)};if(r.depth||r.hasBrackets)for(var i=e;i;i--){var o=/\t/.test(n[i])?n[i].match(/\t/gm).length:0;if(r.hasBrackets){var a=/\]/.test(t)&&/\[/.test(n[i]),s=/\}/.test(t)&&/\{/.test(n[i]);if(r.depth!==o)continue;if(s||a){r.parent=i;break}}else if(!r.hasBrackets&&r.depth>o){r.parent=i;break}}return r})),n=[],r=ActionBoyFilter(e,(function(t){return t.parent<0})),i=0;i<r.length;i++)n.push(o(r[i],e));return a(u(n))}catch(t){alert("Convert Error: "+t)}}function o(t,e){try{var n=t;return n.children=ActionBoyMap(ActionBoyFilter(e,(function(e){return e.parent==t.index})),(function(t){return o(t,e)})),n}catch(t){alert("Recurse Schema Error: "+t)}}function a(t,e){try{e=e||0;var n={};if(t&&t.length&&ActionBoyIsArray(t))for(var r=0;r<t.length;r++){var i=t[r];if(/^\/([^\s-]*)-\d{1,}/.test(ActionBoyTrim(i.raw)))if(i&&i.name){var o=i.name.replace(/-.*/,"")+"s";n[o]=n[o]||[],i.children&&i.children.length&&n[o].push(a(i.children,e+1))}else console.log("Something isn't iterating correctly:"),n.errorFlags=n.errorFlags||[],n.errorFlags.push(i);else n[i.name]=s(i.value,i.type)}return n}catch(t){alert("Translate Error: "+t)}}function s(t,e){var n=ActionBoyTrim(t);return n=/hex/i.test(e)?ActionBoyHexToAscii(n=ActionBoyFilter((n=ActionBoyTrim(t.replace(/(\[|\])/gm,""))).split(/\t{1,}/gm),(function(t,e){return t.length&&e&&/^[a-f0-9]*$/.test(t)})).join("")):/decimal/i.test(e)?ActionBoyDecimalToAscii(t):isNaN(Number(t))?t:/^\d{10}$/.test(n)?ActionBoyDecimalToAscii(n):+t}function u(t){try{var e=[];return ActionBoyForEach(t,(function(t){var n={depth:t.depth,raw:t.raw,index:t.index};if(t.children&&t.children.length){if(ActionBoyFilter(t.children,(function(t){return t.children&&t.children.length})).length)n.name=ActionBoyTrim(n.raw).replace(/^\//,""),n.name=n.name.match(/[^-]*-\d{1,}/)[0],n.type="container-A",n.children=u(t.children);else{n.value=n.raw+ActionBoyMap(t.children,(function(t){return t.raw})).join("");var r=ActionBoyTrim(n.value);n.name=/\/([^\s]*)/.exec(r)[1],r=ActionBoyTrim(r.replace(/^\/([^\s]*)/,"")),n.value=r,/\{/.test(n.value)&&/\}/.test(n.value)?(n.type="container-B",r=ActionBoyTrim(r.replace(/^(\{)|(\})$/gm,"")),n.value=r,n.children=ActionBoyMap(r.split(/\t{1,}/gm),(function(t){var e={index:-1,depth:n.depth+1,name:ActionBoyTrim(t).replace(/^\//,"").replace(/\s.*/,""),raw:t,value:ActionBoyTrim(ActionBoyTrim(t).replace(/^\//,"").replace(/^[\s]*/,""))};return new RegExp(e.name).test(e.value)&&(e.value=ActionBoyTrim(e.value.replace(e.name,""))),e.value+""=="null"&&(e.value=ActionBoyTrim(ActionBoyTrim(t).replace(/^\/[^\s]/,""))),e}))):/\[/.test(n.value)&&/\]/.test(n.value)?n.type="hexadecimal":n.type="undefined-A"}e.push(n)}else/^\t*\/[^\s]*/.test(t.raw)&&(n.type="param",n.value=ActionBoyTrim(t.raw),/\/[^\s]*/.test(n.value)?n.name=/\/([^\s]*)/.exec(n.value)[1]:n.name="undefined-B",n.value=ActionBoyTrim(n.value.replace("/"+n.name,"")),/^\d{10}$/.test(n.value)&&(n.type="decimal"),e.push(n))})),e}catch(t){alert("Sanitize Schema Error: "+t)}}}function ActionBoyAsciiToHex(t){for(var e="",n=0;n<t.toString().length;n++)e+=t.toString().charCodeAt(n).toString(16);return e}function ActionBoyAsciiToDecimal(t){return parseInt(ActionBoyAsciiToHex(t),16)}function ActionBoyHexToAscii(t){for(var e="",n=0;n<t.toString().length;n+=2)e+=String.fromCharCode(parseInt(t.toString().substr(n,2),16));return e}function ActionBoyDecimalToAscii(t){return ActionBoyHexToAscii(Number(ActionBoyTrim(t+"")).toString(16))}function ActionBoyIsJSON(t){try{return JSON.parse(t),!0}catch(t){return!1}}function ActionBoyTrim(t){return t.replace(/^\s*|\s*$/gm,"")}function ActionBoyIsArray(t){return"[object Array]"===Object.prototype.toString.call(t)}function ActionBoyMap(t,e){for(var n=[],r=0;r<t.length;r++)n.push(e(t[r],r,t));return n}function ActionBoyObjectKeys(t){var e=[];for(var n in t)e.push(n);return e}function ActionBoyFilter(t,e,n){n=n||!1;for(var r=[],i=0;i<t.length;i++)e(t[i],i,t)&&(n&&console.log("Found match?"),r.push(t[i]));return r}function ActionBoyForEach(t,e){for(var n=0;n<t.length;n++)e(t[n],n,t)}"object"!=typeof JSON&&(JSON={}),function(){"use strict";var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta,rep;function f(t){return t<10?"0"+t:t}function this_value(){return this.valueOf()}function quote(t){return rx_escapable.lastIndex=0,rx_escapable.test(t)?'"'+t.replace(rx_escapable,(function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)}))+'"':'"'+t+'"'}function str(t,e){var n,r,i,o,a,s=gap,u=e[t];switch(u&&"object"==typeof u&&"function"==typeof u.toJSON&&(u=u.toJSON(t)),"function"==typeof rep&&(u=rep.call(e,t,u)),typeof u){case"string":return quote(u);case"number":return isFinite(u)?String(u):"null";case"boolean":case"null":return String(u);case"object":if(!u)return"null";if(gap+=indent,a=[],"[object Array]"===Object.prototype.toString.apply(u)){for(o=u.length,n=0;n<o;n+=1)a[n]=str(n,u)||"null";return i=0===a.length?"[]":gap?"[\n"+gap+a.join(",\n"+gap)+"\n"+s+"]":"["+a.join(",")+"]",gap=s,i}if(rep&&"object"==typeof rep)for(o=rep.length,n=0;n<o;n+=1)"string"==typeof rep[n]&&(i=str(r=rep[n],u))&&a.push(quote(r)+(gap?": ":":")+i);else for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(i=str(r,u))&&a.push(quote(r)+(gap?": ":":")+i);return i=0===a.length?"{}":gap?"{\n"+gap+a.join(",\n"+gap)+"\n"+s+"}":"{"+a.join(",")+"}",gap=s,i}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value),"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,n){var r;if(gap="",indent="","number"==typeof n)for(r=0;r<n;r+=1)indent+=" ";else"string"==typeof n&&(indent=n);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){var j;function walk(t,e){var n,r,i=t[e];if(i&&"object"==typeof i)for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(void 0!==(r=walk(i,n))?i[n]=r:delete i[n]);return reviver.call(t,e,i)}if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,(function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)}))),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(),Action.prototype.run=function(){this.parent&&this.parent.parent?app.doScript(this.name,this.parent.parent.name,!1):alert("Action is not properly mounted to a parent chain of Self > Collection > Set")},ActionSet.prototype={load:function(){alert("Not yet supported")},unload:function(){try{var t=app.unloadAction(this.name,"");return/undefined/i.test(t+"")}catch(t){return!1}},toJSON:function(){return this.getJSONSchema()},toJSONString:function(){return JSON.stringify(this.getJSONSchema())},toAIA:function(){return ActionBoyFilter(function t(e,n,r,i){n=n||"",r=r||0,i=i||null;for(var o="",a=0;a<r;a++)o+="\t";var s=[];for(var u in e)s.push(u);return ActionBoyForEach(s,(function(i,a){var s=function(t,e,n,r){function i(t,e){for(var n=0;n<t.length;n++)if(t[n]==e)return!0;return!1}var o={isEnum:[function(){return i(["actions","events","parameters"],t)}],isHex:[function(){return i(["name"],t)},function(){return i(["localizedName"],t)},function(){return"value"==t&&r.type&&i(["(ustring)"],r.type)}],isDec:[function(){return n>2&&i(["key"],t)}],isReal:[function(){return"value"==t&&r.type&&/real/i.test(r.type)&&!/\./.test(e)}]},a=[];for(var s in o)for(var u=0;u<o[s].length;u++)o[s][u](arguments[0],arguments[1],arguments[2],arguments[3])&&a.push(s);return{isEnum:i(a,"isEnum"),isHex:i(a,"isHex"),isDec:i(a,"isDec"),isReal:i(a,"isReal"),isNone:!a.length}}(i,e[i],r,e);if(s.isNone)n+=o+"/"+i+" "+e[i];else if(s.isReal)n+=o+"/"+i+" "+e[i]+".0";else if(s.isHex){var u=ActionBoyAsciiToHex(e[i]),c=u.length;c>64&&(u=ActionBoyMap(function(t,e){for(var n=Math.ceil(t.length/e),r=new Array(n),i=0,o=0;i<n;++i,o+=e)r[i]=t.substr(o,e);return r}(u,64),(function(t,e){return(e?o+"\t":"")+t})).join("\r\n")),n+=o+"/"+i+" [ "+c/2+"\r\n"+o+"\t"+u+"\r\n"+o+"]"}else if(s.isDec)n+=o+"/"+i+" "+ActionBoyAsciiToDecimal(e[i]);else if(s.isEnum){var l=i.replace(/s$/,"");ActionBoyIsArray(e[i])&&ActionBoyForEach(e[i],(function(i,a){n=t(i,n+=o+"/"+l+"-"+(a+1)+" {\r\n",r+1,e),n+=o+"}\r\n"}))}n+="\r\n"})),n}(this.getJSONSchema()).split("\r\n"),(function(t){return t&&t.length})).join("\r\n")+"\r\n"},getJSONSchema:function(){return function(t){var e,n=new RegExp("^("+["toJSON","load","unload","toJSONString","getJSONSchema","filter","map","forEach","add","removeAll","getByName","typename","rawtext","parent","toAIA"].join("|")+")$"),r={},i=[];for(e in t)n.test(e)||i.push(e);i=function(t,e){function n(t,e){var n=0;for(n=0;n<t.length;n++)if(t[n]==e)return n;return-1}var r={ActionSet:["version","name","isOpen","actionCount","actions"],Action:["name","keyIndex","colorIndex","isOpen","eventCount","events"],ActionEvent:["useRulersIn1stQuadrant","internalName","localizedName","isOpen","isOn","hasDialog","parameterCount","parameters"],ActionParameter:["key","showInPalette","type","value"]};return t.sort((function(t,i){return n(r[e],t)-n(r[e],i)}))}(i,t.typename);for(var o=0;o<i.length;o++)r[i[o]]=t[i[o]];return r}(this)}};for(var sampleSet=new ActionSet("/version 3\r\n/name [ 9\r\n\t73616d706c65536574\r\n]\r\n/isOpen 1\r\n/actionCount 2\r\n/action-1 {\r\n\t/name [ 14\r\n\t\t4170706c7946696c6c436f6c6f72\r\n\t]\r\n\t/keyIndex 8\r\n\t/colorIndex 5\r\n\t/isOpen 0\r\n\t/eventCount 1\r\n\t/event-1 {\r\n\t\t/useRulersIn1stQuadrant 0\r\n\t\t/internalName (ai_plugin_setColor)\r\n\t\t/localizedName [ 9\r\n\t\t\t53657420636f6c6f72\r\n\t\t]\r\n\t\t/isOpen 1\r\n\t\t/isOn 1\r\n\t\t/hasDialog 0\r\n\t\t/parameterCount 6\r\n\t\t/parameter-1 {\r\n\t\t\t/key 1768186740\r\n\t\t\t/showInPalette -1\r\n\t\t\t/type (ustring)\r\n\t\t\t/value [ 10\r\n\t\t\t\t46696c6c20636f6c6f72\r\n\t\t\t]\r\n\t\t}\r\n\t\t/parameter-2 {\r\n\t\t\t/key 1718185068\r\n\t\t\t/showInPalette -1\r\n\t\t\t/type (boolean)\r\n\t\t\t/value 1\r\n\t\t}\r\n\t\t/parameter-3 {\r\n\t\t\t/key 1954115685\r\n\t\t\t/showInPalette -1\r\n\t\t\t/type (enumerated)\r\n\t\t\t/name [ 9\r\n\t\t\t\t52474220636f6c6f72\r\n\t\t\t]\r\n\t\t\t/value 2\r\n\t\t}\r\n\t\t/parameter-4 {\r\n\t\t\t/key 1919247406\r\n\t\t\t/showInPalette -1\r\n\t\t\t/type (real)\r\n\t\t\t/value 234.0\r\n\t\t}\r\n\t\t/parameter-5 {\r\n\t\t\t/key 1735550318\r\n\t\t\t/showInPalette -1\r\n\t\t\t/type (real)\r\n\t\t\t/value 10.0\r\n\t\t}\r\n\t\t/parameter-6 {\r\n\t\t\t/key 1651275109\r\n\t\t\t/showInPalette -1\r\n\t\t\t/type (real)\r\n\t\t\t/value 10.0\r\n\t\t}\r\n\t}\r\n}\r\n/action-2 {\r\n\t/name [ 16\r\n\t\t4170706c795374726f6b65436f6c6f72\r\n\t]\r\n\t/keyIndex 0\r\n\t/colorIndex 0\r\n\t/isOpen 1\r\n\t/eventCount 1\r\n\t/event-1 {\r\n\t\t/useRulersIn1stQuadrant 0\r\n\t\t/internalName (ai_plugin_setColor)\r\n\t\t/localizedName [ 9\r\n\t\t\t53657420636f6c6f72\r\n\t\t]\r\n\t\t/isOpen 0\r\n\t\t/isOn 1\r\n\t\t/hasDialog 0\r\n\t\t/parameterCount 6\r\n\t\t/parameter-1 {\r\n\t\t\t/key 1768186740\r\n\t\t\t/showInPalette -1\r\n\t\t\t/type (ustring)\r\n\t\t\t/value [ 12\r\n\t\t\t\t5374726f6b6520636f6c6f72\r\n\t\t\t]\r\n\t\t}\r\n\t\t/parameter-2 {\r\n\t\t\t/key 1718185068\r\n\t\t\t/showInPalette -1\r\n\t\t\t/type (boolean)\r\n\t\t\t/value 0\r\n\t\t}\r\n\t\t/parameter-3 {\r\n\t\t\t/key 1954115685\r\n\t\t\t/showInPalette -1\r\n\t\t\t/type (enumerated)\r\n\t\t\t/name [ 9\r\n\t\t\t\t52474220636f6c6f72\r\n\t\t\t]\r\n\t\t\t/value 2\r\n\t\t}\r\n\t\t/parameter-4 {\r\n\t\t\t/key 1919247406\r\n\t\t\t/showInPalette -1\r\n\t\t\t/type (real)\r\n\t\t\t/value 239.0\r\n\t\t}\r\n\t\t/parameter-5 {\r\n\t\t\t/key 1735550318\r\n\t\t\t/showInPalette -1\r\n\t\t\t/type (real)\r\n\t\t\t/value 34.0\r\n\t\t}\r\n\t\t/parameter-6 {\r\n\t\t\t/key 1651275109\r\n\t\t\t/showInPalette -1\r\n\t\t\t/type (real)\r\n\t\t\t/value 34.0\r\n\t\t}\r\n\t}\r\n}"),tests=[{contents:JSON.stringify(sampleSet.getJSONSchema()),dest:Folder.desktop+"/output.json"},{contents:sampleSet.toAIA(),dest:Folder.desktop+"/output.aia"}],ind=0;ind<tests.length;ind++){var testCase=tests[ind],tmp=File(testCase.dest);tmp.open("w"),tmp.write(testCase.contents),tmp.close()}alert("Done");
