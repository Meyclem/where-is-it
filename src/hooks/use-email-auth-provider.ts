import { useRouter } from "next/router";

import { firebaseClient } from "../firebase/client";

export const useEmailAuthProvider = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
): {
  signInWithEmail: (email: string, password: string) => void;
  signUpWithEmail: (email: string, name: string, password: string) => void;
} => {
  const router = useRouter();

  const findOrCreateUser = async (): Promise<void> => {
    const user = await firebaseClient.auth()?.currentUser;

    if (user) {
      const token = await user.getIdToken();
      if (token) {
        await fetch("/api/users", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        router.push("/things");
        setIsLoading(false);
      }
    }
  };

  const signUpWithEmail = (
    email: string,
    name: string,
    password: string,
  ): void => {
    setIsLoading(true);
    firebaseClient
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        const user = firebaseClient.auth().currentUser;
        if (user) {
          await user.updateProfile({
            displayName: name,
          });
        }
      })
      .then(findOrCreateUser)
      .catch((error) => {
        setIsLoading(false);
        console.error("🔴🔴🔴", error);
        console.error("🔴🔴🔴", error.message);
        console.error("🔴🔴🔴", error.stacktrace);
      });
  };

  const signInWithEmail = (email: string, password: string): void => {
    setIsLoading(true);
    firebaseClient
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        router.push("/things");
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("🔴🔴🔴", error);
        console.error("🔴🔴🔴", error.message);
        console.error("🔴🔴🔴", error.stacktrace);
      });
  };

  return { signUpWithEmail, signInWithEmail };
};
