import { SignUp, useAuth } from "@clerk/nextjs";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { DefaultPageContainer } from "../../components/Page";

const PAGE_COLOR = "#f6f3ec";

const SignUpPageHeader: React.FC = () => (
  <div className="flex w-full justify-between bg-[#f7f3ed] px-4 pt-8">
    <div className="flex w-full justify-center sm:w-auto sm:justify-start">
      <img
        className="h-8"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt=""
      />
    </div>
    <div className="hidden space-x-4 sm:block">
      <span className="text-gray-700">Have an account?</span>
      <Link
        className="rounded-2xl border border-sky-500 p-3 text-sm text-sky-500"
        href="/sign-in"
      >
        Sign in
      </Link>
    </div>
  </div>
);

const SignUpPage: NextPage = () => {
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
        description="Sign-up for Report Cards"
        additionalMetaTags={[{ name: "theme-color", content: PAGE_COLOR }]}
        additionalLinkTags={[{ rel: "icon", href: "/favicon.ico" }]}
      />
      <DefaultPageContainer path="/sign-up">
        <div className="flex w-full flex-col items-center justify-center">
          <SignUpPageHeader />
          <span className="pt-12 text-center text-2xl font-bold text-gray-700 md:text-4xl">
            Create your account
          </span>

          <SignUp
            path="/sign-up"
            routing="path"
            signInUrl="/sign-in"
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
            <span className="text-gray-700">Have an account?</span>
            <Link
              className="w-fit rounded-2xl border border-sky-500 p-3 text-sm text-sky-500"
              href="/sign-in"
            >
              Sign in
            </Link>
          </div>
        </div>
      </DefaultPageContainer>
    </>
  );
};

export default SignUpPage;
