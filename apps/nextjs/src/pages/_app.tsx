// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { trpc } from "../utils/trpc";
import { useEffect } from "react";
import { useRouter } from "next/router";
import sidebarNavigation from "../components/navigation/Paths";
import useColorStore from "../store/colorStore";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  const { pathname } = useRouter();
  const changeColor = useColorStore((state) => state.changeColor);

  useEffect(() => {
    const item = sidebarNavigation.find((item) => item.href === pathname);
    document.body.style.backgroundColor = item?.color ?? "#f6f3ec";
    changeColor(item?.color ?? "#f6f3ec");
  }, [changeColor, pathname]);

  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default trpc.withTRPC(MyApp);
