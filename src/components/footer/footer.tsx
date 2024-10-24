import React from "react";
import "./footer.css";
import { FaFacebookF } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { IoLogoTwitter } from "react-icons/io";
import LOGO from "../../assets/logo-vertical.png";

const Footer: React.FC = () => {
  return (
    <footer id="footer">
      <a href="#" className="footer__logo">
        <img src={LOGO} alt="supa logo" />
      </a>

      <div>
        <h2 className="footer_title">Partners</h2>
        <div className="permalinks">
          <li>
            <a href="#">Partner 1</a>
          </li>
          <li>
            <a href="#about">Partner 2</a>
          </li>
          <li>
            <a href="#contact">Partner 3</a>
          </li>
          <li>
            <a href="#services">Partner 3</a>
          </li>
        </div>
      </div>
      <div>
        <h2 className="footer_title">Usage</h2>
        <div className="permalinks">
          <li>
            <a href="#services">Conditions</a>
          </li>
          <li>
            <a href="#services">Terms of Use</a>
          </li>
          <li>
            <a href="#services">Data Protection</a>
          </li>
          <li>
            <a href="#services">How does it work</a>
          </li>
        </div>
      </div>
      <div>
        <h2 className="footer_title">Company</h2>
        <div className="permalinks">
          <li>
            <a href="#about">About Us</a>
          </li>
          <li>
            <a href="#contact">Contact Us</a>
          </li>
        </div>
      </div>
      <div>
        <div>
          <h2 className="footer_title">Social Links</h2>
          <div className="footer__socials">
            <a href="https://facebook.com">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com">
              <FiInstagram />
            </a>
            <a href="https://twitter.com">
              <IoLogoTwitter />
            </a>
          </div>
        </div>
        <div className="footer__copyright">
          <small>&copy; Supa. All rights reserved</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
