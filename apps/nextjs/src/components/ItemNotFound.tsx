import Link from "next/link";

interface ItemNotFoundProps {
  title: string;
}

const ItemNotFound: React.FC<ItemNotFoundProps> = ({ title }) => {
  return (
    <>
      <div className="grid min-h-full place-items-center py-24 px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="flex h-14 w-full items-center text-sky-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
            />
          </svg>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-sky-800 sm:text-5xl">
            {title} not found
          </h1>
          <p className="mt-6 text-base leading-7 text-sky-700">
            Sorry, we couldn&apos;t find the class you&apos;re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/dashboard"
              className="rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              Go back to dashboard
            </Link>
            <a href="#" className="text-sm font-semibold text-sky-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemNotFound;
