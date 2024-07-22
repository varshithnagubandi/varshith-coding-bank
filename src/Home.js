import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="image-container"></div>
      <div className="text-container">
        <div>
          <h1 className="home-heading">VARSHITH BANK</h1>
        </div>
        <div className="home-content">
          <h2>Welcome!</h2>
          <p>
            Experience seamless transactions with our user-friendly interface.
            Whether you're a beginner or an experienced coder, Coding Bank
            provides financial solutions that cater to your unique needs. Our
            dedicated support team is available 24/7 to assist you with any
            inquiries or concerns.
          </p>
          <p>
            Enhance your financial journey with our competitive interest rates
            on savings accounts. We believe in rewarding our users, so enjoy
            perks and bonuses as you grow your savings with Coding Bank.
          </p>
          <p>
            Security is our top priority. Rest assured that your personal and
            financial information is protected using state-of-the-art encryption
            technologies. Focus on your coding projects while we take care of
            the security of your financial data.
          </p>
          <p>
            Coding Bank - Where coding meets banking excellence. Start your
            journey with us today and experience a new era of online banking
            designed for developers like you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
