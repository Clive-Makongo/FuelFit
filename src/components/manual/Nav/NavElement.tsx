import React from "react";
import NavButton from "./NavButton";

interface NavElementProps {
    text: string;
    onClick?: () => void;
}

const NavElement = ({ text, onClick }: NavElementProps): JSX.Element => {
    return (
        <li>
            <NavButton text={text} onClick={onClick} />
        </li>
    );
};

export default NavElement;
