import React from "react";
import safeapp from "../../static/images/safeapp.jpg";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";

function GetStartedButton() {
  return (
    <a href="/signup" className="download-btn" style={{ textAlign: "center" }}>
      Get started
    </a>
  );
}

function Features() {
  return (
    <section id="features">
      <div className="container">
        <div className="section-image__small">
          <img src={safeapp} alt="features" />
        </div>
        <div className="section-text">
          <div className="section-text__title">
            Some of the best features Of Our App!
          </div>

          <div className="row">
            <div className="feature-box col-50">
              <div className="section-text__title-small">Easy to customize</div>
              <div className="section-text__body">
                Aorem psum olorsit amet ectetur adipiscing elit, sed dov.
              </div>
            </div>

            <div className="feature-box col-50">
              <div className="section-text__title-small">Extreme Security</div>
              <div className="section-text__body">
                Aorem psum olorsit amet ectetur adipiscing elit, sed dov.
              </div>
            </div>
          </div>

          <div className="row">
            <div className="feature-box col-50">
              <div className="section-text__title-small">Customer Support</div>
              <div className="section-text__body">
                Aorem psum olorsit amet ectetur adipiscing elit, sed dov.
              </div>
            </div>

            <div className="feature-box col-50">
              <div className="section-text__title-small">Creative Design</div>
              <div className="section-text__body">
                Aorem psum olorsit amet ectetur adipiscing elit, sed dov.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-30">
            <div className="footer-text__title">Anapp</div>
            <div className="footer-text__body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do
              eiusmod tempor incididunt ut labore.
            </div>
          </div>
          <div className="col-30">
            <div className="footer-text__title">Quick links</div>
            <ul className="footer-list">
              <li>
                <a href="#home">About</a>
              </li>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
              <li>
                <a href="#download">Download</a>
              </li>
            </ul>
          </div>
          <div className="col-30">
            <div className="footer-text__title">Newsletter</div>
            <div className="footer-text__body">
              Heaven fruitful doesn't over lesser in days. Appear
            </div>
            <div className="footer-input">
              <input type="text" name="email" placeholder="Email id" />
              <div className="footer-input__icon">
                <ion-icon name="paper-plane-outline" />
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          Inspired by Colorlib, coded by pathetic geek.
        </div>
      </div>
    </footer>
  );
}

function Services() {
  return (
    <section id="services">
      <div className="section-text">
        <div className="section-text__title-centered">
          How we can help you with BetterPass
        </div>
        <div className="service-cards">
          <div className="service-card">
            <div className="service-card__icon">
              <ion-icon name="reader-outline" />
            </div>
            <div className="service-card__text-container">
              <div className="section-text__title-small">Easily Manage</div>
              <div className="section-text__body">
                Keep all of your passwords in one place and quickly retrieve
                them using the search function.
              </div>
            </div>
          </div>

          <div className="service-card active">
            <div className="service-card__icon">
              <ion-icon name="wallet-outline" />
            </div>
            <div className="service-card__text-container">
              <div className="section-text__title-small">
                End to End Encryption
              </div>
              <div className="section-text__body">
                We don't store your passwords in our databases, we use a
                sophisticated encryption algorithm to keep them safe.
              </div>
            </div>
          </div>

          <div className="service-card">
            <div className="service-card__icon">
              <ion-icon name="chatbubble-ellipses-outline" />
            </div>
            <div className="service-card__text-container">
              <div className="section-text__title-small">
                Quick Update and Delete
              </div>
              <div className="section-text__body">
                Quickly update or delete old passwords that you no longer use.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HeroBanner({ isLoggedIn }) {
  const history = useHistory();

  const handleClick = () => {
    history.push("/create");
  };

  return (
    <div>
      <section id="home">
        <div className="container">
          <div className="home-text">
            <div className="section-text__subtitle">
              BetterPass - all in one place
            </div>
            <div className="section-text__title-big">
              Keep your passwords safe with BetterPass
            </div>
            <div className="section-text__body">
              Manage your passwords, keep them safe and all in one place.
              Completely free service.
            </div>
            {isLoggedIn ? null : (
              <div>
                <GetStartedButton />
              </div>
            )}
          </div>

          <div className="section-image">
            <img src={safeapp} alt="app preview" />
          </div>
        </div>
      </section>
      {!isLoggedIn ? null : (
        <IconButton
          style={{ fontSize: 80, position: "fixed", bottom: 30, right: 5 }}
          onClick={handleClick}
        >
          <Icon style={{ fontSize: 80 }} color="primary">
            add_circle
          </Icon>
        </IconButton>
      )}
      <Services />
    </div>
  );
}
