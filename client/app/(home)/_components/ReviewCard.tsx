import React from 'react'

interface ReviewProps { // Add in rest with api response
    name: String
}

const ReviewCard = ({ name } : ReviewProps) => {
  return (
    <div className='shadow-lg border rounded-lg w-full h-60'>
        {name}
    </div>
  )
}

export default ReviewCard