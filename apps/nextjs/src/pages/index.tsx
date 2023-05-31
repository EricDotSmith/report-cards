import type { NextPage } from "next";
import React from "react";
import Link from "next/link";
import { NextSeo } from "next-seo";
import Image from "next/image";
import HowItWorks from "../components/Home/HowItWorks";
import Pricing from "../components/Home/Pricing";
import ContactUs from "../components/Home/ContactUs";
import AuthShowcase from "../components/Home/AuthShowcase";
import ScrollTo from "react-scroll-into-view";

const navigation = [
  { name: "Product", href: "#product" },
  { name: "Price", href: "#price" },
  { name: "Contact", href: "#contact" },
];

const PAGE_COLOR = "#f6f3ec";

const Home: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Report Cards"
        description=""
        additionalMetaTags={[{ name: "theme-color", content: PAGE_COLOR }]}
        additionalLinkTags={[{ rel: "icon", href: "/favicon.ico" }]}
      />
      <div className="isolate bg-white">
        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
          <svg
            className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
              fillOpacity="1"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#58c1fa" />
                <stop offset={1} stopColor="#5cc956" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="supports-backdrop-blur:bg-white/95 fixed z-10 w-full px-6 pt-6 backdrop-blur transition-colors lg:px-8">
          <nav
            className="flex items-center justify-between"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Report Cards</span>
                <Image
                  src="/report-card-icon-dark.png"
                  width={32}
                  height={32}
                  alt="Picture of the author"
                />
              </a>
            </div>
            <div className="hidden gap-x-4 sm:flex sm:gap-x-12">
              {navigation.map((item) => (
                <ScrollTo selector={item.href} smooth key={item.name}>
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    {item.name}
                  </button>
                </ScrollTo>
              ))}
            </div>
            <div className="flex lg:flex-1 lg:justify-end">
              <AuthShowcase />
            </div>
          </nav>
        </div>
        <main>
          <div className="relative px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
              {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full py-1 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Announcing our next round of funding.{" "}
                <a href="#" className="font-semibold text-indigo-600">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Read more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div> */}
              <div className="text-center">
                <h1
                  className="animate-text bg-gradient-to-r from-orange-500 via-purple-500 to-sky-500 bg-clip-text 
             text-6xl font-semibold  tracking-tight text-gray-900
            text-transparent"
                >
                  Report cards, done simply
                </h1>

                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Get started generating comments for your students report cards
                  in minutes. Saving you hours of time.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    href="/sign-up"
                    className="rounded-md bg-sky-500 px-3.5 py-1.5 text-base font-semibold leading-7 text-sky-50 shadow-sm hover:bg-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                  >
                    Get started
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute inset-x-0 top-[calc(100%-150rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-200rem)] lg:top-[calc(100%-160rem)]">
              <svg
                className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+28rem)] sm:h-[42.375rem]"
                viewBox="0 0 1155 678"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                  fillOpacity="1"
                  d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                />
                <defs>
                  <linearGradient
                    id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                    x1="1155.49"
                    x2="-78.208"
                    y1=".177"
                    y2="474.645"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#f08fa2" />
                    <stop offset={1} stopColor="#f2aa4b" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute inset-x-0 top-[calc(100%-60rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-80rem)]">
              <svg
                className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                viewBox="0 0 1155 678"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                  fillOpacity="1"
                  d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                />
                <defs>
                  <linearGradient
                    id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                    x1="1155.49"
                    x2="-78.208"
                    y1=".177"
                    y2="474.645"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#f08fa2" />
                    <stop offset={1} stopColor="#f2aa4b" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute inset-x-0 top-[calc(100%-40rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-40rem)]">
              <svg
                className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+7rem)] sm:h-[42.375rem]"
                viewBox="0 0 1155 678"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="url(#0-546c-4772-8c71-4d3f06d544bc)"
                  fillOpacity="0.7"
                  d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                />
                <defs>
                  <linearGradient
                    id="0-546c-4772-8c71-4d3f06d544bc"
                    x1="1155.49"
                    x2="-78.208"
                    y1=".177"
                    y2="474.645"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#f08fa2" />
                    <stop offset={1} stopColor="#b97cfc" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <HowItWorks />
            <Pricing />
            <ContactUs />
          </div>
        </main>
        <footer className="mt-24" aria-labelledby="footer-heading">
          <h2 id="footer-heading" className="sr-only">
            Footer
          </h2>
          <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
            <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
              <p className="text-xs leading-5 text-gray-500">
                &copy; 2023 ReportCards.io, Inc. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
