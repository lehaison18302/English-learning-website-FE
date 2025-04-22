import React from "react"; 
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";
import AudioButton from "../components/audio";

function Pronounce() {
  return (
    <div className="main-layout">
      <Sidebar />
      <AudioButton />
      <Footer />
    </div>
  );
}
export default Pronounce;