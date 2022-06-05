import React, { useState } from 'react'
import httpClient from '../httpClient'

function LoginForm() {

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const resp = await httpClient.post("http://localhost:5000/login", { email, senha })
      console.log(resp.data)

    } catch (error) {
      if (error.response.status === 401) {
        alert('Por favor confira seus dados de login')
      }
    }
  }
  return (
    <form onSubmit={handleSubmit} className="w-100">
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Seu Email</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Sua Senha</label>
        <input type="password" className="form-control" id="exampleInputPassword1" value={senha} onChange={e => setSenha(e.target.value)} />
      </div>

      <button type="submit" className="btn btn-dark mt-3 ms-auto d-block">Log-In</button>
    </form>
  )
}

export default LoginForm