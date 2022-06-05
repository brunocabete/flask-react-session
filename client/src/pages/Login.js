import React from 'react'
import Footer from '../components/Footer'
import LoginForm from '../components/LoginForm'
import Navbar from '../components/Navbar'

function Login() {
  return (
    <>
      <Navbar />
      <main className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 d-flex align-items-center">

            <LoginForm />

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Login