"use client"
import React from 'react'
import { useSession, signOut } from 'next-auth/react' 

const ProfilePage = () => {
  const {data:session,status} = useSession()
  console.log(session,status)
  return (
    <div className='flex flex-col justify-center items-center h-[calc(100vh-4rem)]'>
      <h1 className='text-4xl font-bold mb-3'>Profile</h1>
      <pre className='bg-neutral-900 mb-3'>
        {JSON.stringify({
          session,
          status
        },null,2)}
      </pre>
      <button onClick={()=> signOut()} className='bg-indigo-600 px-4 py-2 rounded-md'>
        Logout
      </button>
    </div>
  )
}

export default ProfilePage