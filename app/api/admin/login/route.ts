import { NextResponse } from "next/server";

import { setAdminCookie, verifyAdminPassword } from "../../../admin/auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = String(formData.get("password") ?? "");

  if (!verifyAdminPassword(password)) {
    return NextResponse.redirect(
      new URL("/admin/login?error=Incorrect%20admin%20password", request.url),
      303
    );
  }

  await setAdminCookie();

  return NextResponse.redirect(new URL("/admin", request.url), 303);
}
