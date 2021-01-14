import { useEmailAuthProvider } from "@hooks/use-email-auth-provider";
import { useGoogleAuthProvider } from "@hooks/use-google-auth-provider";
import { NextPage } from "next";
import React, { useState } from "react";

const Login: NextPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
  const [showSignInForm, setShowSignInForm] = useState<boolean>(false);
  const [showSignUpForm, setShowSignUpForm] = useState<boolean>(false);
  const googleConnect = useGoogleAuthProvider(setIsLoading);
  const { signUpWithEmail, signInWithEmail } = useEmailAuthProvider(
    setIsLoading,
  );

  const validateUser = (): void => {
    if (email !== "" && password !== "" && !showSignUpForm) {
      setSubmitDisabled(false);
    }
    if (email !== "" && password !== "" && showSignUpForm && name !== "") {
      setSubmitDisabled(false);
    }
  };

  return (
    <div className="centered-content">
      <div className="flex flex-col justify-center h-full w-60">
        {showSignInForm ? (
          <form className="flex flex-col overflow-hidden">
            <label className="app-label" htmlFor="email">
              Email
            </label>
            <input
              className="app-input"
              type="email"
              id="email"
              placeholder="email@provider.com"
              onChange={(event) => {
                setEmail(event.target.value);
                validateUser();
              }}
            />
            {showSignUpForm && (
              <>
                <label className="app-label mt-2" htmlFor="name">
                  Name
                </label>
                <input
                  className="app-input"
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  onChange={(event) => {
                    setName(event.target.value);
                    validateUser();
                  }}
                />
              </>
            )}
            <label className="app-label mt-2" htmlFor="password">
              Password
            </label>
            <input
              className="app-input mb-8"
              type="password"
              id="password"
              onChange={(event) => {
                setPassword(event.target.value);
                validateUser();
              }}
            />
            {showSignUpForm ? (
              <>
                <button
                  className="btn"
                  type="submit"
                  onClick={(event) => {
                    event.preventDefault();
                    signUpWithEmail(email, name, password);
                  }}
                  disabled={submitDisabled}
                >
                  Create account
                </button>
                <a
                  className="text-pink-400 text-sm text-center cursor-pointer mt-2"
                  onClick={() => setShowSignUpForm(false)}
                >
                  I already have an account
                </a>
                <a
                  className="text-pink-400 text-sm text-center cursor-pointer mt-2"
                  onClick={() => {
                    setShowSignUpForm(false);
                    setShowSignInForm(false);
                  }}
                >
                  Choose another login method
                </a>
              </>
            ) : (
              <>
                <button
                  className="btn"
                  type="submit"
                  onClick={(event) => {
                    event.preventDefault();
                    signInWithEmail(email, password);
                  }}
                  disabled={submitDisabled}
                >
                  Login with email
                </button>
                <a
                  className="text-pink-400 text-sm text-center cursor-pointer mt-2"
                  onClick={() => setShowSignUpForm(true)}
                >
                  I don&apos;t have an account yet
                </a>
                <a
                  className="text-pink-400 text-sm text-center cursor-pointer mt-2"
                  onClick={() => {
                    setShowSignUpForm(false);
                    setShowSignInForm(false);
                  }}
                >
                  Choose another login method
                </a>
              </>
            )}
          </form>
        ) : (
          <>
            <button className="btn mb-2" onClick={() => googleConnect()}>
              Login with Google
            </button>
            <button
              className="btn"
              onClick={() => setShowSignInForm(!showSignInForm)}
            >
              Login with Email
            </button>
          </>
        )}
      </div>
      <div className={`loader ${isLoading ? "flex" : "hidden"}`}>
        <p className="text-4xl font-black text-pink-400">LOADING</p>
      </div>
    </div>
  );
};

export default Login;
