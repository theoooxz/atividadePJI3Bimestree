import React, { useEffect, useState } from 'react'
import { listarLinguas, deletarSeIndigena, deletarLingua } from '../utils/storage'

export default function Listar(){
  const [linguas, setLinguas] = useState([])
  const [msg, setMsg] = useState(null)

  useEffect(()=>{
    setLinguas(listarLinguas())
  },[])

  function onDelete(id){
    // confirm deletion
    if(!window.confirm('Confirma exclusão deste registro?')) return
    // delete unconditionally (remove todo o registro)
    const res = deletarLingua(id)
    setMsg(res)
    if(res.ok) setLinguas(listarLinguas())
  }

  return (
    <section>
      <h2>Listagem de Línguas</h2>
      {msg && <p className={msg.ok? 'message success' : 'message error'}>{msg.msg}</p>}
      <table className="table" aria-live="polite">
        <thead><tr><th>ID</th><th>Nome</th><th>Tronco</th><th>Vitalidade</th><th>Falantes</th><th>História</th><th>Usuário</th><th>Ações</th></tr></thead>
        <tbody>
          {linguas.map(l=> (
            <tr key={l.idLingua}>
              <td>{l.idLingua}</td>
              <td>{l.nomeLingua}</td>
              <td>{l.troncoLinguistico}</td>
              <td>{l.vitalidade}</td>
              <td>{l.quantFalantes}</td>
              <td>{l.historia}</td>
              <td>{l.usuario}</td>
              <td><button className="delete" onClick={()=> onDelete(l.idLingua)}>Deletar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
