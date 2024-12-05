// Need to get breakfast lunch and dinner
import { useState } from "react";
import MealSegment from "../Meal/MealSegment";

interface SlideProps {
    imgSrc: string, // will also be API response
    calories: number // will be API response
};

const Slide = ({ imgSrc, calories }: SlideProps): JSX.Element => {
    const [currentSlide, setCurrentSlide] = useState<SlideProps[]>([]); // array holding breakfast lunch and dinner
    const [slideIndex, setSlideIndex] = useState<number>(0); // track which slide we are on
    // Need a function to swap the slides
    // held in state

    const currentSlide = (): JSX.Element => {

        return (
            <MealSegment meal={ } />
        );
    };
    // use motion to swap the images
    // 

    // buttons for making the move

    // wrap around function



    return (
        <>
            
        </>
    )
};

export default Slide;