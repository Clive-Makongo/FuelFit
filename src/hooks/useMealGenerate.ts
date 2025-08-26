import { useState, useCallback } from "react";
import caloriesAPI from "@/utils/coloriesAPI";

// Types
interface MealType {
    breakfast: string;
    lunch: string;
    dinner: string;
}

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

export const useMealGenerate = () => {
    // Meal/nutrition state
    const [mealType, setMealType] = useState<MealType>({
        breakfast: "",
        lunch: "",
        dinner: "",
    });
    const [nutrition, setNutrition] = useState<NutritionalInfo>({
        calories: 0,
        carbohydrates: 0,
        fat: 0,
        protein: 0,
    });

    const generateMeals = useCallback(
        async (calories: number, diet: string): Promise<ApiResponse | null> => {
            try {
                const response = await caloriesAPI(calories, diet);
                console.log(response, " RESPONSE")
                setMealType({
                    breakfast: response.meals[0].title,
                    lunch: response.meals[1].title,
                    dinner: response.meals[2].title,
                });

                setNutrition({
                    calories: response.nutrients.calories,
                    carbohydrates: response.nutrients.carbohydrates,
                    protein: response.nutrients.protein,
                    fat: response.nutrients.fat,
                });

                return response;
            } catch (error) {
                console.error("Error generating meals:", error);
                throw error;
            }
        },
        []);

    return {
        mealType,
        nutrition,
        generateMeals,
    };
};
