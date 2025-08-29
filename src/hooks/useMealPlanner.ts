import { useState, useCallback, useEffect } from "react";
import { useWindowSize } from "@/utils/useWindowSize";
import { useMealGenerate } from "@/hooks/useMealGenerate";
import { useMealNutrition } from "@/hooks/useMealNutrition";

const MEALS = ["breakfast", "lunch", "dinner"] as const;
const MOBILE_BREAKPOINT = 768;

interface NutritionalInfo {
    calories: number;
    carbohydrates: number;
    fat: number;
    protein: number;
}

interface ApiResponse {
    meals: { title: string; sourceUrl: string }[];
    nutrients: NutritionalInfo;
}

class MealGenerationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "MealGenerationError";
    }
}

export const useMealPlanner = () => {
    // Input state
    const [caloriesSet, setCalories] = useState<string>("");
    const [dietSet, setDiet] = useState<string>("");

    // Status state
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // First API call to get meals
    const { mealType, nutrition, mealImage, generateMeals, setMealImage } = useMealGenerate();

    //second API call to get meal nutrition data
    const { mealNutrition, getMealNutrients } = useMealNutrition()

    const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

    // Device size
    const { width } = useWindowSize();
    const isMobile: boolean = width < MOBILE_BREAKPOINT;

    // --- Validation ---
    const isFormValid = useCallback(() => {
        const calories = Number(caloriesSet);
        return calories > 0 && calories <= 5000 && dietSet.trim().length > 0;
    }, [caloriesSet, dietSet]);

    // --- Helpers ---
    const validateApiResponse = (response: any): response is ApiResponse => {
        return (
            response &&
            Array.isArray(response.meals) &&
            response.meals.length >= 3 &&
            response.meals.every((meal: any) => meal.title) &&
            response.nutrients &&
            typeof response.nutrients.calories === "number"
        );
    };


    // --- Actions ---
    const handleGenerateMeal = useCallback(async () => {
        if (!isFormValid()) {
            setError("Please enter valid calories (1-5000) and diet type");
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const response = await generateMeals(Number(caloriesSet), dietSet.trim());

            console.log("RESPONSE :", response);

            if (!validateApiResponse(response)) {
                throw new MealGenerationError("Invalid API response format");
            }

            setImagesLoaded(true);

            // Nutrition
            getMealNutrients(
                response.meals[0].title,
                response.meals[1].title,
                response.meals[2].title,
            );

        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Failed to generate meal plan";

            console.error("Error fetching meal data:", error);
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, [caloriesSet, dietSet, isFormValid, getMealNutrients]);

    // Debug logs in dev
    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            console.log("Updated mealType:", mealType);
            console.log("Updated nutrition:", nutrition);
            console.log("Updated images:", mealImage);
            console.log("GET MEAL NUTRIENTS: ", mealNutrition);
        }
    }, [mealType, nutrition, mealImage]);

    return {
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
        nutrition,
        handleGenerateMeal,
        isFormValid,
        setMealImage,
        MEALS,
    };
};
