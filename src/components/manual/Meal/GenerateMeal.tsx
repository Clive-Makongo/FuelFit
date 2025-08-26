import { motion } from "motion/react";

// defined type for the input form
type InputType = 'text' | 'number'

// define props that will set the input fields
interface GenerateMealProps {
    info: InputType,
    placeholder?: string,
    value: string | number,
    onChange?: (value: string | number) => void
};

const GenerateMeal = ({ info, placeholder, value, onChange }: GenerateMealProps): JSX.Element => {

    return (
        <div className="flex flex-col">
            {info === 'text' && 
                <p className="p-4">
                    Pick a Diet
                </p>
            }
            {info === 'number' &&
                <p className="p-4">
                    How many calories
                </p>
            } 
            <motion.input
                className="border-2 border-black rounded-lg"
                type={info}
                value={value}
                placeholder={placeholder}
                name={placeholder}
                id={`${info}-meal-input`}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onChange={e =>
                    onChange?.(info === 'number' ? Number(e.target.value) : e.target.value)}
            />
            
        </div>
    )
};

export default GenerateMeal