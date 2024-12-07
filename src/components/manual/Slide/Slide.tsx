// Need to get breakfast lunch and dinner
import { useState } from "react";
import MealSegment from "../Meal/MealSegment";
import { motion, AnimatePresence } from 'motion/react';
import pic1 from '../../../assets/bg-image.jpg'
import pic2 from '../../../assets/light.avif'
import pic3 from '../../../assets/construction.jpeg'

// map images to pics (for now)

const meals: string[] = ['breakfast', 'lunch', 'dinner'];

const picMap: Record<string, string> = {
    'breakfast': pic1,
    'lunch': pic2,
    'dinner': pic3
};


const Slide = (): JSX.Element => {
    const [slideIndex, setSlideIndex] = useState<number>(0); // track which slide we are on
    // Need a function to swap the slides
    // held in state

    const handleForward = () => {
        setSlideIndex(prev => prev === meals.length - 1 ? 0 : prev + 1);
    };

    const handleBackward = () => {
        setSlideIndex(prev => prev === 0 ? meals.length - 1 : prev - 1);
    };

    const currentMeal = meals[slideIndex];
    const currentImage = picMap[currentMeal];

    const renderCurrentSlide = (): JSX.Element => {

        return (
            <AnimatePresence>
                <motion.div
                    
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ scale: 2 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.015 }}
                    className="flex flex-col border-black border  text-center meal-segment rounded-lg m-2 h-full"
                >
                    <img className='w-full' src={currentImage} alt="meal-image" />
                    <h1 className='p-4  font-bold w-1/2'>{meals[slideIndex]}</h1>
                    <p className="text-2xl p-4 text-center font-bold bg-red-500">Data</p>
                </motion.div>
            </AnimatePresence>

        );
    };
    // use motion to swap the images
    // 

    // buttons for making the move

    // wrap around function



    return (
        <>
            {renderCurrentSlide()}
            <button onClick={handleBackward}>Prev Slide</button>
            <button onClick={handleForward}> Next Slide</button>
        </>
    )
};

export default Slide;