import Image from "next/image";
import Container from "./Container";
import chromeImg from "@/assets/available-on-chrome.png";

const Footer = () => {
  return (
    <footer className="mt-40 border-t py-10 dark:border-neutral-800">
      <Container className="flex items-center justify-center ">
        <a href="#">
          <Image
            className="w-64"
            src={chromeImg}
            alt="Available in the Chrome Web Store"
          />
        </a>
      </Container>
    </footer>
  );
};

export default Footer;
