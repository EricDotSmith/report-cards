import { getOrCreateStripeCustomerIdForUser } from "../stripe/stripe-webhook-handlers";
import { protectedProcedure, router } from "../trpc";

export const stripeRouter = router({
  createCheckoutSession: protectedProcedure.mutation(async ({ ctx }) => {
    const {
      stripe,
      prisma,
      req,
      user: { id },
    } = ctx;

    const customerId = await getOrCreateStripeCustomerIdForUser({
      prisma,
      stripe,
      userId: id,
    });

    if (!customerId) {
      throw new Error("Could not create customer");
    }

    const baseUrl =
      process.env.NODE_ENV === "development"
        ? `http://${req.headers.host ?? "localhost:3000"}`
        : `https://${req.headers.host ?? ""}`;

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      client_reference_id: id,
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/dashboard?checkoutSuccess=true`,
      cancel_url: `${baseUrl}/dashboard?checkoutCanceled=true`,
      payment_intent_data: { metadata: { quantity: 1, userId: id } },
    });

    if (!checkoutSession) {
      throw new Error("Could not create checkout session");
    }

    return { checkoutUrl: checkoutSession.url };
  }),
  createBillingPortalSession: protectedProcedure.mutation(async ({ ctx }) => {
    const {
      stripe,
      prisma,
      req,
      user: { id },
    } = ctx;

    const customerId = await getOrCreateStripeCustomerIdForUser({
      prisma,
      stripe,
      userId: id,
    });

    if (!customerId) {
      throw new Error("Could not create customer");
    }

    const baseUrl =
      process.env.NODE_ENV === "development"
        ? `http://${req.headers.host ?? "localhost:3000"}`
        : `https://${req.headers.host ?? ""}`;

    const stripeBillingPortalSession =
      await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${baseUrl}/dashboard`,
      });

    if (!stripeBillingPortalSession) {
      throw new Error("Could not create billing portal session");
    }

    return { billingPortalUrl: stripeBillingPortalSession.url };
  }),
});
