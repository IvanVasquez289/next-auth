import { NextResponse } from "next/server"
export function GET(){
    return NextResponse.json({msj:'Hola mundo desde'})
}