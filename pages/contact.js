import React from "react";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Input from "@/components/Input";

const Contact = () => {
  const handleFormSubmit = event => {
    event.preventDefault();

    const data = new FormData(event.target);
    const values = Object.fromEntries(data);
    console.log(values);
  };
  return (
    <>
      <Container className="prose prose-neutral !max-w-4xl py-8 dark:prose-invert md:py-16 ">
        <h1>Contact Us</h1>
        <form
          onSubmit={e => handleFormSubmit(e)}
          className="flex flex-col gap-6"
        >
          <div className="col-span-1 sm:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium ">
              Name
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <Input type="text" name="name" placeholder="Your name" />
            </div>
          </div>

          <div className="col-span-1 sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium ">
              Email
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <Input
                type="email"
                required
                name="email"
                placeholder="your@mail.com"
              />
            </div>
          </div>
          <div className="col-span-1 sm:col-span-2">
            <label htmlFor="subject" className="block text-sm font-medium ">
              Subject
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <Input type="text" name="subject" placeholder="Subject" />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium ">
              Message
            </label>
            <div className="mt-1">
              <textarea
                required
                name="message"
                rows={3}
                className=" max-h-48 min-h-[100px] w-full rounded border-neutral-200 bg-transparent px-3 shadow-sm focus:border-blue-500 dark:border-neutral-700 md:h-11 md:px-4"
                placeholder="Your message"
              />
            </div>
          </div>
          <Button type="submit"> Submit</Button>
        </form>
      </Container>
    </>
  );
};
export default Contact;
