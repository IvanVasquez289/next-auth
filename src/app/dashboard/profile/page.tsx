"use client"
import React from 'react'
import { useSession } from 'next-auth/react' 
const ProfilePage = () => {
  const {data:session,status} = useSession()
  console.log(session,status)
  return (
    <div>
      <h1>Profile</h1>
      <pre>
        {JSON.stringify({
          session,
          status
        },null,2)}
      </pre>
    </div>
  )
}

export default ProfilePage