import React from "react";

interface FooterProps {
  createdBy: string;
}

const Footer: React.FC<FooterProps> = ({ createdBy }) => {
  return (
    <footer className="py-4 text-xl font-semibold text-center text-black bg-gray-400">
      <p>
        Queue Simulator © {new Date().getFullYear()}; created by{" "}
        <a href="https://github.com/Azzaxy1" className="underline">
          {createdBy}
        </a>
      </p>
    </footer>
  );
};

export default Footer;
