import React, { useState } from "react";
import AudioButton from "./audio";

const Pronounce = ({ data }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleCardClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                {data.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleCardClick(item)}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "16px",
                            cursor: "pointer",
                            width: "150px",
                            textAlign: "center",
                        }}
                    >
                        <h3>{item.symbol}</h3>
                        <p>{item.type}</p>
                    </div>
                ))}
            </div>

            {selectedItem && (
                <div
                    style={{
                        marginTop: "20px",
                        padding: "16px",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                    }}
                >
                    <h2>Details</h2>
                    <p>
                        <strong>Symbol:</strong> {selectedItem.symbol}
                    </p>
                    <p>
                        <strong>Type:</strong> {selectedItem.type}
                    </p>
                    <p>
                        <strong>Example Word:</strong> {selectedItem.exampleWord.word}
                    </p>
                    <AudioButton audioUrl={selectedItem.exampleWord.audioUrl} />
                    <p>
                        <strong>IPA Audio:</strong>
                    </p>
                    <AudioButton audioUrl={selectedItem.IPA_AudioUrl} />
                </div>
            )}
        </div>
    );
};

export default Pronounce;