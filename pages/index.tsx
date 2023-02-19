import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

/* sidebar */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Layout from "../components/Layout";

// TODO: make the textarea editable.

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const Home: NextPage = () => {
  const navigation = [
    { name: "Dashboard", href: "#", current: true },
    { name: "Team", href: "#", current: false },
    { name: "Projects", href: "#", current: false },
    { name: "Calendar", href: "#", current: false },
  ];

  const meetings = [
    {
      name: "John Doe",
      date: "11/12/23",
    },
    {
      name: "John Doe",
      date: "11/12/23",
    },
    {
      name: "John Doe",
      date: "11/12/23",
    },
    {
      name: "John Doe",
      date: "11/12/23",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="pt-10 lg:grid md:grid-cols-11 gap-16">
          <div className="col-span-4">
            <div className="border-gray-300 border-[1px] rounded-xl py-8 px-10 text-md leading-relaxed bg-white opacity-70 mb-6">
              Use this area to plan any premeditated questions, thoughts, or to
              jot down some quick notes!
            </div>
          </div>
          <div className="col-span-7">
            <h1 className="text-4xl mb-12">My meetings</h1>
            {meetings.map(({ name, date }) => (
              <div className="border-gray-300 border-[1px] rounded-xl py-6 px-10 text-md leading-relaxed bg-white opacity-70 mb-4">
                <div className="flex justify-between">
                  <div className="border-2 rounded-md px-5 py-1 bg-white bg-opacity-100">
                    <p>{name}</p>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p>{date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
