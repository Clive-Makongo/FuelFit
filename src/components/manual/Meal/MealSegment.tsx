import { motion } from 'motion/react';
import pic1 from '../../../assets/bg-image.jpg'
import pic2 from '../../../assets/construction.jpeg'
import pic3 from '../../../assets/light.avif'

// map images to pics (for now)
const MEAL_IMAGES = {
    'breakfast': pic1,
    'lunch': pic2,
    'dinner': pic3
};

const MealSegment = ({ meal }: { meal: string }): JSX.Element => {
    // this part is very tricky
    // getting the  
    const mealImage = MEAL_IMAGES[meal as keyof typeof MEAL_IMAGES] || pic1;
    // IMAGE IS GOING TO COME FROM THE API
    // TANSTACK?


    return (
        <motion.div
            whileHover={{ scale: 1.015 }}
            className="flex flex-col border-black border  text-center meal-segment rounded-lg m-2 h-full"
        >
            <img className='w-full' src={mealImage} alt="meal-image" />
            <h1 className='p-4  font-bold w-1/2'>{meal.toUpperCase() }</h1>
            <p className="text-2xl p-4 text-center font-bold bg-red-500">Data</p>
        </motion.div>
    );
};

export default MealSegment