import { firebaseClient } from "@firebase/client";
import React, { useEffect, useState } from "react";
import { useAuth } from "src/contexts/auth-context";

import { InputGroup } from "./input-group";

export const useThingForm = (): {
  DisplayFormButton: React.FC;
  ThingForm: React.FC;
  display: boolean;
} => {
  const [display, setDisplay] = useState(false);

  const DisplayFormButton: React.FC = () => {
    return (
      <button className="add-thing-btn" onClick={() => setDisplay(!display)}>
        {display ? "See my things" : "I lent something"}
      </button>
    );
  };

  const ThingForm: React.FC = () => {
    const { user } = useAuth();
    const [label, setLabel] = useState("");
    const [note, setNote] = useState("");
    const [loanDate, setLoanDate] = useState("");
    const [borrowerEmail, setBorrowerEmail] = useState("");
    const [borrowerName, setBorrowerName] = useState("");
    const [disabled, setDisabled] = useState(true);

    const createThing = (): void => {
      if (user) {
        const thing = {
          label,
          note,
          loanDate,
          user: {
            uid: user.uid,
            name: user.displayName,
          },
          borrower: {
            name: borrowerName,
            ...(borrowerEmail ? { email: borrowerEmail } : {}),
          },
        };
        firebaseClient
          .firestore()
          .collection("things")
          .add(thing)
          .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            setDisplay(false);
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
      }
    };

    const validateForm = (): void => {
      const checkLabel = label.length !== 0;
      const checkLoanDate = loanDate.length !== 0;
      const checkBorrowerName = borrowerName.length !== 0;
      setDisabled(!(checkLabel && checkLoanDate && checkBorrowerName));
    };

    useEffect(() => {
      validateForm();
    }, [loanDate, label, borrowerName]);

    return (
      <form
        className="flex flex-col w-60"
        onSubmit={(event) => {
          event.preventDefault();
          createThing();
        }}
      >
        <InputGroup
          className="mb-4"
          id="label"
          label="Label"
          onChange={(event) => {
            setLabel(event.target.value);
          }}
          initialValue={label}
          required={true}
        />
        <InputGroup
          className="mb-4"
          id="loanDate"
          label="Loan date"
          type="date"
          required={true}
          onChange={(event) => {
            setLoanDate(event.target.value);
          }}
          initialValue={loanDate}
        />
        <InputGroup
          className="mb-4"
          id="borrower-name"
          label="Borrower name"
          required={true}
          onChange={(event) => {
            setBorrowerName(event.target.value);
          }}
          initialValue={borrowerName}
        />
        <InputGroup
          className="mb-4"
          type="email"
          id="borrower-email"
          label="Borrower email"
          onChange={(event) => {
            setBorrowerEmail(event.target.value);
          }}
          initialValue={borrowerEmail}
        />
        <InputGroup
          id="note"
          label="Note"
          type="text-area"
          rows={4}
          onChange={(event) => {
            setNote(event.target.value);
          }}
          initialValue={note}
        />
        <button type="submit" className="btn mt-8" disabled={disabled}>
          Create Thing
        </button>
      </form>
    );
  };

  return {
    DisplayFormButton,
    ThingForm,
    display,
  };
};
