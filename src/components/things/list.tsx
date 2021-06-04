import { Thing } from "@typings/thing";
import { format } from "date-fns";
import React from "react";

const ThingItem: React.FC<{ thing: Thing }> = ({ thing }) => {
  return (
    <li className="border border-pink-200 mb-1 p-1">
      <p className="font-normal">{thing.label}</p>
      <p className="text-sm font-extralight">
        Borrowed by <span className="font-normal">{thing.borrower.name}</span>{" "}
        on {format(new Date(thing.loanDate), "PPP")}
      </p>
      {thing.note && <p>{thing.note}</p>}
    </li>
  );
};

const ThingsList: React.FC<{ things: Thing[] }> = ({ things }) => {
  return (
    <ul className="w-full">
      {things.map((thing) => {
        return <ThingItem key={thing.id} thing={thing} />;
      })}
    </ul>
  );
};

export { ThingsList };
