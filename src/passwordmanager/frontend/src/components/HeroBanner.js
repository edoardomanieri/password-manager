import React from "react";

function GetStartedButton() {
  return (
    <a href="/signup" className="download-btn" style={{ textAlign: "center"}}>
    Get started
    </a>
  );
}


export default function HeroBanner( {isLoggedIn} ) {

  return (
    <section id="home">
      <div className="container">
        <div className="home-text">
          <div className="section-text__subtitle">BetterPass - all in one place</div>
          <div className="section-text__title-big">
          Keep your passwords safe with BetterPass
          </div>
          <div className="section-text__body">
            Manage your passwords, keep them safe and all in one place. Completely free service.
          </div>
          {isLoggedIn ? null :
          <div>
          <GetStartedButton /> 
          </div>
          }
        </div>

        <div className="section-image">
          <img src="../../static/images/safeapp.jpg" alt="app preview" />
        </div>
      </div>
    </section>
  );
}

