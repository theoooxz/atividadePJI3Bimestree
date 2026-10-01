import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { inserirLingua } from '../utils/storage'

function showError(setMsg, text){ setMsg({text, type:'error'}) }
function showSuccess(setMsg, text){ setMsg({text, type:'success'}) }

export default function Cadastrar(){
  const [form, setForm] = useState({nomeLingua:'', historia:'', quantFalantes:'0', troncoLinguistico:'Indígena', vitalidade:'', usuario:''})
  const [msg, setMsg] = useState({text:'', type:''})
  const navigate = useNavigate()

  function onChange(e){
    const {name,value} = e.target
    // for quantFalantes, strip any non-digit characters to prevent letters
    if(name === 'quantFalantes'){
      const digits = value.replace(/\D+/g,'')
      setForm(f=> ({...f,[name]:digits}))
      return
    }
    setForm(f=> ({...f,[name]:value}))
  }

  function validar(){
    const nome = form.nomeLingua.trim()
    const historia = form.historia.trim()
    const quant = form.quantFalantes.trim()
    const tronco = form.troncoLinguistico.trim()
    const vital = form.vitalidade.trim()
    const usuario = form.usuario.trim()
    if(nome.length < 2){ showError(setMsg,'O nome da língua deve ter ao menos 2 caracteres.'); return false }
    if(!/^[0-9]+$/.test(quant) || parseInt(quant) < 0){ showError(setMsg,'Quantidade de falantes deve ser um número inteiro >= 0.'); return false }
    if(tronco.length === 0){ showError(setMsg,'Informe o tronco linguístico.'); return false }
    if(vital.length === 0){ showError(setMsg,'Informe a vitalidade.'); return false }
    if(usuario.length === 0){ showError(setMsg,'Informe o nome do usuário responsável.'); return false }
    return true
  }

  function onSubmit(e){
    e.preventDefault()
    setMsg({text:'', type:''})
    if(!validar()) return
    inserirLingua(form)
    showSuccess(setMsg,'Validação OK. Registro salvo.')
    setTimeout(()=> navigate('/listar'), 800)
  }

  return (
    <section>
      <h2>Cadastro de Língua</h2>
      <form onSubmit={onSubmit}>
        <label>Nome da Língua
          <input name="nomeLingua" value={form.nomeLingua} onChange={onChange} />
        </label>
        <label>História
          <textarea name="historia" value={form.historia} onChange={onChange} />
        </label>
        <label>Quantidade de Falantes
          <input name="quantFalantes" value={form.quantFalantes} onChange={onChange} inputMode="numeric" pattern="\d*" />
        </label>
        <label>Tronco Linguístico
          <input name="troncoLinguistico" value={form.troncoLinguistico} onChange={onChange} />
        </label>
        <label>Vitalidade
          <input name="vitalidade" value={form.vitalidade} onChange={onChange} />
        </label>
        <label>Usuário
          <input name="usuario" value={form.usuario} onChange={onChange} />
        </label>
        <div id="mensagem" className={msg.type==='error'? 'message error' : msg.type==='success' ? 'message success' : ''}>{msg.text}</div>
        <button type="submit">Salvar</button>
      </form>
    </section>
  )
}
