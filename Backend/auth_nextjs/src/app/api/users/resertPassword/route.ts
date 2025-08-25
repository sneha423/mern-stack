import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json();
    if (!token || !newPassword) {
      return NextResponse.json(
        { message: "Invalid or missing token or password" },
        { status: 400 }
      );
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as {
      userId: string;
    };
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }
    const isValid = await bcrypt.compare(token, user.resetToken);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();
    return NextResponse.json(
      { message: "Password reset successfully" },
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
