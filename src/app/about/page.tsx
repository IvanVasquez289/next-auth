"use client"
import React from 'react'
import { useSession } from 'next-auth/react' 
import { useRouter } from 'next/navigation'
 
const AboutPage = () => {
  const session = useSession()
  const router = useRouter()
  if(session.data?.user) router.push('/')
  
  return (
    <div>AboutPage</div>
  )
}

export default AboutPage