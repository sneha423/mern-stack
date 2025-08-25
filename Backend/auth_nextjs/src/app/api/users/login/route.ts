import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel.js";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/helpers/mailer";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    if (!email || !password) {
      return NextResponse.json(
        { message: "Please fill all the fields" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email });
    //check if user exists
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 400 }
      );
    }
    //check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }
    //create token data
    const tokenData = { id: user._id, email: user.email };
    //generate token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { message: "Login successful", success: true, user },
      { status: 200 }
    );
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Internal Server Error", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
