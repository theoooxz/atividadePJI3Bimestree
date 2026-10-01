// validar.js - validação de formulários no lado do cliente
function validarCadastro(form){
  const nome = form.nomeLingua.value.trim();
  const historia = form.historia.value.trim();
  const quant = form.quantFalantes.value.trim();
  const tronco = form.troncoLinguistico.value.trim();
  const vital = form.vitalidade.value.trim();
  const usuario = form.usuario.value.trim();
  const msg = document.getElementById('mensagem');
  msg.className='';
  msg.textContent='';

  if(nome.length < 2){
    showError('O nome da língua deve ter ao menos 2 caracteres.');
    return false;
  }
  if(!/^[0-9]+$/.test(quant) || parseInt(quant) < 0){
    showError('Quantidade de falantes deve ser um número inteiro >= 0.');
    return false;
  }
  if(tronco.length === 0){
    showError('Informe o tronco linguístico.');
    return false;
  }
  if(vital.length === 0){
    showError('Informe a vitalidade.');
    return false;
  }
  if(usuario.length === 0){
    showError('Informe o nome do usuário responsável.');
    return false;
  }
  showSuccess('Validação OK. Enviando...');
  return true;
}

function validarBusca(form){
  const termo = form.termo.value.trim();
  const msg=document.getElementById('mensagemBusca');
  msg.textContent='';
  msg.className='';
  if(termo.length < 2){
    msg.textContent='Digite ao menos 2 caracteres para a busca.';
    msg.className='message error';
    return false;
  }
  return true;
}

function showError(text){
  const msg = document.getElementById('mensagem');
  msg.textContent = text;
  msg.className='message error';
}

function showSuccess(text){
  const msg = document.getElementById('mensagem');
  msg.textContent = text;
  msg.className='message success';
}
