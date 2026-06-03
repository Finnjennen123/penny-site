import { NextResponse } from "next/server";

// Waitlist intake. For now it validates and logs the signup so the flow works
// end to end. Wire this to Resend / Supabase / Mailchimp when Miller picks the
// email backend (see Penny-SITE.md open decisions).
export async function POST(request: Request) {
  let email: unknown;
  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 422 });
  }

  // TODO(miller): persist to the real email backend.
  console.log(`[waitlist] new signup: ${email}`);

  return NextResponse.json({ ok: true });
}
