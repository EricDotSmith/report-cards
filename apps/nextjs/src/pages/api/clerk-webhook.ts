import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../packages/db";
import { buffer } from "micro";
import { Webhook, WebhookRequiredHeaders } from "svix";
import { IncomingHttpHeaders } from "http";

// Clerk requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET ?? "";

export default async function handler(
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    // Verify the webhook signature
    // See https://docs.svix.com/receiving/verifying-payloads/how
    const payload = (await buffer(req)).toString();
    const headers = req.headers;
    const wh = new Webhook(webhookSecret);
    let evt: Event | null = null;
    try {
      evt = wh.verify(payload, headers) as Event;
    } catch (_) {
      return res.status(400).json({});
    }

    // Handle the webhook
    const eventType: EventType = evt.type;

    try {
      if (eventType === "user.created") {
        const { id, email_addresses, first_name } = evt.data;

        const email = email_addresses?.[0]?.email_address ?? "";
        const name = first_name ?? "";
        const userId = id ?? "";

        if (email.length > 0 && userId.length > 0) {
          await prisma.teacher.create({
            data: {
              id: userId,
              email,
              name,
            },
          });
        } else {
          throw new Error("Invalid Clerk event payload");
        }
      }
    } catch (e: any) {
      console.error(e);
      //send error message
      res.status(500).json({ error: e.message });
    }

    res.json({ success: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};

// Generic (and naive) way for the Clerk event
// payload type.
type Event = {
  data: {
    id?: string;
    email_addresses?: { email_address?: string }[];
    first_name?: string;
  };
  object: "event";
  type: EventType;
};

type EventType = "user.created" | "user.updated" | "*";
