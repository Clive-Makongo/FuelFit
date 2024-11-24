import { NavProps } from "./types";
import {motion} from 'motion/react'

// 
const NavButton = ({ text, onClick }: NavProps): JSX.Element => {
    return (
        <motion.button
            className="m-2 p-2 font-mono"
            onClick={onClick}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            whileHover={{scale: 1.04}}
        >
            {text}
        </motion.button>
    );
};

export default NavButton;

