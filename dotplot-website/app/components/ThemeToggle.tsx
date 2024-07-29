"use client";

import React, { useState, useEffect } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.style.setProperty("--custom-primary", "#FFF8F3");
      root.style.setProperty("--custom-secondary", "#120032");
      root.style.setProperty("--custom-blk", "#000000");
      root.style.setProperty("--custom-wht", "#FFFFFF");
    } else {
      root.style.setProperty("--custom-primary", "#120032");
      root.style.setProperty("--custom-secondary", "#FFF8F3");
      root.style.setProperty("--custom-blk", "#FFFFFF");
      root.style.setProperty("--custom-wht", "#000000");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex justify-center items-center text-primary">
      {/* {theme == "dark" ? <CiLight /> : <MdDarkMode />} */}
      <MdOutlineLightMode className="text-xl" />
      <input
        type="checkbox"
        className="toggle"
        onChange={toggleTheme}
        checked={theme === "light"}
      />
      <MdDarkMode className="text-xl text-secondary" />
    </div>
  );
};

export default ThemeToggle;
