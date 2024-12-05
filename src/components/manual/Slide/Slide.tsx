// Need to get breakfast lunch and dinner
import { useState } from "react";
import MealSegment from "../Meal/MealSegment";

interface SlideProps {
    imgSrc: string, // will also be API response
    calories: number // will be API response
};

const meals: string[] = ['breakfast', 'lunch', 'dinner'];


const Slide = (): JSX.Element => {
    const [currentSlide, setCurrentSlide] = useState<SlideProps[]>([]); // array holding breakfast lunch and dinner
    const [slideIndex, setSlideIndex] = useState<number>(0); // track which slide we are on
    // Need a function to swap the slides
    // held in state

    const handleForward = () => {
        setSlideIndex(prev => prev === meals.length - 1 ? 0 : prev + 1)
    };

    const handleBackward = () => {
        setSlideIndex(prev => prev === 0 ? meals.length - 1 : prev - 1)
    };


    const renderCurrentSlide = (): JSX.Element => {

        return (
            <MealSegment meal={meals[slideIndex]} />
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