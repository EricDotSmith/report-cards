import { useAuth } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import { isValidPath, privatePaths } from "../../middleware";
import { trpc } from "../../utils/trpc";

const OnboardingModalComponent = dynamic(() =>
  import("./OnboardingModal").then((mod) => mod.OnboardingModal),
);

const OnboardingModalWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const { userId } = useAuth();
  const { pathname } = useRouter();

  const pathIfValid = isValidPath(pathname, privatePaths);

  const teacher = trpc.teacher.byId.useQuery(undefined, {
    enabled: !!userId && !!pathIfValid,
  });

  return (
    <>
      {children}
      {!!pathIfValid && !teacher.isLoading && !!teacher.data === false ? (
        <OnboardingModalComponent />
      ) : null}
    </>
  );
};

export default OnboardingModalWrapper;
