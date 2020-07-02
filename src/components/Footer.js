import React from "react";
import { ReactComponent as Logo } from "../visa_logo.svg";
import github from "../GitHub-Mark-Light-32px.png";

function Footer() {
  return (
    <div className="footer fixed-bottom">
      <div className="footer-row">
        <Logo style={{ width: "100px", height: "60px" }} />
        <span style={{ margin: "auto" }}>
          Made with love, by p4nd3m1c.c0d3r5
        </span>
      </div>
      <div className="footer-social fixed-bottom">
        <div className="footer-row">
          <a className="github-icon" href="https://github.com/anqingchen">
            <img src={github} alt="" />
            <span>@anqingchen</span>
          </a>
          <a className="github-icon" href="https://github.com/ChuChu999">
            <img src={github} alt="" />
            <span>@ChuChu999</span>
          </a>
          <a className="github-icon" href="https://github.com/Eric-rWang">
            <img src={github} alt="" />
            <span>@Eric-rWang</span>
          </a>
          <a className="github-icon" href="https://github.com/kpence">
            <img src={github} alt="" />
            <span>@kpence</span>
          </a>
          <a className="github-icon" href="https://github.com/nlkolluri">
            <img src={github} alt="" />
            <span>@nlkolluri</span>
          </a>
          <a className="github-icon" href="https://github.com/seth4man">
            <img src={github} alt="" />
            <span>@seth4man</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
