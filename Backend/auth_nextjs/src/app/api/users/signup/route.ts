import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel.js";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Please fill all the fields" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email });
    //check if user already exists
    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create new user
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();
    await sendEmail(
      email,
      "Verify your email address",
      `Please verify your account by clicking this link: https://yourdomain.com/verify/${savedUser._id}`
    );

    return NextResponse.json(
      { message: "User created successfully", success: true, savedUser },
      { status: 201 }
    );
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
