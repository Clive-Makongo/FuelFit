import MealHeader from "@/components/manual/Meal/MealHeader"
import MealSegment from "@/components/manual/Meal/MealSegment";
import InputSection from "@/components/manual/Meal/InputSection";
import ErrorDisplay from "@/components/manual/Meal/ErrorDisplay";
import LoadingSpinner from "@/components/manual/Meal/LoadingSpinner";
import NutritionSummary from "@/components/manual/Meal/NutritionSummary";
import Slide from "@/components/manual/Slide/Slide";
import { useMealPlanner } from "@/hooks/useMealPlanner";
import { motion } from "motion/react";

const Meal = (): JSX.Element => {
    // hooks
    const {
        isMobile,
        isLoading,
        error,
        nutrition,
        mealType,
        mealImage,
        imagesLoaded,
        handleGenerateMeal,
        caloriesSet,
        dietSet,
        setCalories,
        setDiet,
        isFormValid,
        MEALS
    } = useMealPlanner();

    return (
        <div className="meal-page bg-cyan-500 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <MealHeader/>

                <InputSection
                    caloriesSet={caloriesSet}
                    dietSet={dietSet}
                    setCalories={setCalories}
                    setDiet={setDiet}
                    isFormValid={isFormValid}
                    isLoading={isLoading}
                    handleGenerateMeal={handleGenerateMeal}
                />

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
                {nutrition.calories > 0 && <NutritionSummary
                    nutrition={nutrition}
                />}
            </div>
        </div>
    );
};

export default Meal;