'use client'
import React, { FormEvent, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
const LoginPage = () => {

  const [error,setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
    
    const res = await signIn('credentials',{
      email,
      password,
      redirect: false
    })

    if(res?.error) return setError(res.error)
    if(res?.ok) return router.push('/dashboard/profile')
  
  }
  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className='bg-red-500 text-white p-2 mb-2'>
          <p>{error}</p>
        </div>
      )}
      <h1>Sign in</h1>
      <input 
        type="email" 
        name="email" 
        placeholder="Ingresa tu correo" 
        className='bg-zinc-900 px-4 py-2 block mb-2' 
      />
      <input 
        type="password" 
        name="password" 
        placeholder="*****" 
        className='bg-zinc-900 px-4 py-2 block mb-2' 
      />
      <button className='bg-indigo-600 px-4 py-2'>
        Log in
      </button>
    </form>
  );
}

export default LoginPage