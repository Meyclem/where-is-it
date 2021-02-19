import { useRouter } from "next/router";

import { firebaseClient } from "../firebase/client";

export const useGoogleAuthProvider = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
): (() => void) => {
  const router = useRouter();
  const provider = new firebaseClient.auth.GoogleAuthProvider();

  return () => {
    setIsLoading(true);
    firebaseClient
      .auth()
      .signInWithPopup(provider)
      .then(({ credential }) => {
        if (credential) {
          firebaseClient
            .auth()
            .currentUser?.getIdToken()
            .then(async () => {
              const user = await firebaseClient.auth()?.currentUser;

              if (user) {
                const token = await user.getIdToken();
                await fetch("/api/users", {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });

                if (token) {
                  router.push("/things");
                }
              }
            });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("🔴🔴🔴", error);
        console.error("🔴🔴🔴", error.message);
        console.error("🔴🔴🔴", error.stacktrace);
      });
  };
};
