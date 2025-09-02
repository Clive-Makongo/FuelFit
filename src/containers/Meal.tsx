import MealHeader from "@/components/manual/Meal/MealHeader"
import MealSegment from "@/components/manual/Meal/MealSegment";
import InputSection from "@/components/manual/Meal/InputSection";
import ErrorDisplay from "@/components/manual/Meal/ErrorDisplay";
import LoadingSpinner from "@/components/manual/Meal/LoadingSpinner";
import NutritionSummary from "@/components/manual/Meal/NutritionSummary";
import Slide from "@/components/manual/Slide/Slide";
import { useMealPlanner } from "@/hooks/useMealPlanner";
import { useMealContext } from "@/components/manual/Context/MealContext";
import Chart from "@/components/manual/Chart/Chart";
import Modal from "react-responsive-modal"
import 'react-responsive-modal/styles.css';

import { motion } from "motion/react";
import { useEffect, useState } from "react";

const Meal = (): JSX.Element => {
    const {
        caloriesSet,
        dietSet,
        setCalories,
        setDiet,
        isLoading,
        error,
        isMobile,
        imagesLoaded,
        mealType,
        mealImage,
        mealNutrition,
        nutrition,
        handleGenerateMeal,
        isFormValid,
        setMealImage,
        MEALS
    } = useMealContext();

    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        console.log(" MEALPAGE: MEAL TYPE: ", mealNutrition)
    }, [mealType, mealImage, mealNutrition])

    return (
        <div className="meal-page bg-white min-h-screen">
            <div className="container mx-auto">
                <div className="flex flex-col p-4">
                    <MealHeader />

                    <InputSection
                        caloriesSet={caloriesSet}
                        dietSet={dietSet}
                        setCalories={setCalories}
                        setDiet={setDiet}
                        isFormValid={isFormValid}
                        isLoading={isLoading}
                        handleGenerateMeal={handleGenerateMeal}
                    />
                </div>

                {error && <ErrorDisplay error={error} />}

                {isLoading && <LoadingSpinner />}

                {/* Mobile Version */}
                {isMobile ? (
                    <div className="flex flex-col gap-4">
                        {imagesLoaded && <Slide
                            mealImages={mealImage}
                            mealTypes={mealType}
                        />}
                    </div>
                ) : (
                    /* Desktop Version */
                    <div className="grid grid-cols-3 gap-6 w-full">
                        {imagesLoaded && MEALS.map((meal, index) => (
                            <MealSegment
                                key={index}
                                meal={meal}
                                title={mealType[meal]}
                                image={mealImage[meal]}
                                isLoading={isLoading}
                            />

                        ))}
                    </div>
                )}

                {/* Nutrition Summary */}
                {nutrition.calories > 0 &&
                    <>
                        <button className="h-12 bg-blue-500"
                            onClick={() => setOpen(true)}
                        >
                            See Nurtition for the Day
                        </button>


                        <Modal
                            classNames={{
                                overlay: "bg-black/50 fixed inset-0 flex items-center justify-center",
                                modal: "bg-white rounded-2xl shadow-xl p-6 w-96 max-w-full text-center",
                            }}
                            open={open}
                            onClose={() => setOpen(false)}
                            center
                        >
                            <Chart value={[`${nutrition.carbohydrates}`, `${nutrition.fat}`, `${nutrition.protein}`]} label={[`Carbohydrates`, `Fat`, `Protein`]} />
                        </Modal>
                    </>
                }
            </div>
        </div>
    );
};

export default Meal;