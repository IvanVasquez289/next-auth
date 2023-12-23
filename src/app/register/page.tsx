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

      if(responseNext?.ok) return router.push('/dashboard')
      
    } catch (error) {
      console.log(error)
      if(error instanceof AxiosError){
        setError(error.response?.data.msj)
      }
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className='bg-red-500 text-white p-2 mb-2'>
          <p>{error}</p>
        </div>
      )}
      <h1>Sign up</h1>
      <input 
        type="text" 
        name="username" 
        placeholder="Ingresa tu nombre"
        className='bg-zinc-900 px-4 py-2 block mb-2' 
      />
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
        Register
      </button>
    </form>
  );
}

export default RegisterPage