import React from 'react'
import Search from '../search/Search'

export default function SearchList({ users }) {
  return (
    <div className="searchInputList">
        {users.map((user) => (
        <Search user={user} />
        ))}
    </div>
  )
}
