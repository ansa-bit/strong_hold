/**
 * Sanity webhook → instant content refresh.
 *
 * Sanity calls this route whenever a document is published, updated or deleted,
 * and we expire the cache tag for that document type (blogPost, service,
 * project, faq) so the change goes live immediately instead of waiting for the
 * hourly revalidation.
 *
 * Setup: sanity.io/manage → API → Webhooks → Create webhook
 *   URL:        https://strongholdstructures.in/api/revalidate
 *   Trigger on: Create, Update, Delete
 *   Filter:     _type in ["blogPost", "service", "project", "faq"]
 *   Projection: { _type, "slug": slug.current }
 *   Secret:     same value as SANITY_REVALIDATE_SECRET
 */
import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = { _type?: string; slug?: string };

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "SANITY_REVALIDATE_SECRET is not set" }, { status: 500 });
  }

  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(req, secret, true);

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }
    if (!body?._type) {
      return NextResponse.json({ message: "Missing _type in payload" }, { status: 400 });
    }

    revalidateTag(body._type, "max");
    return NextResponse.json({ revalidated: body._type, now: Date.now() });
  } catch (err) {
    console.error("Revalidate webhook failed", err);
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
