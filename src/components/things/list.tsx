import { firebaseClient } from "@firebase/client";
import { Thing } from "@typings/thing";
import { format } from "date-fns";
import React from "react";

const ThingItem: React.FC<{ thing: Thing }> = ({ thing }) => {
  return (
    <li className="border mb-1 p-1 flex justify-between">
      <div>
        <p className="font-light text-pink-400">{thing.label}</p>
        <p className="text-sm font-thin">
          Loaned to <span className="font-light">{thing.borrower.name}</span> on{" "}
          <span className="font-light">
            {format(new Date(thing.loanDate), "PPP")}
          </span>
        </p>
        {thing.note && <p className="whitespace-pre">{thing.note}</p>}
      </div>
      <div className="flex px-2 pt-4">
        <i
          className="fas fa-lg fa-trash text-gray-200 hover:text-pink-400 cursor-pointer transition-colors"
          aria-hidden="true"
          onClick={() => {
            const destroy = confirm(
              `Do you really want to delete '${thing.label}'?`,
            );
            if (destroy) {
              firebaseClient
                .firestore()
                .collection("things")
                .doc(thing.id)
                .delete();
            }
          }}
        />
      </div>
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
