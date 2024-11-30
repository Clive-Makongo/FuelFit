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
        <motion.input
            type={info}
            placeholder={placeholder}
            name={placeholder}
            id={`${info}-meal-input`}
            className="px-2 py-1 border rounded-md"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }} />
    )
};

export default GenerateMeal