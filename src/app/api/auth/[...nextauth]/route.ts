import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { conectarDB } from '@/libs/mongodb';
import User from "@/models/user";
import bcrypt from 'bcryptjs'
const handler =  NextAuth({
  providers:[
    CredentialsProvider({
        name:'Credentials',
        credentials:{
            email: {label:'Email', type:'email', placeholder:'email@email.com'},
            password: { label: 'Password', type: 'password', placeholder:'*****' },
        },
        async authorize(credentials,req){
            await conectarDB()
            
            const existingUser = await User.findOne({email: credentials?.email}).select('+password')
            if(!existingUser) throw new Error('El email no existe')
            
            const passwordMatch = await bcrypt.compare(credentials!.password, existingUser.password)
            if(!passwordMatch) throw new Error("Invalid credentials")

            return existingUser;
        }
    })
  ],
  callbacks: {
    jwt({account,token,user,profile,session}){
      if(user) token.user = user
      return token
    },
    session({session,token}){
      session.user = token.user as any;
      return session;
    }
  },
  pages: {
    signIn:"/login",
  }
})

export { handler as GET, handler as POST }