import React, { useState } from "react";
import Calendar from "react-calendar";

const Calender = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
  };
  return (
    <>
      <div className="Calender">
        <Calendar onChange={onChange} value={date} />
      </div>
    </>
  );
};

export default Calender;
