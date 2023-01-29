import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { PageContainer } from "../../components/Page";
import { getAuth } from "@clerk/nextjs/server";
import { GetServerSideProps } from "next";

const SignUpPage = () => (
  <PageContainer
    pageTopBar={
      <div className="flex w-full justify-between bg-[#f7f3ed] px-4 pt-8">
        <div className="flex w-full justify-center sm:w-auto sm:justify-start">
          logo here
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
    }
  >
    <div className="flex w-full flex-col items-center justify-center px-4 pt-12">
      <span className="text-center text-2xl font-bold text-gray-700 md:text-4xl">
        Create your account
      </span>

      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
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
  </PageContainer>
);

export default SignUpPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = getAuth(ctx.req);

  if (userId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
