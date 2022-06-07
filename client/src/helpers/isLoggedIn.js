const isLoggedIn = () => {
  const name = localStorage.getItem('nome')
  const cpf = localStorage.getItem('cpf')
  return [name, cpf]
}

export default isLoggedIn