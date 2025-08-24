import { NextRequest } from "next/server";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
export const getDataFromToken = (req: NextRequest) => {
  try {
    const encodedToken = req.cookies.get("token")?.value || "";
    if (!encodedToken) {
      throw new Error("No token found");
    }
    const decodedToken = jwt.verify(
      encodedToken,
      process.env.TOKEN_SECRET!
    ) as JwtPayload;
    return decodedToken.id || null;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error occurred");
    }
  }
};
