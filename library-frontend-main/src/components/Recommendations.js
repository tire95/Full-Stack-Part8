import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from './queries'

const Recommendations = (props) => {
  const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS)
  const [getMe, meResult] = useLazyQuery(ME)

  useEffect(() => {
    if (props.show) {
      getMe()
    }
  }, [props.show]) // eslint-disable-line

  useEffect(() => {
    if (props.show && meResult.data) {
      getBooks({ variables: { genre: meResult.data.me.favoriteGenre } })
    }
  }, [meResult.data]) // eslint-disable-line

  if (!props.show) {
    return null
  }

  if (booksResult.loading || meResult.loading) {
    return <div>loading...</div>
  }

  if (booksResult.data) {
    return (
      <div>
        <h2>Recommendations</h2>
        <p>Books in your favorite genre "{meResult.data.me.favoriteGenre}"</p>
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
            {booksResult.data.allBooks.map(a =>
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

  return (
    <div>Nothing here</div>
  )

}


export default Recommendations