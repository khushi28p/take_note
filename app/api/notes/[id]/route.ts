import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import z from "zod";
import { error } from "console";

const updateNoteSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
})

export async function PUT(req: NextRequest, {params}: {params: {id:string}}){
   const noteId = params.id;
    const session = await getServerSession(authOptions);

    if(!session?.user){
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    try{
        const body = await req.json();
        const {title, description} = updateNoteSchema.parse(body);

        const updatedNote = await prisma.note.update({
            where: {
                id: noteId,
            },
            data: {
                title, description
            }
        })

        return NextResponse.json(updatedNote, {status: 200})
    }
    catch(error){
        console.error("Error updating note", error);
        return NextResponse.json({error: "Failed to update note"}, {status: 500})
    }
}

export async function DELETE(req: NextRequest, {params}: {params: {id:string}}){
    const noteId = params.id;
    const session = await getServerSession(authOptions);

    if(!session?.user){
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    try{
        const deleteNote = await prisma.note.delete({where: {id: noteId}});

        return NextResponse.json(deleteNote, {status: 200})
    }
    catch(error){
        console.error("error delete note", error);
        return NextResponse.json({error: "Failed to delete note"}, {status: 500})
    }
}