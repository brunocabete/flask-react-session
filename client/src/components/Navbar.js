import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import httpClient from '../httpClient'

function Navbar() {
  const [nome] = useState(localStorage.getItem('nome'))
  const [cpf] = useState(localStorage.getItem('cpf'))

  const navigate = useNavigate()

  const handleLogout = async (e) => {
    e.preventDefault()
    const resp = await httpClient.post("/logout")
    localStorage.clear()
    navigate('/', {})
  }


  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark" aria-label="Second navbar example">
      <div className="container">
        <Link className="navbar-brand" to="/">Lorem Ipsum</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample02">
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            {nome === null ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/registrar">Registre-se</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/minha-conta"><span className='text-white'>Olá, {nome}</span> <FontAwesomeIcon icon={faUser} /> </Link>
                  <span className='text-secondary d-block text-center fs-6'>CPF termina em {cpf}</span>
                </li>
                <li className="nav-item ms-5">
                  <button onClick={handleLogout} className='btn text-white'>Logout <FontAwesomeIcon className='ms-2' icon={faRightFromBracket} /></button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar