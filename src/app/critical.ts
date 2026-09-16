export const criticalCss = `
html,body{background:#F3F0EA;color:#101722;margin:0;}
.brand-logo{display:block;height:2rem;width:auto;}
@media (min-width:768px){.brand-logo{height:2.25rem;}}
.brand-logo-footer{display:block;height:2.5rem;width:auto;}
@media (min-width:768px){.brand-logo-footer{height:2.75rem;}}
.flag-mark{display:inline-flex;width:18px;height:12px;overflow:hidden;}
.flag-svg{display:block;width:18px;height:12px;}
.lang-switcher summary{list-style:none;}
.lang-switcher summary::-webkit-details-marker,.lang-switcher summary::marker{display:none;content:"";}
.site-nav{display:none;}
.site-nav a{color:#101722;text-decoration:none;font-size:0.88rem;}
@media (min-width:1024px){.site-nav{display:flex;align-items:center;gap:2.25rem;}}
.menu-toggle{display:flex;}
@media (min-width:1024px){.menu-toggle{display:none;}}
.editorial-frame{position:relative;overflow:hidden;background:#101722;margin:0;}
.editorial-frame>img{position:absolute;inset:0;display:block;width:100%;height:100%;object-fit:cover;}
.editorial-frame>figcaption{pointer-events:none;position:absolute;inset-inline:0;bottom:0;background:linear-gradient(to top,rgb(16 23 34 / 0.75),transparent);padding:3rem 0.875rem 0.75rem;}
.editorial-frame>figcaption span{font-size:0.62rem;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;color:rgb(243 240 234 / 0.9);}
`.replace(/\s+/g, " ").trim();
