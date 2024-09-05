'use client'

interface ErrorPageProps {
  error:Error,
  reset:()=>void,
}

import {Button} from 'react-bootstrap'

export default function Error({error,reset}:ErrorPageProps){
  return (
    <div>
      <h1>Error 😭</h1>
      <p>Something went wrong</p>
      <Button onClick={reset}>Try again!</Button>
    </div>
  )
}