import { useState } from 'react'
import ActivityBar from './components/activity-bar/ActivityBar'
import Body from './components/body/Body'

function App() {
  return (
    <>
      <div className='flex'>
        <ActivityBar />
        <Body />
      </div>
    </>
  )
}

export default App
