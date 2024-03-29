import { SignIn, useAuth } from "@clerk/nextjs";
import { DefaultPageContainer } from "../../components/Page";
import Link from "next/link";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { NextSeo } from "next-seo";
import Image from "next/image";

const PAGE_COLOR = "#f6f3ec";

const SignInPageHeader: React.FC = () => (
  <div className="sticky top-0 z-10 flex w-full justify-between bg-[#f6f3ec] px-4 pt-8">
    <div className="flex w-full justify-center sm:w-auto sm:justify-start">
      <Image
        src="/report-card-icon.png"
        width={32}
        height={32}
        alt="Picture of the author"
      />
    </div>
    <div className="hidden space-x-4 sm:block">
      <span className="text-gray-700">Don&apos;t have an account yet?</span>
      <Link
        className="rounded-2xl border border-sky-500 p-3 text-sm text-sky-500"
        href="/sign-up"
      >
        Create one
      </Link>
    </div>
  </div>
);

const SignInPage: NextPage = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      push("/dashboard");
    }
  }, [isLoaded, isSignedIn, push]);

  if (!isLoaded || isSignedIn) {
    return null;
  }

  return (
    <>
      <NextSeo
        title="Report Cards"
        description="Sign-in to Report Cards"
        additionalMetaTags={[{ name: "theme-color", content: PAGE_COLOR }]}
        additionalLinkTags={[{ rel: "icon", href: "/favicon.ico" }]}
      />
      <DefaultPageContainer path="/sign-in">
        <div className="flex w-full flex-col items-center justify-center">
          <SignInPageHeader />
          <span className="pt-12 text-center text-2xl font-bold text-gray-700 md:text-4xl">
            Sign in to Report Cards
          </span>
          <SignIn
            path="/sign-in"
            routing="path"
            signUpUrl="/sign-up"
            redirectUrl="/dashboard"
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-sky-400 hover:bg-sky-300 text-sky-50 text-sm normal-case rounded-2xl focus:ring-sky-400 focus:border-sky-400",
                card: "border-none shadow-none bg-transparent pt-0",
                footer: "hidden",
                formFieldLabel: "text-gray-600",
                formFieldInput:
                  "rounded-2xl focus:ring-sky-400 focus:border-sky-400",
                headerSubtitle: "hidden",
                headerTitle: "hidden",
                otpCodeFieldInput: "focus:border-sky-500 text-gray-600",
                formResendCodeLink: "text-sky-500",
                formHeaderTitle: "text-gray-700 text-xl font-bold",
                formHeaderSubtitle: "text-md text-gray-600",
                identityPreviewEditButton: "text-sky-500",
              },
              variables: {},
              layout: {},
            }}
          />
          <div className="flex flex-col items-center space-y-4 pt-4 sm:hidden">
            <span className="text-gray-700">
              Don&apos;t have an account yet?
            </span>
            <Link
              className="w-fit rounded-2xl border border-sky-500 p-3 text-sm text-sky-500"
              href="/sign-up"
            >
              Create one
            </Link>
          </div>
        </div>
      </DefaultPageContainer>
    </>
  );
};

export default SignInPage;
