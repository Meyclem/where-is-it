import { firebaseClient } from "@firebase/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "src/contexts/auth-context";

type NavLinkProps = {
  href: string;
  displayText: string;
};

const NavLink: React.FC<NavLinkProps> = ({ displayText, href }) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <a className={router.route === href ? "active" : ""}>{displayText}</a>
    </Link>
  );
};

export const Navbar: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <div className="navbar flex items-center justify-between px-6 h-14">
      <NavLink href="/" displayText="Home" />
      {user ? (
        <>
          <NavLink href="/things" displayText="Things" />
          <a
            className="cursor-pointer"
            onClick={() => {
              router.push("/");
              firebaseClient.auth().signOut();
            }}
          >
            Logout
          </a>
        </>
      ) : (
        <NavLink href="/login" displayText="Login" />
      )}
    </div>
  );
};
