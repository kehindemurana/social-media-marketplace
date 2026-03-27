import React from 'react'

const Title = ({title, description}) => {
  return (
    <div className='flex flex-col items-center mb-8'>
        <h1 className='text-2xl font-bold text-gray-800'>{title}</h1>
      <p className='text-slate-600 max-w-lg'>{description}</p>
    </div>
  )
}

export default Title
