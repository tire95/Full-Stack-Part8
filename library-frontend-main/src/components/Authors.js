import React, { useState, useRef } from 'react'
import { ALL_AUTHORS, CHANGE_BIRTHYEAR, ALL_BOOKS } from './queries'
import { useQuery, useMutation } from '@apollo/client'
import Select from 'react-select'


const Authors = (props) => {
  const authorsResult = useQuery(ALL_AUTHORS)
  const options = [];
  const [option, setOption] = useState('')
  const [birthyear, setBirthyear] = useState('')
  const selectInputRef = useRef()

  const [updateBirthyear] = useMutation(CHANGE_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  })

  const submit = async (event) => {
    event.preventDefault()

    updateBirthyear({ variables: { name: option.value, setBornTo: parseInt(birthyear) } })
    setOption('')
    setBirthyear('')
    selectInputRef.current.select.clearValue()
  }

  if (!props.show) {
    return null
  }

  if (authorsResult.loading) {
    return <div>loading...</div>
  }

  authorsResult.data.allAuthors.map(item =>
    options.push({ label: item.name, value: item.name }),
  )

  if (!props.token) {
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                born
              </th>
              <th>
                books
              </th>
            </tr>
            {authorsResult.data.allAuthors.map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authorsResult.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <Select
          ref={selectInputRef}
          defaultValue={option}
          onChange={setOption}
          options={options}
        />
        <input
          type='number'
          value={birthyear}
          onChange={({ target }) => setBirthyear(target.value)}
        />
        <button type='submit'>Set birthyear</button>
      </form>
    </div>
  )
}

export default Authors