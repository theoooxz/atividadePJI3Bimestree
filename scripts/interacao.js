// interacao.js - manipulação simples do DOM
document.addEventListener('DOMContentLoaded', ()=> {
  // destacar inputs inválidos via eventos (exemplo)
  document.querySelectorAll('input,textarea,select').forEach(el=>{
    el.addEventListener('input', ()=> el.style.borderColor = '');
  });
});
