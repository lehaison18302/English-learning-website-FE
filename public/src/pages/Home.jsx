import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import AudioButton from "../components/audio";

function Home() {
  return (
    <div className="main-layout">
      <Header />
      <AudioButton />
      <Footer />
    </div>
  );
};

export default Home;
