import { motion } from 'motion/react';

const MealSegment = ({ meal }: {meal: string}): JSX.Element => {




    return (
        <motion.div
            whileHover={{ scale: 1.015 }}
            className="flex flex-col text-center meal-segment rounded-md h-full"
        >
            <img className='w-full' src="" alt="meal-image" />
            <h1 className='p-4  font-bold w-1/2'>{meal.toUpperCase() }</h1>
            <p className="text-2xl p-4 text-center font-bold bg-red-500">Data</p>
        </motion.div>
    );
};

export default MealSegment