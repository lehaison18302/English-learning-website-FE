import React from "react";

const PronounceCard = ({ symbol, exampleWord, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center
                 bg-gray-100 border border-gray-300 shadow-sm
                 hover:shadow-md transform hover:-translate-y-2
                 transition-transform duration-300
                 rounded-2xl
                 w-[640px] h-[200px]"
    >
      <div className="text-5xl font-bold">{symbol}</div>
      <div className="text-xl mt-4 text-gray-700">{exampleWord}</div>
    </button>
  );
};

export default PronounceCard;
