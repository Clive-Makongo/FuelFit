import React from "react";
import NavElement from "./NavElement";

const Navbar: React.FC = () => {
    return (
        <ul className="flex bg-red-500 flex-row w-full">
            <NavElement text="Button 1" onClick={() => alert("Button 1 clicked")} />
            <NavElement text="Button 2" onClick={() => alert("Button 2 clicked")} />
        </ul>
    );
};

export default Navbar;
