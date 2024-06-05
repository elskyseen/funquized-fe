import React from "react";

const Title: React.FC<{ title: string; answer: string }> = ({
  title,
  answer,
}) => {
  return (
    <div className="flex justify-between border-b-4 border-primary mb-4 py-2">
      <p className="text-3xl font-extrabold text-primary capitalize">{title}</p>
      <p className="text-3xl font-extrabold text-primary">{answer}</p>
    </div>
  );
};

export default Title;
