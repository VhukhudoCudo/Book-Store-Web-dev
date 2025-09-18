import { prisma } from "../../../../db";  // Adjust path as needed
import { NextResponse } from "next/server";

export async function GET(req) {
    const url = new URL(req.url);
    const query = url.searchParams.get("query") || "";
    
    const books = await prisma.book.findMany({
        where: {
            title: {
                contains: query,
                mode: 'insensitive'
            }
        }
    });
    
    return NextResponse.json(books);
}