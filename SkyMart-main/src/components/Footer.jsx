import React from "react";

const Footer = () => {
  return (
    <footer className="neu mt-20 mx-4 sm:mx-8 mb-6 rounded-2xl py-10 text-center">
      <h2 className="text-4xl font-bold"><span className="text-[#FF8FC7]">PrimeBasket</span>
      </h2>

      <p className="text-[#6C6C6B] mt-4">
        All Rights Reserved © 2026 PrimeBasket. Built with React & Tailwind CSS.
      </p>

      <p className="text-[#6C6C6B] mt-2">
        Build by{" "}
        <a
          href="https://www.linkedin.com/in/farhan-khan-b99737254/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FF8FC7] font-semibold hover:underline"
        >
          Farhan Khan
        </a>
      </p>
    </footer>
  );
};

export default Footer;
