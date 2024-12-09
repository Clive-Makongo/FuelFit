// Need to get breakfast lunch and dinner
import { useState } from "react";
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
    const [direction, setDirection] = useState<number>(0); // state that tracks direction
    // Need a function to swap the slides
    // held in state

    // variants for slide
    const slideVariants = {
        enter: (direction: number) => { // will update based on state
            return {
                x: direction > 0 ? 1000 : -1000,
                opacity: 0
            };
        },
        center: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                type: "spring",
                duration: 0.1
            }
        },
        exit: (direction: number) => {
            console.log(direction);
            return {
                zIndex: 0,
                x: direction < 0 ? 1000 : -10000,
                opacity: 0
            };
        }
    };

    

    const handleForward = () => {
        setSlideIndex(prev => prev === meals.length - 1 ? 0 : prev + 1);
        setDirection(1)
    };

    const handleBackward = () => {
        setSlideIndex(prev => prev === 0 ? meals.length - 1 : prev - 1);
        setDirection(-1);
    };

    const currentMeal = meals[slideIndex];
    const currentImage = picMap[currentMeal];

    const renderCurrentSlide = (): JSX.Element => {

        return (
            <AnimatePresence custom={direction}>
                <motion.div
                    key={slideIndex}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    custom={direction}
                    exit="exit"
                    drag="x"
                    onDragEnd={(e, {offset, velocity}) => {
                        const swipe = swipePower(offset.x, velocity.x)
                        if (swipe < -swipeConfidenceThreshold) {
                            handleForward();
                        } else if ( swipe >)
                    }}
                    whileHover={{ scale: 1 }}
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
        <div className="relative w-full h-full overflow-hidden">
            {renderCurrentSlide()}
            <button onClick={handleBackward}>Prev Slide</button>
            <button onClick={handleForward}> Next Slide</button>
        </div>
    )
};

// swipe power calculation
const swipePower = (offset: number, velocity: number): number => {
    return Math.abs(offset) * velocity;
};
const swipeConfidenceThreshold: number = 1000;

export default Slide;