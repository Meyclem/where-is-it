import {
  InferGetServerSidePropsType,
  GetServerSideProps,
  NextPage,
} from "next";
import nookies from "nookies";
import React from "react";

import { firebaseAdmin } from "../firebase/admin";
import { firebaseClient } from "../firebase/client";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    console.log(JSON.stringify(cookies, null, 2));
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email } = token;

    // the user is authenticated!
    // FETCH STUFF HERE

    return {
      props: { message: `Your email is ${email} and your UID is ${uid}.` },
    };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      // `as never` is required for correct type inference
      // by InferGetServerSidePropsType below
      props: {} as never,
    };
  }
};

const AuthenticatedPage: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => (
  <div>
    <p>{props.message}</p>
    <button
      onClick={async () => {
        await firebaseClient.auth().signOut();
        window.location.href = "/";
      }}
    >
      Sign out
    </button>
  </div>
);

export default AuthenticatedPage;
