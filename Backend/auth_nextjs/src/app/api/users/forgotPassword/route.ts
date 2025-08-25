import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/helpers/mailer";
connect();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.TOKEN_SECRET! || "defaultsecret",
      { expiresIn: "1h" }
    );
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000;
    await user.save();
    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;
    await sendEmail(
      user.email,
      "Reset your password",
      `Click the link to reset your password: ${resetLink}`
    );

    return NextResponse.json(
      { message: "Reset password email sent" },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
