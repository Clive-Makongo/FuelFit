import { p } from "framer-motion/client";
import { motion } from "motion/react";

// defined type for the input form
type InputType = 'text' | 'number'

// define props that will set the input fields
interface GenerateMealProps {
    info: InputType,
    placeholder?: string
};

const GenerateMeal = ({ info, placeholder }: GenerateMealProps): JSX.Element => {

    return (
        <div className="flex flex-col">
            {info === 'text' && 
                <p>
                    Pick a Diet
                </p>
            }
            {info === 'number' &&
                <p className="">
                    How many calories
                </p>
            } 
            <motion.input
                className="border rounded-md"
                type={info}
                placeholder={placeholder}
                name={placeholder}
                id={`${info}-meal-input`}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }} />
        </div>
    )
};

export default GenerateMeal