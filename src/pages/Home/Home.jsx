import React from 'react'
import Navbar from '../../components/layouts/Navbar'
import Hero from './Hero'

function Home() {
  return (
    <div>
        <div className='relative bg-slate-900'>
            <Navbar/>
            <Hero/>
        </div>
    </div>
  )
}

export default Home
