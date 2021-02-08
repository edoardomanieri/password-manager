import React from "react";

function HeroBanner() {
  return (
    <section id="home">
      <div className="container">
        <div className="home-text">
          <div className="section-text__subtitle">SafePass - all in one place</div>
          <div className="section-text__title-big">
          Keep your passwords safe with SafePass
          </div>
          <div className="section-text__body">
            Manage your passwords, keep them safe and all in one place. Completely free service.
          </div>
          <a href="/signup" className="download-btn">
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
