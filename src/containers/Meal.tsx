import { useEffect, useState } from "react";
import GenerateMeal from "@/components/manual/Meal/GenerateMeal";
import MealSegment from "@/components/manual/Meal/MealSegment";
import Slide from "@/components/manual/Slide/Slide";
import { useWindowSize } from "@/utils/useWindowSize";
import calories from "../utils/coloriesApi";
import {motion} from "motion/react"

const meals: string[] = ['breakfast', 'lunch', 'dinner'];

interface Diet {
    calories: number;
    diet: string
};

interface MealType {
    breakfast: string,
    lunch: string,
    dinner: string,
};

interface NutritionalInfo {
    calories: number,
    carbohydrates: number,
    fat: number,
    protien: number,
};

// holds image src
interface MealImage {
    breakfast: string,
    lunch: string,
    dinner: string
}

const Meal = (): JSX.Element => {
    const [caloryData, setCaloryData] = useState<Diet>({ calories: 0, diet: "" });
    const [caloriesSet, setCalories] = useState<number | string>(0);
    const [dietSet, setDiet] = useState<string>("");
    const [load, setLoad] = useState<boolean>(false);
    const [mealType, setMealType] = useState<MealType>({ breakfast: '', lunch: '', dinner: ''});
    const [nutrition, setNutritional] = useState<NutritionalInfo>({ calories: 0, carbohydrates: 0, fat: 0, protien: 0 });
    const [mealImage, setMealImage] = useState<MealImage>({breakfast: '', lunch: '', dinner: ''})
    const { width } = useWindowSize();
    const isMobile: boolean = width < 768;
    // API CALLS WITH IMAGES AND CALORIE DATA

    useEffect(() => {
        console.log("CALORIES SET : ", caloriesSet);
        console.log("DIET SET : ", dietSet);

    }, [caloriesSet, dietSet]);

    useEffect(() => {
        console.log("Updated mealType: ", mealType);
    }, [mealType]);

    const takeInput = (): JSX.Element => {
        return (
            <>
                <input
                    className="set-calories border-2 border-black rounded-lg"
                    type="number"
                    onChange={(e) => setCalories(e.target.value)}
                    value={caloriesSet}
                />
                <input
                    className="set-diet border-2 border-black rounded-lg"
                    type="text"
                    onChange={(e) => setDiet(e.target.value)}
                    value={dietSet}
                />
                <button
                    onClick={handleGenerateMeal}
                    className="px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600 transition-colors"
                >
                    Get Data
                </button>
            </>
        )
    }

    const handleGenerateMeal = async () => {
        console.log("Hello World")
        try {
            setLoad(true);
            const response = await calories(caloriesSet, dietSet);
            console.log(response)
            setMealType({breakfast: response.meals[0].title, lunch: response.meals[1].title, dinner: response.meals[2].title})
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
                        {takeInput()}
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
                     {takeInput()}       
                    </section>
                    <div className="grid grid-cols-3 gap-2 w-full meals">

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