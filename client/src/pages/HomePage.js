import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Link } from "react-router-dom"

function HomePage() {


  return (
    <>
      <Navbar />
      <main className="container d-flex flex-column justify-content-center align-items-center">

        <h1 className='fs-1'>Bem vindo(a)</h1>

        <p className='fs-2'>Deseja se cadastrar na plataforma?</p>
        <Link to="/registrar" className='btn btn-info fw-bold text-white'>Crie uma conta</Link>
      </main>
      <Footer />

    </>
  )
}

export default HomePage