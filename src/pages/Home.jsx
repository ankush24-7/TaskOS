import React, { useState, useEffect } from 'react'
import HomeNavUser from '../components/HomeNavUser'
import HeroSectionUser from '../components/HeroSectionUser'

const Home = () => {
  return (
    <>
      <div className='bg-gradient-to-r from-[#0f3460] to-[#35639a] w-full px-10 py-5'>
        <HomeNavUser />
        <HeroSectionUser />
      </div>
    </>
  )
}

export default Home