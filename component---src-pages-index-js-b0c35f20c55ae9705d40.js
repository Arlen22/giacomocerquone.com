(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{205:function(e,t,a){"use strict";a.r(t);a(247);var n=a(248),r=a(0),o=a.n(r),i=a(249),c=function(e){var t=e.content,a=i.data.site.siteMetadata.author;return o.a.createElement("section",null,o.a.createElement("header",null,o.a.createElement("h1",{style:{marginTop:".5em"}},a),t.frontmatter.title&&o.a.createElement("h2",{style:{marginTop:"-0.75em"}},t.frontmatter.title)),o.a.createElement("div",{dangerouslySetInnerHTML:{__html:t.html}}))},l=a(221),s=a(210),m=a(250),u=a(209),p=a(218),d=a(251),f=a(204),g=a.n(f);function h(){var e=m.data.site.siteMetadata;return o.a.createElement("header",{style:{display:"flex",justifyContent:"center",flexDirection:"column",textAlign:"center"}},o.a.createElement("img",{style:{borderRadius:".5em",alignSelf:"center"},src:"https://www.gravatar.com/avatar/a244447940601d3cf55d27c7278ce446?s=200",alt:e.author}),o.a.createElement("nav",{style:{margin:".8em 0"}},o.a.createElement(u.a,{to:"/blog"},"Blog")),o.a.createElement("ul",{className:g.a.socialLinks},o.a.createElement("li",null,o.a.createElement("a",{className:g.a.in,target:"_blank",rel:"noopener noreferrer",href:"https://www.linkedin.com/in/giacomocerquone"},o.a.createElement(p.a,{size:"lg",icon:d.c,title:"linkedin profile"}))),o.a.createElement("li",null,o.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://github.com/giacomocerquone/",className:g.a.gh},o.a.createElement(p.a,{size:"lg",icon:d.b,title:"github profile"}))),o.a.createElement("li",null,o.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://stackoverflow.com/users/2809729/giacomo-cerquone",className:g.a.so},o.a.createElement(p.a,{size:"lg",icon:d.d,title:"stackoverflow profile"}))),o.a.createElement("li",null,o.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://facebook.com/giacomocerquone",className:g.a.fb},o.a.createElement(p.a,{size:"lg",icon:d.a,title:"facebook profile"})))))}var b=function(e){var t=e.content;return o.a.createElement("section",null,o.a.createElement("header",null,o.a.createElement("h2",null,t.frontmatter.title)),o.a.createElement("div",{dangerouslySetInnerHTML:{__html:t.html}}))};function E(e){var t=e.location,a=n.data,r=a.allMarkdownRemark,i=a.site.siteMetadata,m=r.edges;return o.a.createElement(l.a,null,o.a.createElement(s.a,{title:i.title,description:i.description,location:t,noTemplate:!0}),o.a.createElement(h,null),o.a.createElement(c,{content:m.find(function(e){return"bio"===e.node.frontmatter.section}).node}),o.a.createElement(b,{content:m.find(function(e){return"pubs"===e.node.frontmatter.section}).node}))}a.d(t,"default",function(){return E})},207:function(e,t,a){"use strict";a.d(t,"a",function(){return l}),a.d(t,"b",function(){return s});var n=a(214),r=a.n(n),o=a(215),i=a.n(o);i.a.overrideThemeStyles=function(){return{a:{color:"#039be5",backgroundImage:"linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, #039be5 1px, #039be5 2px, rgba(0, 0, 0, 0) 2px)"},"h1, h2, h3, h4, h5, h6":{marginTop:"1.5em",marginBottom:"0.8em"},h1:{color:"#555",fontSize:"3em"},h2:{color:"#777"},h3:{color:"#888"},p:{color:"#666"},"img, figure":{marginBottom:"0"}}};var c=new r.a(i.a);var l=c.rhythm,s=c.scale},208:function(e,t,a){var n;e.exports=(n=a(213))&&n.default||n},209:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(66),i=a.n(o);a.d(t,"a",function(){return i.a});a(208),a(9).default.enqueue,r.a.createContext({})},210:function(e,t,a){"use strict";var n=a(211),r=a(0),o=a.n(r),i=a(216),c=a.n(i);function l(e){var t=e.description,a=e.lang,r=e.meta,i=e.title,l=e.noTemplate,s=e.type,m=e.location,u=e.image,p=void 0===u?"https://www.gravatar.com/avatar/a244447940601d3cf55d27c7278ce446?s=200":u,d=n.data.site,f=t||d.siteMetadata.description;return o.a.createElement(c.a,{htmlAttributes:{lang:a},title:i||d.siteMetadata.title,titleTemplate:l?null:"%s | "+d.siteMetadata.title,meta:[{name:"description",content:f},{property:"og:title",content:i},{property:"og:url",content:m&&m.href},{property:"og:description",content:f},{property:"og:type",content:s||"website"},{property:"og:image",content:p},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:d.siteMetadata.author},{name:"twitter:title",content:i},{name:"twitter:image",content:p},{name:"twitter:description",content:f}].concat(r)})}l.defaultProps={lang:"en",meta:[],description:""},t.a=l},211:function(e){e.exports={data:{site:{siteMetadata:{title:"Giacomo Cerquone",description:"Giacomo Cerquone, developer",author:"Giacomo Cerquone"}}}}},213:function(e,t,a){"use strict";a.r(t);a(18);var n=a(0),r=a.n(n),o=a(96);t.default=function(e){var t=e.location,a=e.pageResources;return a?r.a.createElement(o.a,Object.assign({location:t,pageResources:a},a.json)):null}},221:function(e,t,a){"use strict";a.d(t,"a",function(){return i});var n=a(0),r=a.n(n),o=a(207);function i(e){var t=e.children;return r.a.createElement(r.a.Fragment,null,r.a.createElement("main",{style:{marginLeft:"auto",marginRight:"auto",maxWidth:Object(o.a)(30),padding:Object(o.a)(1.5)+" "+Object(o.a)(.75)}},t),r.a.createElement("footer",{style:{textAlign:"center",fontSize:".8em",lineHeight:"1.2em",padding:"0rem 0 2rem 0"}},"Crafted with ",r.a.createElement("span",{style:{color:"#bb1a34"}},"❤")," by me ©",(new Date).getFullYear()))}},248:function(e){e.exports={data:{site:{siteMetadata:{title:"Giacomo Cerquone",description:"Giacomo Cerquone, developer"}},allMarkdownRemark:{edges:[{node:{html:'<p>I love computer science and making beatiful programs.\nI have a computer science bachelor degree and 2 years of work experience as a remote freelancer.\nCinephile, astronomy lover, coffe and tea enthusiast and passionate about new technologies.\n<br>\n<strong>Writer</strong> and <strong>Admin</strong> @<a href="https://italiancoders.it/author/giacomo-cerquone/">italiancoders.it</a> and @<a href="https://giacomocerquone.com/blog">giacomocerquone.com</a></p>',frontmatter:{title:null,section:"bio"}}},{node:{html:'<p>A list of my publications on free online resources.</p>\n<p><a href="https://it.wikipedia.org/wiki/Utente:Giacomocerquone">Wikipedia</a>: <a href="https://it.wikipedia.org/wiki/ECMAScript">ECMAScript</a><br />\n<a href="https://developer.mozilla.org/it/profiles/giacomocerquone">Mozilla.org</a>: <a href="https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Function/apply">Apply</a> <br/>\n<a href="https://italiancoders.it/author/giacomo-cerquone/">ItalianCoders.it</a>: <a href="https://italiancoders.it/routing-delle-applicazioni-angular/">Angular Routing</a>, <a href="https://italiancoders.it/creare-un-bot-per-messenger-in-nodejs/">Facebook bot</a></p>',frontmatter:{title:"Minor publications",section:"pubs"}}}]}}}},249:function(e){e.exports={data:{site:{siteMetadata:{author:"Giacomo Cerquone"}}}}},250:function(e){e.exports={data:{site:{siteMetadata:{author:"Giacomo Cerquone"}}}}}}]);
//# sourceMappingURL=component---src-pages-index-js-b0c35f20c55ae9705d40.js.map