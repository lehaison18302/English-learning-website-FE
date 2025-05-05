import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import PronounceCard from "../components/pronounceCard";
import apiCommon from "../apis/functionApi";

const Pronounce = () => {
  const [pronounceData, setPronounceData] = useState({ vowels: [], consonants: [] });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await apiCommon.getPronounce();
        const items = Array.isArray(res.data?.data) ? res.data.data : [];
        const vowels = items.filter((item) => item.type === "vowel");
        const consonants = items.filter((item) => item.type === "consonant");
        setPronounceData({ vowels, consonants });
      } catch (error) {
        console.error("Error fetching pronounce data:", error);
      }
    }
    fetchData();
  }, []);

  const handlePlayAudio = (item) => {
    if (item.IPA_AudioUrl) {
      new Audio(item.IPA_AudioUrl).play();
    }
    if (item.exampleWord?.audioUrl) {
      setTimeout(() => {
        new Audio(item.exampleWord.audioUrl).play();
      }, 1000);
    }
  };

  const renderSection = (title, list) => {
    const rows = [];
    for (let i = 0; i < list.length; i += 3) {
      rows.push(list.slice(i, i + 3));
    }

    return (
      <>
        <h2 className="text-center text-2xl font-bold mt-8">{title}</h2>
        <div className="flex flex-col items-center space-y-14 mt-10">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-20">
              {row.map((item, idx) => (
                <PronounceCard
                  key={item._id || idx}
                  symbol={item.symbol}
                  exampleWord={item.exampleWord.word}
                  onClick={() => handlePlayAudio(item)}
                />
              ))}
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="main-layout bg-gray-100 min-h-screen">
      <Sidebar />
      <div style={{ marginLeft: '240px', padding: '20px', marginRight: '240px' }}>
        <h2 className="text-3xl font-bold text-center">Cùng học phát âm tiếng Anh nào!</h2>
        <p className="text-center text-gray-500 mt-2">Tập nghe và học phát âm các âm trong tiếng Anh</p>

        <div className="flex justify-center mt-6">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-all">
            BẮT ĐẦU
          </button>
        </div>

        {renderSection("Nguyên âm", pronounceData.vowels)}
        {renderSection("Phụ âm", pronounceData.consonants)}
      </div>
    </div>
  );
};

export default Pronounce;
