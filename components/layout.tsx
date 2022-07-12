import Head from "next/head";
import { PropsWithChildren } from "react";
import NavBar from "./navBar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Head>
        <title>Unsplash Clone</title>
        <meta name="description" content="Portfolio" />
      </Head>
      <NavBar />
      <main className="relative w-screen sm:pt-16">{children}</main>
    </>
  );
}
