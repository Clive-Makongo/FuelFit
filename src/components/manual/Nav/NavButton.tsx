import { NavProps } from "./types";

// 
const NavButton = ({ text, onClick }: NavProps): JSX.Element => {
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

