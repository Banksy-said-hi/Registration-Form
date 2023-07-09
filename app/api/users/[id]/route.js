import connectMongoDB from "@/libs/mongodb";
import { connect } from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newTitle: title, newDescription: description } = await request.json();
    await connectMongoDB();
    await User.findByIdAndUpdate(id, {title, description})
    return NextResponse.json({Message: "User Updated"}, {status: 200})
}