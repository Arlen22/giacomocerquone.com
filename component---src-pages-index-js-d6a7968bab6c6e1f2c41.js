(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{205:function(e,t,a){"use strict";a.r(t);a(246);var n=a(247),r=a(0),o=a.n(r),i=a(248),c=function(e){var t=e.content,a=i.data.site.siteMetadata.author;return o.a.createElement("section",null,o.a.createElement("header",null,o.a.createElement("h1",{style:{marginTop:".5em"}},a),o.a.createElement("h2",{style:{marginTop:"-0.75em"}},t.frontmatter.title)),o.a.createElement("div",{dangerouslySetInnerHTML:{__html:t.html}}))},l=a(220),s=a(210),m=a(249),u=a(209),d=a(217),p=a(250),f=a(204),g=a.n(f);function h(){var e=m.data.site.siteMetadata;return o.a.createElement("header",{style:{display:"flex",justifyContent:"center",flexDirection:"column",textAlign:"center"}},o.a.createElement("img",{style:{borderRadius:".5em",alignSelf:"center"},src:"https://www.gravatar.com/avatar/a244447940601d3cf55d27c7278ce446?s=200",alt:e.author}),o.a.createElement("nav",{style:{margin:".8em 0"}},o.a.createElement(u.a,{to:"/blog"},"Blog")),o.a.createElement("ul",{className:g.a.socialLinks},o.a.createElement("li",null,o.a.createElement("a",{className:g.a.in,target:"_blank",rel:"noopener noreferrer",href:"https://www.linkedin.com/in/giacomocerquone"},o.a.createElement(d.a,{size:"lg",icon:p.c}))),o.a.createElement("li",null,o.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://github.com/giacomocerquone/",className:g.a.gh},o.a.createElement(d.a,{size:"lg",icon:p.b}))),o.a.createElement("li",null,o.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://stackoverflow.com/users/2809729/giacomo-cerquone",className:g.a.so},o.a.createElement(d.a,{size:"lg",icon:p.d}))),o.a.createElement("li",null,o.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://facebook.com/giacomocerquone",className:g.a.fb},o.a.createElement(d.a,{size:"lg",icon:p.a})))))}var b=function(e){var t=e.content;return o.a.createElement("section",null,o.a.createElement("header",null,o.a.createElement("h2",null,t.frontmatter.title)),o.a.createElement("div",{dangerouslySetInnerHTML:{__html:t.html}}))};function E(e){var t=e.location,a=n.data.allMarkdownRemark.edges;return o.a.createElement(l.a,{location:t},o.a.createElement(s.a,{noTemplate:!0}),o.a.createElement(h,null),o.a.createElement(c,{content:a.find(function(e){return"bio"===e.node.frontmatter.section}).node}),o.a.createElement(b,{content:a.find(function(e){return"pubs"===e.node.frontmatter.section}).node}))}a.d(t,"default",function(){return E})},207:function(e,t,a){"use strict";a.d(t,"a",function(){return l}),a.d(t,"b",function(){return s});var n=a(214),r=a.n(n),o=a(215),i=a.n(o);i.a.overrideThemeStyles=function(e,t){e.rhythm;return{a:{color:"#039be5",backgroundImage:"linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, #039be5 1px, #039be5 2px, rgba(0, 0, 0, 0) 2px)"},"h1, h2, h3, h4, h5, h6":{marginTop:"1.5em",marginBottom:"0.8em"},h1:{color:"#555",fontSize:"3em"},h2:{color:"#777"},h3:{color:"#888"},p:{color:"#666"},"img, figure":{marginBottom:"0"}}};var c=new r.a(i.a);var l=c.rhythm,s=c.scale},208:function(e,t,a){var n;e.exports=(n=a(213))&&n.default||n},209:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(66),i=a.n(o);a.d(t,"a",function(){return i.a});a(208),a(9).default.enqueue,r.a.createContext({})},210:function(e,t,a){"use strict";var n=a(211),r=a(0),o=a.n(r),i=a(216),c=a.n(i);function l(e){var t=e.description,a=e.lang,r=e.meta,i=e.title,l=e.noTemplate,s=n.data.site,m=t||s.siteMetadata.description;return o.a.createElement(c.a,{htmlAttributes:{lang:a},title:i||s.siteMetadata.title,titleTemplate:l?null:"%s | "+s.siteMetadata.title,meta:[{name:"description",content:m},{property:"og:title",content:i},{property:"og:description",content:m},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:s.siteMetadata.author},{name:"twitter:title",content:i},{name:"twitter:description",content:m}].concat(r)})}l.defaultProps={lang:"en",meta:[],description:""},t.a=l},211:function(e){e.exports={data:{site:{siteMetadata:{title:"Giacomo Cerquone",description:"Giacomo Cerquone, developer",author:"Giacomo Cerquone"}}}}},213:function(e,t,a){"use strict";a.r(t);a(18);var n=a(0),r=a.n(n),o=a(96);t.default=function(e){var t=e.location,a=e.pageResources;return a?r.a.createElement(o.a,Object.assign({location:t,pageResources:a},a.json)):null}},220:function(e,t,a){"use strict";a.d(t,"a",function(){return i});var n=a(0),r=a.n(n),o=a(207);function i(e){var t=e.children;return r.a.createElement(r.a.Fragment,null,r.a.createElement("main",{style:{marginLeft:"auto",marginRight:"auto",maxWidth:Object(o.a)(30),padding:Object(o.a)(1.5)+" "+Object(o.a)(.75)}},t),r.a.createElement("footer",{style:{textAlign:"center",fontSize:".8em",lineHeight:"1.2em",padding:"0rem 0 2rem 0"}},"Crafted with ",r.a.createElement("span",{style:{color:"#bb1a34"}},"❤")," by me ©",(new Date).getFullYear()))}},247:function(e){e.exports={data:{allMarkdownRemark:{edges:[{node:{html:'<p>Computer science student, software developer focused on front-end web developing with 2+ work experience as freelance. Javascript addicted, striving for fast and efficient code. Plus cinephile, astronomy lover and passionate about new technologies and tasty teas.\n<br>\n<strong>Writer</strong> and <strong>Admin</strong> @<a href="https://italiancoders.it/author/giacomo-cerquone/">italiancoders.it</a> and @<a href="https://giacomocerquone.com/blog">giacomocerquone.com</a></p>',frontmatter:{title:"Who Am I?",section:"bio"}}},{node:{html:'<p>A list of my publications on free online resources.</p>\n<p><a href="https://it.wikipedia.org/wiki/Utente:Giacomocerquone">Wikipedia</a>: <a href="https://it.wikipedia.org/wiki/ECMAScript">ECMAScript</a><br />\n<a href="https://developer.mozilla.org/it/profiles/giacomocerquone">Mozilla.org</a>: <a href="https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Function/apply">Apply</a> <br/>\n<a href="https://italiancoders.it/author/giacomo-cerquone/">ItalianCoders.it</a>: <a href="https://italiancoders.it/routing-delle-applicazioni-angular/">Angular Routing</a>, <a href="https://italiancoders.it/creare-un-bot-per-messenger-in-nodejs/">Facebook bot</a></p>',frontmatter:{title:"Minor publications",section:"pubs"}}}]}}}},248:function(e){e.exports={data:{site:{siteMetadata:{author:"Giacomo Cerquone"}}}}},249:function(e){e.exports={data:{site:{siteMetadata:{author:"Giacomo Cerquone"}}}}}}]);
//# sourceMappingURL=component---src-pages-index-js-d6a7968bab6c6e1f2c41.js.map