import Container from "@/components/Container";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" bg mt-20 border-t  border-neutral-200 bg-neutral-50 p-2 py-10 text-xs dark:border-neutral-700 dark:bg-transparent   md:text-sm">
      <Container className="flex w-full justify-end">
        <div />
        <ul className="flex flex-wrap items-center gap-y-4 gap-x-6 whitespace-nowrap text-xs   md:text-sm">
          <li>
            <Link href="/about" className=" hover:underline  ">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">
              Contact Us
            </Link>
          </li>
          <li>
            <Link href="/terms" className=" hover:underline ">
              Terms of Service
            </Link>
          </li>
          <li>
            <Link href="/privacy" className=" hover:underline ">
              Privacy Policy
            </Link>
          </li>
        </ul>
      </Container>
    </footer>
  );
};

export default Footer;
