import Head from "next/head";
import { PropsWithChildren } from "react";
import NavBar from "./navBar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Head>
        <title>Search Images</title>
        <meta name="description" content="Portfolio" />
      </Head>
      <NavBar />
      <main className="w-screen pt-16">{children}</main>
    </>
  );
}