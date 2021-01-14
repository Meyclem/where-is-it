import Link from "next/link";
import React from "react";

type AppLinkProps = {
  href: string;
  displayText: string;
};

export const AppLink: React.FC<AppLinkProps> = ({ displayText, href }) => {
  return (
    <Link href={href}>
      <a>{displayText}</a>
    </Link>
  );
};
