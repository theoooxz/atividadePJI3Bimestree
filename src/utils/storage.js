// storage.js - substitui a camada PHP por storage client-side (localStorage)
const KEY = 'linguas_db_v1'

function readAll(){
  const raw = localStorage.getItem(KEY)
  if(!raw) return []
  try{ return JSON.parse(raw) }catch(e){ return [] }
}

function writeAll(arr){
  localStorage.setItem(KEY, JSON.stringify(arr))
}

export function listarLinguas(){
  return readAll().sort((a,b)=> (a.nomeLingua||'').localeCompare(b.nomeLingua||''))
}

export function inserirLingua(data){
  const arr = readAll()
  // auto id
  const max = arr.reduce((m,it)=> Math.max(m, Number(it.idLingua||0)), 0)
  const id = data.idLingua && String(data.idLingua).length ? data.idLingua : String(max+1)
  const item = Object.assign({idLingua: id}, data)
  arr.push(item)
  writeAll(arr)
  return id
}

export function buscarLinguas(termo){
  termo = (termo||'').toLowerCase()
  return readAll().filter(l=> (l.nomeLingua||'').toLowerCase().includes(termo) || (l.historia||'').toLowerCase().includes(termo))
}

export function deletarSeIndigena(id){
  const arr = readAll()
  const idx = arr.findIndex(i=> String(i.idLingua) === String(id))
  if(idx === -1) return {ok:false,msg:'Registro não encontrado.'}
  const item = arr[idx]
  const tronco = (item.troncoLinguistico||'').toLowerCase().trim()
  if(tronco !== 'indígena' && tronco !== 'indigena' && tronco !== 'indigênA'){
    return {ok:false,msg:'Somente línguas indígenas podem ser deletadas por essa rotina.'}
  }
  arr.splice(idx,1)
  writeAll(arr)
  return {ok:true,msg:'Registro deletado.'}
}

export function deletarLingua(id){
  const arr = readAll()
  const idx = arr.findIndex(i=> String(i.idLingua) === String(id))
  if(idx === -1) return {ok:false,msg:'Registro não encontrado.'}
  arr.splice(idx,1)
  writeAll(arr)
  return {ok:true,msg:'Registro deletado.'}
}

export default { listarLinguas, inserirLingua, buscarLinguas, deletarSeIndigena, deletarLingua }
