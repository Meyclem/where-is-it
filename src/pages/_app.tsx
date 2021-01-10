import type { AppProps } from "next/app";
import * as React from "react";

import { AuthProvider } from "../contexts/auth-context";

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
export default App;
