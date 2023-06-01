import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

const AuthShowcase: React.FC = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {isSignedIn && (
        <>
          <Link
            href="/dashboard"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Dashboard <span aria-hidden="true">&rarr;</span>
          </Link>
        </>
      )}
      {!isSignedIn && (
        <Link
          href="/sign-in"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Log in <span aria-hidden="true">&rarr;</span>
        </Link>
      )}
    </div>
  );
};

export default AuthShowcase;
