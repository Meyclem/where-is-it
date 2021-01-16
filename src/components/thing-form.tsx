import React, { useState } from "react";

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
    const [label, setLabel] = useState("");

    const createThing = (): void => {
      console.log(label);
    };

    return (
      <form
        className="flex flex-col w-60"
        onSubmit={(event) => {
          event.preventDefault();
          createThing();
        }}
      >
        <label htmlFor="label" className="app-label">
          Label
        </label>
        <input
          type="text"
          className="app-input"
          id="label"
          onChange={(event) => setLabel(event.target.value)}
        />
        <button type="submit" className="btn">
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
