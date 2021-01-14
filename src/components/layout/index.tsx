import Head from "next/head";
import React, { ReactNode } from "react";

import { Navbar } from "./navbar";

type Props = {
  children?: ReactNode;
  title?: string;
};

export const Layout = ({ children, title = "WII?" }: Props): JSX.Element => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <div className="h-screen flex flex-col">
        <Navbar />
        {children}
      </div>
    </>
  );
};
