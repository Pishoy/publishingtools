import{S as e,i as t,s,e as a,l as n,H as r,c as l,d as i,m as o,a as u,b as c,g as h,f as m,n as d,j as p,k as g}from"./client.dbf41299.js";import{b as f}from"./_api.5f596b86.js";import{s as $}from"./showdown.20a62d9b.js";function b(e){let t,s,p,g,f=e[2].makeHtml(e[0].content)+"";return document.title=t=e[0].title,{c(){s=a("link"),p=n(),g=a("div"),this.h()},l(e){const t=r('[data-svelte="svelte-17jfwhl"]',document.head);s=l(t,"LINK",{rel:!0,href:!0}),t.forEach(i),p=o(e),g=l(e,"DIV",{class:!0}),u(g).forEach(i),this.h()},h(){c(s,"rel","stylesheet"),c(s,"href","//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.15.8/build/styles/default.min.css"),c(g,"class","content svelte-hmgdk5")},m(e,t){h(document.head,s),m(e,p,t),m(e,g,t),g.innerHTML=f},p(e,[s]){1&s&&t!==(t=e[0].title)&&(document.title=t),1&s&&f!==(f=e[2].makeHtml(e[0].content)+"")&&(g.innerHTML=f)},i:d,o:d,d(e){i(s),e&&i(p),e&&i(g)}}}async function j({params:e,query:t}){let s=e.theuser,a=e.slug,n=await f(s);const r=new Map;n.forEach(e=>{r.set(e.slug,JSON.stringify(e))});let l=r.get(a);return{thepage:JSON.parse(l)}}function y(e,t,s){let a,{thepage:n={}}=t;const{preloading:r,page:l,session:i}=p();g(e,l,e=>s(4,a=e));let{username:o=a.params.theuser}=t;const u={h1:"ui large header",h2:"ui medium header",ul:"ui list",li:"ui item"};Object.keys(u).map(e=>({type:"output",regex:new RegExp(`<${e}(.*)>`,"g"),replace:`<${e} class="${u[e]}" $1>`}));let c,h=new $.Converter({metadata:!0});return h.setFlavor("github"),e.$set=(e=>{"thepage"in e&&s(0,n=e.thepage),"username"in e&&s(3,o=e.username)}),e.$$.update=(()=>{1&e.$$.dirty&&(c=h.makeHtml(n.content))}),[n,l,h,o]}export default class extends e{constructor(e){super(),t(this,e,y,b,s,{thepage:0,username:3})}}export{j as preload};