import axios from 'axios'
import { Button, Dropdown, DropdownButton, Form, FormControl } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { key } from '../utils/format'
import React, { useState } from 'react'

export function SearchBar () {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()

  const handleSearch = async (event) => {
    event.preventDefault()
    if (searchQuery.trim() !== '') {
      try {
        const response = await axios.get('http://www.omdbapi.com/', {
          params: {
            s: searchQuery,
            apikey: key,
            r: 'json'
          }
        })
        setSearchResults(response.data.Search || [])
        setDropdownOpen(true)
      } catch (error) {
        console.error('Error fetching search results:', error)
      }
    }
  }

  const handleSearchQueryChange = async (event) => {
    setSearchQuery(event.target.value)
    if (event.target.value.trim() !== '') {
      try {
        const response = await axios.get('http://www.omdbapi.com/', {
          params: {
            s: event.target.value,
            apikey: key,
            r: 'json'
          }
        })
        setSearchResults(response.data.Search || [])
        setDropdownOpen(true)
      } catch (error) {
        console.error('Error fetching search results:', error)
      }
    } else {
      setSearchResults([])
      setDropdownOpen(false)
    }
  }

  const handleViewMoreResults = () => {
    setDropdownOpen(false)
    navigate(`/search?q=${searchQuery}`)
  }

  return (
    <div>
      <Form onSubmit={handleSearch} className='d-flex '>
        <FormControl
          type='text'
          placeholder='Buscar...'
          className='mr-sm-2'
          value={searchQuery}
          onChange={handleSearchQueryChange}
          onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
          onFocus={() => setDropdownOpen(true)}
        />
        <Button type='submit' variant='outline-success'>Buscar</Button>
      </Form>
      {dropdownOpen && searchResults.length > 0 && (
        <DropdownButton
          title=''
          show={dropdownOpen}
          className='search-dropdown'
          style={{ position: 'absolute' }}
          onToggle={setDropdownOpen}
          drop='down'
          variant='outline-secondary'
        >
          {searchResults.slice(0, 5).map(result => (
            <Dropdown.Item
              key={result.imdbID}
              onClick={() => navigate(`/details/${result.imdbID}`)}
            >
              {result.Title}
            </Dropdown.Item>
          ))}
          {searchResults.length > 5 && (
            <Dropdown.Item onClick={handleViewMoreResults}>
              Ver más resultados
            </Dropdown.Item>
          )}
        </DropdownButton>
      )}
    </div>
  )
};

export default SearchBar
