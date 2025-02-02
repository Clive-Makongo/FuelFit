import { useEffect, useState } from "react";
import GenerateMeal from "@/components/manual/Meal/GenerateMeal";
import MealSegment from "@/components/manual/Meal/MealSegment";
import Slide from "@/components/manual/Slide/Slide";
import { useWindowSize } from "@/utils/useWindowSize";
import calories from "../utils/coloriesApi";
import { flushSync } from "react-dom";

const meals: string[] = ['breakfast', 'lunch', 'dinner'];

interface Data {
    calories: number;
    diet: string
};

const Meal = (): JSX.Element => {
    const [caloryData, setCaloryData] = useState<Data>({ calories: 0, diet: "" })
    const [load, setLoad] = useState<boolean>(false)
    const { width } = useWindowSize();
    const isMobile: boolean = width < 768;
    // API CALLS WITH IMAGES AND CALORIE DATA

    const handleGenerateMeal = async () => {
        console.log("Hello World")
        try {
            setLoad(true);
            const response = await calories(2000, 'keto');
            console.log(response)
            setCaloryData(response)
            console.log(caloryData, 'Calory Data')
            
        } catch (error) { 
            console.log("Error fetching meal data")
        }
        finally {
            setLoad(false)
        }
    }


    return (
        <>
            {/* Mobile Version */}
            {isMobile ? (
                <div className="meal-page bg-yellow-500 min-h-[80vh] text-center w-full">
                    <h1 className="text-2xl font-bold">Meal Page</h1>
                    <p style={{ paddingBottom: '2%' }} className="font-bold mb-5 pb-12">This is the Meal Page.</p>
                    <section
                        className="inputs flex flex-row justify-evenly w-4/5 mb-6"
                    >
                        <GenerateMeal info="number" placeholder="Enter calories" />
                        <GenerateMeal info="text" placeholder="Enter meal details" />
                        
                    </section>
                    <div className="flex flex-col md:flex-row justify-evenly w-full md:w-4/5">
                        {/* Render the slide for the mobile view */}
                        <button
                            onClick={handleGenerateMeal}
                            className="px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600 transition-colors"
                        >
                            NAME
                        </button>
                        <Slide />
                    </div>
                </div>
            ) : (
                // DESKTOP VERSION
                <div className="bg-yellow-500">
                    <section
                        className="inputs flex flex-row justify-evenly w-4/5 mb-6"
                    >
                        <GenerateMeal info="number" placeholder="Enter calories" />
                        <GenerateMeal info="text" placeholder="Enter meal details" />
                            <button
                                onClick={handleGenerateMeal}
                                className="px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600 transition-colors"
                            >
                                Get Data
                            </button>
                    </section>
                        <div className="grid grid-cols-3 gap-2 w-full">
                           
                        {meals.map((meal, id) => (
                            <MealSegment key={id} meal={meal} />
                        ))}
                    </div>


                </div>
            )}
        </>
    );
};

export default Meal;