import { motion } from 'motion/react';

const MealSegment = ({ meal }: {meal: string}): JSX.Element => {
    // IMAGE IS GOING TO COME FROM THE API 
    // TANSTACK?


    return (
        <motion.div
            whileHover={{ scale: 1.015 }}
            className="flex flex-col border-black border  text-center meal-segment rounded-lg m-2 h-full"
        >
            <img className='w-full' src="" alt="meal-image" />
            <h1 className='p-4  font-bold w-1/2'>{meal.toUpperCase() }</h1>
            <p className="text-2xl p-4 text-center font-bold bg-red-500">Data</p>
        </motion.div>
    );
};

export default MealSegment