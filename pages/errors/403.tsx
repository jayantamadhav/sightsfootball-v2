import React from "react";

const Http403: React.FC = (): any => {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <div className="text-5xl text-center">
        You are not authorized to view this page
      </div>
      <div className="py-5 text-2xl text flex justify-center font-medium text-purple-300">
        SightsFootball
      </div>
    </div>
  );
};

export default Http403;
