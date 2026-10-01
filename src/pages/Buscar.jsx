import React, { useState } from 'react'
import { buscarLinguas } from '../utils/storage'

export default function Buscar(){
  const [termo, setTermo] = useState('')
  const [resultados, setResultados] = useState([])
  const [msg, setMsg] = useState('')

  function onSubmit(e){
    e.preventDefault()
    setMsg('')
    if(termo.trim().length < 2){ setMsg('Digite ao menos 2 caracteres para a busca.'); setResultados([]); return }
    const res = buscarLinguas(termo)
    setResultados(res)
    if(res.length === 0) setMsg('Nenhum resultado encontrado.')
  }

  return (
    <section>
      <h2>Buscar Línguas</h2>
      <form onSubmit={onSubmit}>
        <label>Digite o nome da língua
          <input name="termo" placeholder="Digite o nome da língua" value={termo} onChange={e=> setTermo(e.target.value)} />
        </label>
        <div id="mensagemBusca" className={msg? 'message error' : ''}>{msg}</div>
        <button type="submit">Buscar</button>
      </form>

      {resultados.length > 0 && (
        <table className="table" aria-live="polite">
          <thead><tr><th>ID</th><th>Nome</th><th>Tronco</th><th>Vitalidade</th><th>Falantes</th><th>História</th></tr></thead>
          <tbody>
            {resultados.map(r=> (
              <tr key={r.idLingua}>
                <td>{r.idLingua}</td>
                <td>{r.nomeLingua}</td>
                <td>{r.troncoLinguistico}</td>
                <td>{r.vitalidade}</td>
                <td>{r.quantFalantes}</td>
                <td>{r.historia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}
