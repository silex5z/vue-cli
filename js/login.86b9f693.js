(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{"2f3c":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-layout",{attrs:{"justify-center":"",wrap:""}},[a("v-flex",{attrs:{md4:"","ma-5":""}},[a("v-card",[a("v-card-title",[t._v("\n          Login\n        ")]),a("v-divider"),a("v-card-text",[t._v("\n          test@email.com : aaaaaa "),a("br"),t._v("\n          test1@email.com : aaaaaa "),a("br"),t._v("\n          pen123@email.com : aaaaaa\n        ")])],1),a("v-flex",{attrs:{"mt-4":""}},[a("label",{attrs:{for:""}},[t._v("ID")]),a("v-text-field",{attrs:{label:"Enter your id",hint:"At least 8 characters"},model:{value:t.userId,callback:function(e){t.userId=e},expression:"userId"}})],1),a("v-flex",{attrs:{"mt-4":""}},[a("label",{attrs:{for:""}},[t._v("PASSWORD")]),a("v-text-field",{attrs:{type:"password",hint:"At least 8 characters",label:"Enter your password"},model:{value:t.userPassword,callback:function(e){t.userPassword=e},expression:"userPassword"}})],1),a("v-flex",{attrs:{"text-xs-center":""}},[a("v-btn",{attrs:{color:"primary"},on:{click:t.logIn}},[t._v("Login")])],1)],1)],1)],1)},n=[];a.d(e,"a",function(){return r}),a.d(e,"b",function(){return n})},"5a28":function(t,e,a){"use strict";a("a4d3"),a("99af"),a("4de4"),a("e439"),a("b64b"),a("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a("2f62"),n=o(a("8aa5"));function o(t){return t&&t.__esModule?t:{default:t}}function u(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{},r=Object.keys(a);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(a).filter(function(t){return Object.getOwnPropertyDescriptor(a,t).enumerable}))),r.forEach(function(e){i(t,e,a[e])})}return t}function i(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var s={methods:u({},(0,r.mapActions)(["setUser"]),{logIn:function(){var t=this;n.default.auth().signInWithEmailAndPassword(this.userId,this.userPassword).then(function(e){t.$router.push("/pgv")}).catch(function(t){return alert(t)})}}),data:function(){return{userId:"test@email.com",userPassword:"aaaaaa"}}};e.default=s},"80de":function(t,e,a){"use strict";a.r(e);var r=a("5a28"),n=a.n(r);for(var o in r)"default"!==o&&function(t){a.d(e,t,function(){return r[t]})}(o);e["default"]=n.a},a55b:function(t,e,a){"use strict";a.r(e);var r=a("2f3c"),n=a("80de");for(var o in n)"default"!==o&&function(t){a.d(e,t,function(){return n[t]})}(o);var u=a("2877"),i=a("6544"),s=a.n(i),l=a("bb71"),c=Object(u["a"])(n["default"],r["a"],r["b"],!1,null,"3cbaaa2d",null);e["default"]=c.exports,s()(c,{VBtn:l["VBtn"],VCard:l["VCard"],VCardText:l["VCardText"],VCardTitle:l["VCardTitle"],VContainer:l["VContainer"],VDivider:l["VDivider"],VFlex:l["VFlex"],VLayout:l["VLayout"],VTextField:l["VTextField"]})}}]);
//# sourceMappingURL=login.86b9f693.js.map