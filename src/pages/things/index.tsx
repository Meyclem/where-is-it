import { useThingForm } from "@components/thing-form";
import { ThingsList } from "@components/things/list";
import { NotAuthorized } from "@errors";
import { firebaseClient } from "@firebase/client";
import { Thing } from "@typings/thing";
import { GetServerSideProps, NextPage } from "next";
import nookies from "nookies";
import React, { useEffect, useState } from "react";
import { useAuth } from "src/contexts/auth-context";

type ThingsProps = {
  things: Thing[];
  error?: Record<string, unknown>;
};

const Things: NextPage<ThingsProps> = ({ things, error }) => {
  const { DisplayFormButton, display, ThingForm } = useThingForm();
  const { user } = useAuth();
  const [thingsToDisplay, setThings] = useState<Thing[]>(things);

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    if (user) {
      const unsubscribe = firebaseClient
        .firestore()
        .collection("things")
        .where("user.uid", "==", user.uid)
        .orderBy("loanDate", "asc")
        .onSnapshot(function (querySnapshot) {
          const things: Thing[] = [];
          querySnapshot.forEach(function (doc) {
            things.push({ ...doc.data(), id: doc.id } as Thing);
          });
          setThings(things);
        });
      return () => unsubscribe();
    }
  }, [things.length]);

  return (
    <main className="container mx-auto pt-6 md:pt-14 flex justify-center">
      <DisplayFormButton />
      {display ? <ThingForm /> : <ThingsList things={thingsToDisplay} />}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps<ThingsProps> = async (
  ctx,
) => {
  try {
    const cookies = nookies.get(ctx);
    const accessToken = cookies.token;

    if (!accessToken) {
      throw new NotAuthorized();
    }

    const url = `http${ctx.req.headers.host?.match(/localhost/) ? "" : "s"}://${
      ctx.req.headers.host
    }/`;

    const res = await fetch(url + "api/things", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const body = await res.json();

    return {
      props: {
        things: body.length > 0 ? body : [],
      },
    };
  } catch (err) {
    return {
      props: {
        things: [],
        error: err.message,
      },
    };
  }
};

export default Things;
