import React from 'react'
import Hero from './_sections/Hero'
import { FindService } from './_sections/FindService'
import Reviews from './_sections/Reviews'
import { Separator } from '@/components/ui/separator'

const page = () => {
  return (
    <>
      <div>
        <Hero/>
        <FindService/>
        <Separator/>
        <Reviews/>
        <Separator/>
      </div>
    </>
  )
}

export default page