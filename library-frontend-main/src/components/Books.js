import React, { useState } from 'react'
import { ALL_BOOKS } from './queries'
import { useQuery, useLazyQuery } from '@apollo/client'

const Books = ({ show }) => {
  const allBooksResult = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('')
  const [getBooks, byGenreResult] = useLazyQuery(ALL_BOOKS)
  const [showAll, setShowAll] = useState(true)
  const [currentGenre, setCurrentGenre] = useState(null)

  const searchByGenre = (event) => {
    event.preventDefault()
    if (genre) {
      getBooks({ variables: { genre: genre } })
      setCurrentGenre(genre)
      setShowAll(false)
    }
  }

  const showAllBooks = (event) => {
    event.preventDefault()
    setShowAll(true)
  }

  if (!show) {
    return null
  }

  if (byGenreResult.loading) {
    return <div>loading...</div>
  }

  if (byGenreResult.data && !showAll) {
    return (
      <div>
        <h2>books in {currentGenre}</h2>

        <form onSubmit={searchByGenre}>
          <input
            value={genre}
            placeholder={'Search by genre'}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button type='submit'>Search</button>
        </form>

        <form onSubmit={showAllBooks}>
          <button type='submit'>Show all books</button>
        </form>

        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
              </th>
              <th>
                published
              </th>
            </tr>
            {byGenreResult.data.allBooks.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }

  if (allBooksResult.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      <form onSubmit={searchByGenre}>
        <input
          value={genre}
          placeholder={'Search by genre'}
          onChange={({ target }) => setGenre(target.value)}
        />
        <button type='submit'>Search</button>
      </form>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {allBooksResult.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books