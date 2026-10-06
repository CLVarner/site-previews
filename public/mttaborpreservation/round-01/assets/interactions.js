function initializeMountTabor(){
 const menu=document.querySelector('[data-menu]');const nav=document.getElementById('site-nav');
 const closeMenu=()=>{if(!menu||!nav)return;menu.setAttribute('aria-expanded','false');nav.classList.remove('is-open')};
 if(menu&&nav){menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus()}});}
 document.querySelectorAll('[data-demo]').forEach(button=>button.addEventListener('click',()=>{const target=document.getElementById(button.getAttribute('data-demo'));if(target){target.hidden=false;target.focus()}}));
}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',initializeMountTabor,{once:true});}else{initializeMountTabor();}
