import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import RegisterForm from '../components/RegisterForm'
function Register() {
  return (
    <>
      <Navbar />
      <main className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 d-flex align-items-center">

            <RegisterForm />

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Register