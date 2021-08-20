import React, { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()


  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <Menu
        token={token} setPage={setPage} logout={logout}
      />

      <Authors
        show={page === 'authors'} token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'} client={client}
      />

      <LoginForm
        show={page === 'login'} setToken={setToken} setPage={setPage}
      />

      <Recommendations
        show={page === 'recommendations'}
      />

    </div>
  )
}

export default App