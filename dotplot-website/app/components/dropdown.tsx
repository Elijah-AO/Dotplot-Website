// components/Dropdown.tsx

import React, { useState, useRef, useEffect } from "react";

// Define the type for the props
interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
  buttonText: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  buttonText,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="bg-gray-900 border rounded-md w-full h-auto text-white px-2 py-5 rounded-md shadow-md hover:bg-blue-600 focus:outline-none text-xs flex-1 w-32"
      >
        {buttonText}
      </button>
      {isOpen && (
        <div className="absolute right-0 bg-white border border-gray-300 rounded-md shadow-lg z-10 flex justify-center items-center flex-col">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className="block w-full text-center px-2 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
