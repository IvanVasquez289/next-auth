import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'
import User from "@/models/user";
import { conectarDB } from "@/libs/mongodb";

export async function POST(request: Request){
    const {fullname,password,email} = await request.json()

    if (!password || password.length < 6) {
      return NextResponse.json(
        { msj: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    try {
        await conectarDB()
        const existUser = await User.findOne({email})
        if (existUser) {
          return Response.json({ msj: "Email already exist" }, { status: 409 });
        }
    
        const hashedPassword = await bcrypt.hash(password,12)
        const user = new User ({ fullname , email , password: hashedPassword })
        await user.save()
        console.log(user)
    
        return NextResponse.json({user})
    } catch (error) {
       if(error instanceof Error){
         return NextResponse.json(
          {msj: error.message},
          {status:400}
         )
       }
    }

}