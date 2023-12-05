import connectDB from "@/database/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcrypt";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, password } = body;
    console.log("server" , body);

    const existUser = await User.findOne({ username });
    if (existUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password : hashedPassword });
    await user.save();
    console.log(user);
    return NextResponse.json(
      { message: "User created" },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
