import React from "react";

const Title: React.FC<{ text: string }> = ({ text }) => {
  return (
    <h1 className="text-3xl lg:text-6xl text-white font-extrabold capitalize mb-10">
      {text}
    </h1>
  );
};

export default Title;
