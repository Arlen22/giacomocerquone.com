(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{201:function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return m}),a.d(t,"pageQuery",function(){return s});a(18),a(217);var n=a(0),r=a.n(n),o=a(209),i=a(222),l=a(210),c=a(207);function m(e){var t=e.pageContext,a=e.data,n=e.location,m=a.markdownRemark,s=a.site.siteMetadata,u=t.previous,d=t.next,p=t.dir;return console.log(n),r.a.createElement(i.a,null,r.a.createElement(l.a,{title:m.frontmatter.title,description:m.frontmatter.description||m.excerpt,image:m.frontmatter.image.childImageSharp.fixed.src,location:n}),r.a.createElement("h1",{style:{marginTop:Object(c.a)(1),marginBottom:0}},m.frontmatter.title),r.a.createElement("p",{style:Object.assign({},Object(c.b)(-.2),{display:"block",marginBottom:Object(c.a)(1)})},m.frontmatter.date),r.a.createElement("div",{dangerouslySetInnerHTML:{__html:m.html}}),r.a.createElement("div",{style:{marginBottom:"3em"}},r.a.createElement("a",{href:"https://mobile.twitter.com/search?q="+(n&&n.href),target:"_blank",rel:"noopener noreferrer"},"Discuss on Twitter")," ","•"," ",r.a.createElement("a",{href:s.repoUrl+p.slice(0,-1)+".md",target:"_blank",rel:"noopener noreferrer"},"Edit on Github")),r.a.createElement("hr",{style:{marginBottom:Object(c.a)(1)}}),r.a.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},r.a.createElement("li",null,u&&r.a.createElement(o.a,{to:u.fields.slug,rel:"prev"},"← ",u.frontmatter.title)),r.a.createElement("li",null,d&&r.a.createElement(o.a,{to:d.fields.slug,rel:"next"},d.frontmatter.title," →"))))}var s="3104432464"},207:function(e,t,a){"use strict";a.d(t,"a",function(){return c}),a.d(t,"b",function(){return m});var n=a(214),r=a.n(n),o=a(215),i=a.n(o);i.a.overrideThemeStyles=function(){return{a:{color:"#039be5",backgroundImage:"linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, #039be5 1px, #039be5 2px, rgba(0, 0, 0, 0) 2px)"},"h1, h2, h3, h4, h5, h6":{marginTop:"1.5em",marginBottom:"0.8em"},h1:{color:"#555",fontSize:"3em"},h2:{color:"#777"},h3:{color:"#888"},p:{color:"#666"},"img, figure":{marginBottom:"0"}}};var l=new r.a(i.a);var c=l.rhythm,m=l.scale},208:function(e,t,a){var n;e.exports=(n=a(213))&&n.default||n},209:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(66),i=a.n(o);a.d(t,"a",function(){return i.a});a(208),a(9).default.enqueue,r.a.createContext({})},210:function(e,t,a){"use strict";var n=a(211),r=a(0),o=a.n(r),i=a(216),l=a.n(i);function c(e){var t=e.description,a=e.lang,r=e.meta,i=e.title,c=e.noTemplate,m=e.type,s=e.location,u=e.image,d=void 0===u?"https://www.gravatar.com/avatar/a244447940601d3cf55d27c7278ce446?s=200":u,p=n.data.site,g=t||p.siteMetadata.description;return o.a.createElement(l.a,{htmlAttributes:{lang:a},title:i||p.siteMetadata.title,titleTemplate:c?null:"%s | "+p.siteMetadata.title,meta:[{name:"description",content:g},{property:"og:title",content:i},{property:"og:url",content:s&&s.href},{property:"og:description",content:g},{property:"og:type",content:m||"website"},{property:"og:image",content:d},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:p.siteMetadata.author},{name:"twitter:title",content:i},{name:"twitter:image",content:d},{name:"twitter:description",content:g}].concat(r)})}c.defaultProps={lang:"en",meta:[],description:""},t.a=c},211:function(e){e.exports={data:{site:{siteMetadata:{title:"Giacomo Cerquone",description:"Giacomo Cerquone, developer",author:"Giacomo Cerquone"}}}}},213:function(e,t,a){"use strict";a.r(t);a(18);var n=a(0),r=a.n(n),o=a(96);t.default=function(e){var t=e.location,a=e.pageResources;return a?r.a.createElement(o.a,Object.assign({location:t,pageResources:a},a.json)):null}},220:function(e){e.exports={data:{site:{siteMetadata:{author:"Giacomo Cerquone",title:"Giacomo Cerquone"}}}}},222:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(218),i=a(223),l=a(207),c=a(220),m=a(209),s=a(198),u=a.n(s);function d(){var e=c.data.site.siteMetadata;return r.a.createElement("header",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginLeft:"auto",marginRight:"auto",maxWidth:Object(l.a)(30),padding:Object(l.a)(1.5)+" "+Object(l.a)(.75)}},r.a.createElement("div",{style:{display:"flex",alignItems:"center"}},r.a.createElement("img",{style:{borderRadius:".5em",alignSelf:"center",margin:0},src:"https://www.gravatar.com/avatar/a244447940601d3cf55d27c7278ce446?s=60",alt:""}),r.a.createElement("h4",{style:{margin:"0 .5em",color:"#333"}},r.a.createElement(m.a,{to:"/",className:u.a.title},e.title))),r.a.createElement("nav",null,r.a.createElement(m.a,{to:"/blog"},"Blog")))}var p=a(199),g=a.n(p);function f(e){var t=e.children;return r.a.createElement(r.a.Fragment,null,r.a.createElement(d,null),r.a.createElement("main",{style:{marginLeft:"auto",marginRight:"auto",maxWidth:Object(l.a)(30),padding:"0 "+Object(l.a)(.75)}},t),r.a.createElement("footer",{style:{textAlign:"center",fontSize:".8em",lineHeight:"1.2em"}},r.a.createElement("button",{className:g.a.icon,type:"button",onClick:function(){return window.scrollTo({top:0,behavior:"smooth"})}},r.a.createElement(o.a,{size:"lg",icon:i.a,title:"arrow up"})),r.a.createElement("p",{className:g.a.credits},"Crafted with ",r.a.createElement("span",{style:{color:"#bb1a34"}},"❤")," by me",r.a.createElement("br",null),"©",(new Date).getFullYear())))}a.d(t,"a",function(){return f})}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-057ed96a2844ad153740.js.map