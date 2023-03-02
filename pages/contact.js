import React, { useState } from "react";
import Container from "@/components/Container";
import Button from "@/components/Button";

const Contact = () => {
  const [form, setForm] = useState({
    Name: "",
    Email: "",
    Subject: "",
    Message: "",
  });

  const handleFormSubmit = event => {
    event.preventDefault();

    console.log(form);

    // clear form fields
    setForm({
      Name: "",
      Email: "",
      Subject: "",
      Message: "",
    });
  };
  return (
    <>
      <Container>
        <form onSubmit={handleFormSubmit} className="dark:bg-blue-500 ">
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6  px-4  py-5 sm:p-6">
              <div className="grid  gap-6">
                <div className="col-span-1 sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      onChange={e => setForm({ ...form, Name: e.target.value })}
                      type="text"
                      value={form.Name}
                      name="name"
                      className="block w-full flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="www.example.com"
                    />
                  </div>
                </div>

                <div className="col-span-1 sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="email"
                      required
                      onChange={e =>
                        setForm({ ...form, Email: e.target.value })
                      }
                      name="email"
                      className="block w-full flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="yours@mail.com"
                      value={form.Email}
                    />
                  </div>
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Subject
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      value={form.Subject}
                      onChange={e =>
                        setForm({ ...form, Subject: e.target.value })
                      }
                      type="text"
                      name="subject"
                      className="block w-full flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <div className="mt-1">
                  <textarea
                    required
                    onChange={e =>
                      setForm({ ...form, Message: e.target.value })
                    }
                    name="message"
                    rows={3}
                    className="mt-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                    placeholder=""
                    value={form.Message}
                  />
                </div>
              </div>
              <Button> Submit</Button>
            </div>
          </div>
        </form>
      </Container>
    </>
  );
};
export default Contact;
