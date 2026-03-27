import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import LatestListings from '../components/LatestListings'
import Plans from '../components/Plans'
import CTA from '../components/CTA'
import Footer from '../components/Footer'



const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
     <LatestListings/>
      <Plans/>
    <CTA/>
    <Footer/>
    </div>
  )
}

export default Home
