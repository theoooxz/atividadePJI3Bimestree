import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(){
  return (
    <header>
      <h1>Sistema de Cadastro de Línguas</h1>
      <nav>
        <Link to="/">Início</Link>
        <Link to="/cadastrar">Cadastrar</Link>
        <Link to="/listar">Listar</Link>
        <Link to="/buscar">Buscar</Link>
      </nav>
    </header>
  )
}
