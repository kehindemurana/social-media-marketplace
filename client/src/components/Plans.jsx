import { PricingTable } from '@clerk/clerk-react'
import React from 'react'

const Plans = () => {
  return (
    <div className='max-w-2xl mx-auto z-20 my-30 max-mdx-4 '>
        <div className='text-center '>
            <h2 className='text-gray-700 text-4xl font-semibold'>Choose your plan </h2>
            <p className='text-gray-500 text-sm max-w-md mx-auto'>Start for free and scle up as you grow</p>
        </div>
      <div className='mt-'>
        <PricingTable/>
      </div>
    </div>
  )
}

export default Plans
