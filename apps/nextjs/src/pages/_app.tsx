// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { trpc } from "../utils/trpc";
import OnboardingModalWrapper from "../components/onboarding/OnboardingModalWrapper";
import { Analytics } from "@vercel/analytics/react";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <ClerkProvider {...pageProps}>
      <OnboardingModalWrapper>
        <Component {...pageProps} />
        <Analytics />
      </OnboardingModalWrapper>
    </ClerkProvider>
  );
};

export default trpc.withTRPC(MyApp);
