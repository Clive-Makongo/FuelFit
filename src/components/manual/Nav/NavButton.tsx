import React from "react";

interface NavButtonProps {
    text: string;
    onClick?: () => void;
}

const NavButton = ({ text, onClick }: NavButtonProps): JSX.Element => {
    return (
        <button
            className="bg-red-500 m-2 p-2"
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default NavButton;
