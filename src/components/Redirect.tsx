import React from "react";
import Countdown from "react-countdown";

const timer: React.FC<{ seconds: number }> = ({ seconds }) => {
  return (
    <span className="text-base capitalize text-primary font-extrabold">
      auto redirect in {seconds}
    </span>
  );
};

const Redirect = () => {
  return <Countdown date={Date.now() + 5000} renderer={timer} />;
};

export default Redirect;
