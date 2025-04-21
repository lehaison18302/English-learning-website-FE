import React from "react"; 
import Header from "../components/header";
import Footer from "../components/footer";
import AudioButton from "../components/audio";

function Pronounce() {
  return (
    <div className="main-layout">
      <Header />
      <AudioButton />
      <Footer />
    </div>
  );
}
export default Pronounce;