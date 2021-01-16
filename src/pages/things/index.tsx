import { useThingForm } from "@components/thing-form";
import { NotAuthorized } from "@errors";
import { GetServerSideProps, NextPage } from "next";
import nookies from "nookies";
import React from "react";

type Thing = {
  id: string;
  label: string;
};

type ThingsProps = {
  things: Thing[];
};

const Things: NextPage<ThingsProps> = ({ things }) => {
  const { DisplayFormButton, display, ThingForm } = useThingForm();

  console.log(things);
  return (
    <main className="container mx-auto pt-8 flex justify-center">
      <DisplayFormButton />
      {display ? <ThingForm /> : <>THINGS</>}
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

    return {
      props: {
        things: [],
      },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
};

export default Things;
