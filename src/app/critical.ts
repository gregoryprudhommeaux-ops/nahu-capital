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
`.replace(/\s+/g, " ").trim();
