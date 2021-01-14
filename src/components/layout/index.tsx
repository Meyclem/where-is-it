import Head from "next/head";
import React, { ReactNode } from "react";
import Div100vh from "react-div-100vh";

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
      <Div100vh className="flex flex-col">
        <Navbar />
        {children}
      </Div100vh>
    </>
  );
};
