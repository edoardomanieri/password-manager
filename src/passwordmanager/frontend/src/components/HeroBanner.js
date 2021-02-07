import React from "react";

function HeroBanner() {
  return (
    <section id="home">
      <div className="container">
        <div className="home-text">
          <div className="section-text__subtitle">Keep your passwords safe</div>
          <div className="section-text__title-big">
          Keep your passwords safe with Password Manager
          </div>
          <div className="section-text__body">
            Dorem ipsum dolor sitamet, consectetur adipiscing elit, sed do eiusm
            tempor incididunt ulabore et dolore magna aliqua.
          </div>
          <a href="#download" className="download-btn">
            Get started
          </a>
        </div>

        <div className="section-image">
          <img src="../../static/images/safeapp.jpg" alt="app preview" />
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
