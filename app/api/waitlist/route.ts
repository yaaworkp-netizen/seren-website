import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: "Enter a valid email address." },
        { status: 400 }
      );
    }

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        {
          message:
            "Waitlist is not connected yet. Add the Supabase website environment variables.",
        },
        { status: 500 }
      );
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/website_waitlist`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        email,
        source: "seren-website",
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.warn("[waitlist] Supabase insert failed", details);

      if (response.status === 409 || details.includes("duplicate key")) {
        return NextResponse.json({
          message: "You are already on the early list.",
        });
      }

      if (
        response.status === 401 ||
        response.status === 403 ||
        details.includes("row-level security")
      ) {
        return NextResponse.json(
          {
            message:
              "Waitlist permissions are not ready yet. Run the website waitlist SQL in Supabase.",
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          message:
            process.env.NODE_ENV === "development"
              ? `Supabase waitlist error: ${details || response.status}`
              : "Could not join the waitlist yet. Please try again.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      message: "You are on the early list. We will be gentle with your inbox.",
    });
  } catch (error) {
    console.warn("[waitlist] request failed", error);
    return NextResponse.json(
      { message: "Could not join the waitlist yet. Please try again." },
      { status: 500 }
    );
  }
}
