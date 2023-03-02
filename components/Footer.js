const Footer = () => {
  return (
    <footer className=" mt-1 flex items-center justify-between  whitespace-nowrap bg-neutral-400 p-2 text-xs shadow  md:p-4 md:text-sm">
      <div />
      <ul className=" flex  items-center space-x-4 whitespace-nowrap py-2 text-xs text-white dark:text-neutral-100 sm:mt-0 md:text-sm">
        <li>
          <a href="#" className=" hover:underline  ">
            About
          </a>
        </li>
        <li>
          <a href="#" className=" hover:underline ">
            Terms of Service
          </a>
        </li>
        <li>
          <a href="#" className=" hover:underline ">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Contact Us
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
