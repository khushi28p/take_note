import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import z from "zod";
import {prisma} from "@/lib/prisma"

const createNotesSchema = z.object({
    title: z.string().min(1, "Title should contain atleast 1 character."),
    description: z.string().optional(),
})

export async function GET() {
    try{
        const session = await getServerSession(authOptions);

        if(!session) return NextResponse.json({message: "User is unauthorized"}, {status: 401});

        const userId = session.user.id;

        const notes = await prisma.note.findMany({where: {userId}});

        return NextResponse.json(notes, {status: 200});
    } catch(error){
        console.error("Error fetching notes", error);
    }
}

export async function POST(req: NextRequest){
    const session = await getServerSession(authOptions);

    if(!session) return NextResponse.json({message: "User is unauthorized"}, {status: 401});

    const body = await req.json();
    const {title, description} = createNotesSchema.parse(body);

    try{
        const newNote = await prisma.note.create({
            data: {title, description, userId: session.user.id}
        })

        return NextResponse.json(newNote, {status: 201});
    } catch(error){
        console.error("Error creating note", error);
    }
}
