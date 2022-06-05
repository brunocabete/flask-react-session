const isLoggedIn = () => {
  const name = localStorage.getItem('name')
  return name
}

export default isLoggedIn