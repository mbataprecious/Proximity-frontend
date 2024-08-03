import React from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid"; 
import { FiFilter } from "react-icons/fi";
import { classNames } from "@/utils/helpers";

interface Props {
  options?: string[];
  onChange?: (option: string) => void;
  value?: string;
  prefixText?: string;
}

const SortDropdown = ({ options = [], onChange, value = "", prefixText }: Props) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-[#F9FAFB] px-3 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 max-[700px]:w-max">
          <span className="sr-only">Sort options</span>
          <FiFilter className="h-5 w-5 text-gray-400 max-[700px]:block hidden" aria-hidden="true" />
          <span className="text-[#7E7E7E] max-[700px]:hidden">{prefixText || "Sort by :"}</span> 
          <span className="max-[700px]:hidden">{value}</span>
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </MenuButton>
      </div>

      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute z-10 mt-2 w-[100px] lg:w-full origin-top rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option) => (
              <MenuItem
                as="div"
                key={option}
                className="cursor-pointer "
                onClick={() => onChange && onChange(option)}
              >
                {({ focus }) => (
                  <p
                    className={classNames(
                      focus ? "bg-gray-100 text-gray-900 w-full " : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    {option}
                  </p>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default SortDropdown;



// import React from "react";
// import {
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuItems,
//   Transition,
// } from "@headlessui/react";
// import { ChevronDownIcon } from "@heroicons/react/24/solid";
// import { classNames } from "@/utils/helpers";

// interface Props {
//   options?: string[];
//   onChange?: (option: string) => void;
//   value?: string;
//   prefixText?: string
// }
// const SortDropdown = ({ options = [], onChange, value = "", prefixText }: Props) => {
//   return (
//     <Menu as="div" className="relative inline-block text-left">
//       <div>
//         <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-[#F9FAFB] px-3 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 max-[700px]:w-max">
//           <span className=" text-[#7E7E7E]">{prefixText || "Sort by :"} </span> {value}
//           <ChevronDownIcon
//             className="-mr-1 h-5 w-5 text-gray-400"
//             aria-hidden="true"
//           />
//         </MenuButton>
//       </div>

//       <Transition
//         enter="transition ease-out duration-100"
//         enterFrom="transform opacity-0 scale-95"
//         enterTo="transform opacity-100 scale-100"
//         leave="transition ease-in duration-75"
//         leaveFrom="transform opacity-100 scale-100"
//         leaveTo="transform opacity-0 scale-95"
//       >
//         <MenuItems className="absolute z-10 mt-2 w-full origin-top rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//           <div className="py-1">
//             {options.map((option) => (
//               <MenuItem
//                 as="div"
//                 key={option}
//                 className={"cursor-pointer"}
//                 onClick={() => onChange && onChange(option)}
//               >
//                 {({ focus }) => (
//                   <p
//                     className={classNames(
//                       focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
//                       "block px-4 py-2 text-sm"
//                     )}
//                   >
//                     {option}
//                   </p>
//                 )}
//               </MenuItem>
//             ))}
//           </div>
//         </MenuItems>
//       </Transition>
//     </Menu>
//   );
// };

// export default SortDropdown;
