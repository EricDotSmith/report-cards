import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../packages/db";
import type Stripe from "stripe";
import { buffer } from "micro";
import { handleInvoicePaid } from "../../../../../packages/api/src/stripe/stripe-webhook-handlers";
import { stripe } from "../../../../../packages/api/src/stripe/client";

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig as string, webhookSecret);

      // Handle the event
      switch (event.type) {
        case "payment_intent.succeeded":
          // Used to provision services after the trial has ended.
          // The status of the invoice will show up as paid. Store the status in your database to reference when a user accesses your service to avoid hitting rate limits.
          await handleInvoicePaid({
            event,
            stripe,
            prisma,
          });
          break;
        case "payment_intent.payment_failed":
          break;
        default:
        // Unexpected event type
      }

      const existingStripEventRecord = await prisma.stripeEvent.findUnique({
        where: {
          id: event.id,
        },
        select: {
          id: true,
        },
      });

      if (!existingStripEventRecord) {
        // record the event in the database
        await prisma.stripeEvent.create({
          data: {
            id: event.id,
            type: event.type,
            object: event.object,
            api_version: event.api_version,
            account: event.account,
            created: new Date(event.created * 1000), // convert to milliseconds
            data: {
              object: event.data.object,
              previous_attributes: event.data.previous_attributes,
            },
            livemode: event.livemode,
            pending_webhooks: event.pending_webhooks,
            request: {
              id: event.request?.id,
              idempotency_key: event.request?.idempotency_key,
            },
          },
        });
      }

      res.json({ received: true });
    } catch (err) {
      res.status(400).send(err);
      return;
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
