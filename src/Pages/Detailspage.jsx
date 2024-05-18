import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'

function Detailspage() {
  const book = useLoaderData();

  return (
    <div>
        <p>{book.name}</p>
    </div>
  )
}

export default Detailspage