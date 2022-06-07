import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import httpClient from '../httpClient'

function MyAccount() {

  //? Transformar tudo isso em um objeto?

  const [email, setEmail] = useState("")
  const [nome, setNome] = useState("")
  const [cpf, setCpf] = useState("")
  const [pis, setPis] = useState("")
  const [pais, setPais] = useState("")
  const [estado, setEstado] = useState("")
  const [municipio, setMunicipio] = useState("")
  const [cep, setCep] = useState("")
  const [rua, setRua] = useState("")
  const [numero, setNumero] = useState("")
  const [complemento, setComplemento] = useState("")

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const resp = await httpClient.put("/account", { email, nome, cpf, pis, pais, estado, municipio, cep, rua, numero, complemento })
      console.log(resp)
    } catch (error) {

    }
  }

  const handleDelete = async (e) => {
    try {
      e.preventDefault()
      const resp = await httpClient.delete("/account")
      console.log(resp)
    } catch (error) {

    }
  }

  useEffect(() => {
    httpClient.post("/account")
      .then((resp) => {
        let { email, nome, cpf, pis, pais, estado, municipio, cep, rua, numero, complemento } = resp.data
        setEmail(email)
        setNome(nome)
        setCep(cep)
        setCpf(cpf)
        setEstado(estado)
        setPis(pis)
        setPais(pais)
        setMunicipio(municipio)
        setRua(rua)
        setNumero(numero)
        setComplemento(complemento)
      })
  }, [])

  return (
    <>
      <Navbar />
      <main className='container'>
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 my-5">

            <form onSubmit={handleSubmit} className="w-100">
              <div className='fs-3 text-bold mb-3'>Seus dados pessoais:</div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Seu Nome Completo</label>
                <input type="text" className="form-control" id="name" value={nome} onChange={e => setNome(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="cpf" className="form-label">Seu CPF</label>
                <input type="text" className="form-control" id="cpf" value={cpf} onChange={e => setCpf(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="pis" className="form-label">Seu PIS</label>
                <input type="text" className="form-control" id="pis" value={pis} onChange={e => setPis(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Seu Email</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className='fs-3 text-bold mb-3'>Seu endereço:</div>
              <div className="mb-3">
                <label htmlFor="pais" className="form-label">Seu País</label>
                <input type="text" className="form-control" id="pais" value={pais} onChange={e => setPais(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="estado" className="form-label">Seu Estado</label>
                <input type="text" className="form-control" id="estado" value={estado} onChange={e => setEstado(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="municipio" className="form-label">Seu Município</label>
                <input type="text" className="form-control" id="municipio" value={municipio} onChange={e => setMunicipio(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="cep" className="form-label">Seu CEP</label>
                <input type="text" className="form-control" id="cep" value={cep} onChange={e => setCep(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="rua" className="form-label">Sua Rua</label>
                <input type="text" className="form-control" id="rua" value={rua} onChange={e => setRua(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="numero" className="form-label">Número da casa/prédio</label>
                <input type="text" className="form-control" id="numero" value={numero} onChange={e => setNumero(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="complemento" className="form-label">Complemento</label>
                <input type="text" className="form-control" id="complemento" value={complemento} onChange={e => setComplemento(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-dark mt-3 ms-auto d-block">Editar Dados</button>
            </form>


            <button className='btn btn-danger d-flex mx-auto mt-5' onClick={handleDelete}>EXCLUIR CONTA</button>
          </div>

        </div>

      </main>
      <Footer />
    </>
  )
}

export default MyAccount