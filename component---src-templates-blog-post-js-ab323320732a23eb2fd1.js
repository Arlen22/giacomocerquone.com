(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{201:function(e,t,a){"use strict";a.r(t),a.d(t,"pageQuery",function(){return m});a(18);var n=a(0),r=a.n(n),o=a(209),i=a(221),l=a(210),c=a(207);var s=function(e){var t,a;function n(){return e.apply(this,arguments)||this}return a=e,(t=n).prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a,n.prototype.render=function(){var e=this.props.data.markdownRemark,t=this.props.data.site.siteMetadata,a=t.blogTitle,n=(t.author,t.description,this.props.pageContext),s=n.previous,m=n.next;return r.a.createElement(i.a,{location:this.props.location,title:a},r.a.createElement(l.a,{title:e.frontmatter.title,description:e.frontmatter.description||e.excerpt}),r.a.createElement("h1",{style:{marginTop:Object(c.a)(1),marginBottom:0}},e.frontmatter.title),r.a.createElement("p",{style:Object.assign({},Object(c.b)(-.2),{display:"block",marginBottom:Object(c.a)(1)})},e.frontmatter.date),r.a.createElement("div",{dangerouslySetInnerHTML:{__html:e.html}}),r.a.createElement("hr",{style:{marginBottom:Object(c.a)(1)}}),r.a.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},r.a.createElement("li",null,s&&r.a.createElement(o.a,{to:s.fields.slug,rel:"prev"},"← ",s.frontmatter.title)),r.a.createElement("li",null,m&&r.a.createElement(o.a,{to:m.fields.slug,rel:"next"},m.frontmatter.title," →"))))},n}(r.a.Component);t.default=s;var m="1427039748"},207:function(e,t,a){"use strict";a.d(t,"a",function(){return c}),a.d(t,"b",function(){return s});var n=a(214),r=a.n(n),o=a(215),i=a.n(o);i.a.overrideThemeStyles=function(e,t){e.rhythm;return{a:{color:"#039be5",backgroundImage:"linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, #039be5 1px, #039be5 2px, rgba(0, 0, 0, 0) 2px)"},"h1, h2, h3, h4, h5, h6":{marginTop:"1.5em",marginBottom:"0.8em"},h1:{color:"#555",fontSize:"3em"},h2:{color:"#777"},h3:{color:"#888"},p:{color:"#666"},"img, figure":{marginBottom:"0"}}};var l=new r.a(i.a);var c=l.rhythm,s=l.scale},208:function(e,t,a){var n;e.exports=(n=a(213))&&n.default||n},209:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(66),i=a.n(o);a.d(t,"a",function(){return i.a});a(208),a(9).default.enqueue,r.a.createContext({})},210:function(e,t,a){"use strict";var n=a(211),r=a(0),o=a.n(r),i=a(216),l=a.n(i);function c(e){var t=e.description,a=e.lang,r=e.meta,i=e.title,c=e.noTemplate,s=n.data.site,m=t||s.siteMetadata.description;return o.a.createElement(l.a,{htmlAttributes:{lang:a},title:i||s.siteMetadata.title,titleTemplate:c?null:"%s | "+s.siteMetadata.title,meta:[{name:"description",content:m},{property:"og:title",content:i},{property:"og:description",content:m},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:s.siteMetadata.author},{name:"twitter:title",content:i},{name:"twitter:description",content:m}].concat(r)})}c.defaultProps={lang:"en",meta:[],description:""},t.a=c},211:function(e){e.exports={data:{site:{siteMetadata:{title:"Giacomo Cerquone",description:"Giacomo Cerquone, developer",author:"Giacomo Cerquone"}}}}},213:function(e,t,a){"use strict";a.r(t);a(18);var n=a(0),r=a.n(n),o=a(96);t.default=function(e){var t=e.location,a=e.pageResources;return a?r.a.createElement(o.a,Object.assign({location:t,pageResources:a},a.json)):null}},219:function(e){e.exports={data:{site:{siteMetadata:{author:"Giacomo Cerquone",title:"Giacomo Cerquone"}}}}},221:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(217),i=a(222),l=a(207),c=a(219),s=a(209),m=a(198),u=a.n(m);function p(){var e=c.data.site.siteMetadata;return r.a.createElement("header",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginLeft:"auto",marginRight:"auto",maxWidth:Object(l.a)(30),padding:Object(l.a)(1.5)+" "+Object(l.a)(.75)}},r.a.createElement("div",{style:{display:"flex",alignItems:"center"}},r.a.createElement("img",{style:{borderRadius:".5em",alignSelf:"center",margin:0},src:"https://www.gravatar.com/avatar/a244447940601d3cf55d27c7278ce446?s=60",alt:e.author}),r.a.createElement("h4",{style:{margin:"0 .5em",color:"#333"}},r.a.createElement(s.a,{to:"/",className:u.a.title},e.title))),r.a.createElement("nav",null,r.a.createElement(s.a,{to:"/blog"},"Blog")))}var d=a(199),g=a.n(d);function f(e){var t=e.children;return r.a.createElement(r.a.Fragment,null,r.a.createElement(p,null),r.a.createElement("main",{style:{marginLeft:"auto",marginRight:"auto",maxWidth:Object(l.a)(30),padding:"0 "+Object(l.a)(.75)}},t),r.a.createElement("footer",{style:{textAlign:"center",fontSize:".8em",lineHeight:"1.2em"}},r.a.createElement("a",{href:"#title",className:g.a.icon},r.a.createElement(o.a,{size:"lg",icon:i.a})),r.a.createElement("p",{className:g.a.credits},"Crafted with ",r.a.createElement("span",{style:{color:"#bb1a34"}},"❤")," by me",r.a.createElement("br",null),"©",(new Date).getFullYear())))}a.d(t,"a",function(){return f})}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-ab323320732a23eb2fd1.js.map