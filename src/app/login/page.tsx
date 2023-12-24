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
    <div className='flex justify-center items-center h-[calc(100vh-4rem)]'>
      <form onSubmit={handleSubmit} className='bg-neutral-900 p-8 py-10 rounded w-1/4'>
        {error && (
          <div className='bg-red-500 text-white p-2 mb-2 rounded-md'>
            <p>{error}</p>
          </div>
        )}
        <h1 className='text-4xl font-bold mb-3'>Sign in</h1>
        <input 
          type="email" 
          name="email" 
          placeholder="Ingresa tu correo" 
          className='bg-zinc-800 px-4 py-2 block mb-3 w-full rounded-md' 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="*****" 
          className='bg-zinc-800 px-4 py-2 block mb-3 w-full rounded-md' 
        />
        <button className='bg-indigo-600 px-4 py-2 rounded-md'>
          Log in
        </button>
      </form>
    </div>
  );
}

export default LoginPage