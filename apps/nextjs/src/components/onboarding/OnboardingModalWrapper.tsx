import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import { isValidPath, privatePaths } from "../../middleware";
import { trpc } from "../../utils/trpc";
import { OnboardingModal } from "./OnboardingModal";

const OnboardingModalWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const { userId } = useAuth();
  const { pathname } = useRouter();

  const pathIfValid = isValidPath(pathname, privatePaths);

  const teacher = trpc.teacher.byId.useQuery(userId ?? "", {
    enabled: !!userId && !!pathIfValid,
  });

  return (
    <>
      {children}
      {!!pathIfValid && !teacher.isLoading && !!teacher.data === false ? (
        <OnboardingModal />
      ) : null}
    </>
  );
};

export default OnboardingModalWrapper;
