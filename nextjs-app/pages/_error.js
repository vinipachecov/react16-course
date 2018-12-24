import React from 'react'
import Link from 'next/link'
import Router from 'next/router';

const index = () => {
  return (
    <div>
        <h1>Something went wrong...</h1>
        <p>Go to <Link href="/"><a>Going back</a></Link></p>    
    </div>
  )
}

export default index
