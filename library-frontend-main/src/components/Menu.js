import React from 'react'

const Menu = ({ token, setPage, logout }) => {

  if (!token) {
    return (
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
      </div>
    )
  }

  return (
    <div>
      <button onClick={() => setPage('authors')}>authors</button>
      <button onClick={() => setPage('books')}>books</button>
      <button onClick={() => setPage('add')}>add book</button>
      <button onClick={() => setPage('recommendations')}>recommendations</button>
      <button onClick={() => logout()}>logout</button>
    </div>
  )

}

export default Menu