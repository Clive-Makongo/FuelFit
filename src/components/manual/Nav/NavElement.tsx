import { NavProps } from "./types";
import NavButton from "./NavButton";

const NavElement = ({ text, onClick }: NavProps): JSX.Element => {
    return (
        <li>
            <NavButton text={text} onClick={onClick} />
        </li>
    );
};

export default NavElement;
