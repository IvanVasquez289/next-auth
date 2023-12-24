'use client'
import React, { FormEvent, useState } from 'react'
import axios, { AxiosError } from 'axios'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
const RegisterPage = () => {

  const [error,setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const fullname = formData.get('username')
    const email = formData.get('email')
    const password = formData.get('password')
    
    try {
      const {data} = await axios.post('/api/auth/signup',{fullname,email,password})
      console.log(data)
      const responseNext = await signIn('credentials',{
        email,
        password,
        redirect: false
      })

      if(responseNext?.ok) return router.push('/dashboard/profile')
      
    } catch (error) {
      console.log(error)
      if(error instanceof AxiosError){
        setError(error.response?.data.msj)
      }
    }
  }
  return (
    <div className='flex justify-center items-center h-[calc(100vh-4rem)]'>
      <form onSubmit={handleSubmit} className='bg-neutral-900 p-8 py-10 rounded w-1/4'>
        {error && (
          <div className='bg-red-500 text-white p-2 mb-2 rounded-md'>
            <p>{error}</p>
          </div>
        )}
        <h1 className='text-4xl font-bold mb-3'>Sign up</h1>
        <input 
          type="text" 
          name="username" 
          placeholder="Ingresa tu nombre"
          className='bg-zinc-800 px-4 py-2 block mb-3 w-full rounded-md' 
        />
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
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage