import { Thing } from "@typings/thing";
import { format } from "date-fns";
import React from "react";

const ThingItem: React.FC<{ thing: Thing }> = ({ thing }) => {
  return (
    <li className="border mb-1 p-1">
      <p className="font-light text-pink-400">{thing.label}</p>
      <p className="text-sm font-thin">
        Loaned to <span className="font-light">{thing.borrower.name}</span> on{" "}
        <span className="font-light">
          {format(new Date(thing.loanDate), "PPP")}
        </span>
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
