import React, { useState, useEffect } from 'react'
import HomeNav from '../components/HomeNav'
import RegisteredUserLanding from '../components/RegisteredUserLanding'

const Home = () => {
  return (
    <div className='bg-gradient-to-r from-[#0f3460] to-[#35639a] w-full px-10'>
      <HomeNav />
      <RegisteredUserLanding />
    </div>
  )
}

export default Home