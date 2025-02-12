import React from "react";
import { useTimer } from "react-timer-hook";

const Timer = ({ expiryTimestamp }) => {
  const { seconds, minutes, hours, days } = useTimer({ expiryTimestamp });
  return (
    <ul>
      <li>
        <span>{days}</span> Ngày
      </li>
      <li>
        <span>{hours}</span> Giờ
      </li>
      <li>
        <span>{minutes}</span> Phút
      </li>
      <li>
        <span>{seconds}</span> Giây
      </li>
    </ul>
  );
};

export default Timer;
