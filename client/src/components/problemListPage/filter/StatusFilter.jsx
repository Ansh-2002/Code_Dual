import { useState, useContext } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import ProblemContext from "../../../context/ProblemContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProblemFilter() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setStatusFilter } = useContext(ProblemContext);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  const handleClick = (status) => {
    setStatusFilter(status);
  };

  return (
    <Menu as="div" className="relative inline-block text-left mt-12">
      <div>
        <Menu.Button
          onClick={toggleMenu}
          className="inline-flex w-39 justify-left gap-x-12 rounded-md bg-gray-800 px-4 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-gray-700 active:bg-gray-800 hover:bg-gray-700 "
        >
          Status
          <span
            style={{
              transition: "transform 0.3s ease-out", // Adjust the duration and easing as needed
              transform: `rotate(${menuOpen ? "180deg" : "0deg"})`,
              display: "inline-block",
              transformOrigin: "center",
            }}
          >
            <ChevronDownIcon
              className="mr-0 h-5 w-5 ml-auto text-gray-400 "
              aria-hidden="true"
            />
          </span>
        </Menu.Button>
      </div>
      <Transition
        show={menuOpen}
        as={Fragment}
        enter="transition ease-out duration-300"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          style={{ width: "100%" }}
          className="absolute left-0 z-10 mt-2 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          onClick={toggleMenu}
        >
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-700 text-white" : "text-gray-1000",
                    "block px-4 py-2 text-sm"
                  )}
                  onClick={() => handleClick("Unsolved")}
                >
                  <HorizontalRuleIcon className="mr-2" fontSize="small" />
                  Unsolved
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  href="#"
                  className={classNames(
                    active ? "bg-gray-700 text-white" : "text-green-500",
                    "block px-4 py-2 text-sm"
                  )}
                  onClick={() => handleClick("Solved")}
                >
                  <CheckCircleIcon className="mr-2" fontSize="small" />
                  Solved
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-700 text-white" : "text-red-500 ",
                    "block px-4 py-2 text-sm"
                  )}
                  onClick={() => handleClick("Attempted")}
                >
                  <ShowChartIcon
                    className="mr-2 text-red-500 border rounded-full border-red-500 p-[1px]"
                    fontSize="small"
                  />
                  Attempted
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
         
    </Menu>
  );
}
