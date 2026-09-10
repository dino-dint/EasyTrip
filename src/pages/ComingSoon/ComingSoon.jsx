import React from 'react'

function ComingSoon({title}) {
  return (
    <div className='min-h-[60vh] flex flex-col items-center justify-center bg-black text-white text-center px-4'>
      <h1 className='text-3xl font-bold mb-3'>
        {title || "Coming Soon"}
      </h1>
      <p className='text-gray-400 max-w-md'>This Page hasn't been built yet — we'll get to it in a later phase.</p>
    </div>
  )
}

export default ComingSoon
