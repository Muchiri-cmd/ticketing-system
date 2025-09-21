import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'
import { prisma } from "@/prisma/client";

const IssueSchema = z.object({
    title: z.string().min(1,'Title is required').max(255),
    description:z.string().min(1,'Description is required')
})

export async function POST(request:NextRequest) {
    const body = await request.json()
    //validate POST request body
    const validation = IssueSchema.safeParse(body)

    if(!validation.success){
        return NextResponse.json(validation.error.format(), { status: 400 })
    }

    const {title,description} = body

    const newIssue = await prisma.issue.create({
        data:{ title, description }
    })

    return NextResponse.json(newIssue, { status:201 })
}

export async function GET(request:NextRequest) {
    const issues = await prisma.issue.findMany({
        orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(issues)
}