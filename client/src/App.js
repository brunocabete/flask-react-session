import React, { useState, useEffect } from 'react'

function App() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/users").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <>
      {(typeof data.users === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        data.users.map((user, i) => (
          <p key={i}>{user}</p>
        ))
      )
      }
    </>
  )
}

export default App