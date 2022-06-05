import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function HomePage() {


  return (
    <>
      <Navbar />
      <main className="container">

        <h1 className='fs-1'>Bem vindo</h1>

        <p className='fs-2'>Deseja se cadastrar na plataforma?</p>
      </main>
      <Footer />

    </>
  )
}

export default HomePage