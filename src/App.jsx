import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Cadastrar from './pages/Cadastrar'
import Listar from './pages/Listar'
import Buscar from './pages/Buscar'

export default function App(){
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cadastrar" element={<Cadastrar/>} />
          <Route path="/listar" element={<Listar/>} />
          <Route path="/buscar" element={<Buscar/>} />
          <Route path="*" element={<Home/>} />
        </Routes>
      </main>
    </>
  )
}
