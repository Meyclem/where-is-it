import { Layout } from "@components/layout";
import type { AppProps } from "next/app";
import * as React from "react";

import "tailwindcss/tailwind.css";
import "../styles/globals.css";

import { AuthProvider } from "../contexts/auth-context";

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthProvider>
      <main>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </AuthProvider>
  );
}
export default App;
