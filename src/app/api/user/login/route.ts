import connectDB from "@/database/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcrypt";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 402 }
      );
    }

    return NextResponse.json({ message: "Login Successful" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Login went wrong" }, { status: 500 });
  }
}
