"use client"
import React from 'react'
import { useSession } from 'next-auth/react' 
const DashboardPage = () => {
  const {data:session,status,update} = useSession()
  console.log(session,status)
  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage