import { NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { DefaultPageContainer } from "../components/Page";

const PAGE_COLOR = "#f6f3ec";

const NotFoundPage: NextPage = () => {
  return (
    <>
      <NextSeo
        title="404"
        titleTemplate="Report Cards | %s"
        description="Not Found"
        additionalMetaTags={[{ name: "theme-color", content: PAGE_COLOR }]}
        additionalLinkTags={[{ rel: "icon", href: "/favicon.ico" }]}
      />
      <DefaultPageContainer path="/404">
        {/* <main className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8"> */}
        <div className="lg:px- grid min-h-full place-items-center py-24 px-6 text-center sm:py-32">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="flex h-14 w-full items-center text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
            />
          </svg>
          <p className="mt-4 text-base font-semibold text-gray-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              Go back home
            </Link>
            <Link href="#" className="text-sm font-semibold text-sky-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
        {/* </main> */}
      </DefaultPageContainer>
    </>
  );
};

export default NotFoundPage;
