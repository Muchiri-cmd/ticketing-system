import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(request:NextRequest,
    {params}:{params:{id:string}}
) {
    const issue = await prisma.issue.findUnique({
        where: { id: Number(params.id) },
    })

    if(!issue){
        return NextResponse.json({ message: 'Issue not found' }, { status: 404 })
    }
    return NextResponse.json(issue)
    
}

export async function DELETE(request:NextRequest,
    {params}:{params:{id:string}}
) {
    const id = Number(params.id)

    const issue = await prisma.issue.delete({
        where: { id }
    })

    if(!issue){
        return NextResponse.json({ message: 'Issue not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Issue deleted' })
}


export async function PUT(request:NextRequest,
    {params}:{params:{id:string}}
) {
    const id = Number(params.id)
    const body = await request.json()

    const issue = await prisma.issue.update({
        where: { id },
        data: body
    })

    if(!issue){
        return NextResponse.json({ message: 'Issue not found' }, { status: 404 })
    }
    return NextResponse.json(issue)
}

