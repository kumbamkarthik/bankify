import React from 'react'
import Navbar from './Navbar'
import Body from './Body'

const Main = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1">
        <Body />
      </main>
    </div>
  )
}

export default Main