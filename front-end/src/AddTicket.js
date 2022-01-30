import React, { useState } from "react";

const AddTicket = () => {
  var [name, setName] = useState();
  var [date, setDate] = useState();

  const nameUpdate = (event) => {
    // Dealing with name field changes to update our state
    setName(event.target.value);
  };

  const dateUpdate = (event) => {
    // Dealing with name field changes to update our state
    setDate(event.target.value);
  };

  const handleSubmit = () => {
    // Once the form has been submitted, this function will post to the backend
    const postURL = "http://localhost:3050/ticket/tickets/"; //Our previously set up route in the backend
    fetch(postURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // We should keep the fields consistent for managing this data later
        //userid: _id,
        name: name,
      }),
    });
  };

  return (
    <div className="Form">
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input required onChange={nameUpdate}></input>
        <br></br>
      </form>
    </div>
  );
};

export default AddTicket;
