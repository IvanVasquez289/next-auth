"use client"
import Link from 'next/link'
import { useSession } from 'next-auth/react'

function Navbar() {
  const session =  useSession()
  return (
    <nav className='bg-zinc-900 p-4'>
        <div className='flex justify-between container mx-auto'>
            <Link href={'/'} className=' text-2xl font-semibold'>
                <h1>NextAuth</h1>
            </Link>

            <ul className='flex justify-center items-center gap-4'>
                {session?.data?.user ? (
                    <li className='px-3 py-1'>
                        <Link href={'/dashboard/profile'}>Perfil</Link>
                    </li >

                ) : (
                    <>
                        <li className='px-3 py-1'>
                            <Link href={'/about'}>About</Link>
                        </li >
                        <li className='px-3 py-1'>
                            <Link href={'/login'}>Login</Link>
                        </li>
                        <li className='px-3 py-1'>
                            <Link href={'/register'}>Registro</Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    </nav>
  )
}

export default Navbar