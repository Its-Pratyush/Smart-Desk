import React, { useState } from "react";

const Clock = () => {
  let time = new Date().toLocaleTimeString();
  let [currentTime, setCurrentTime] = useState(time);

  const updateTime = () => {
    let time = new Date().toLocaleTimeString();
    setCurrentTime(time);
  };

  setInterval(updateTime, 1000);

  return (
    <>
      <h1>{currentTime}</h1>
    </>
  );
};

export default Clock;
