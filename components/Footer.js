import Image from "next/image";
import Container from "./Container";
import chrome from "@/assets/available-on-chrome.png";

const Footer = () => {
  return (
    <footer className="border-t py-10 dark:border-slate-800">
      <Container className="flex items-center justify-center ">
        <a href="#">
          <Image
            className="w-64"
            src={chrome}
            alt="Available in the Chrome Web Store"
          />
        </a>
      </Container>
    </footer>
  );
};

export default Footer;
