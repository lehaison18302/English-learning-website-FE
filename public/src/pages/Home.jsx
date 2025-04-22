import React from "react";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";
import AudioButton from "../components/audio";

function Home() {
  return (
    <div className="main-layout">
      <Sidebar />
      <div style={{ marginLeft: '240px', padding: '20px' }}>
        <AudioButton />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
