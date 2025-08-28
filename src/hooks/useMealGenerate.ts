import { useState, useCallback } from "react";
import caloriesAPI from "@/utils/coloriesAPI";

// Types
export interface MealType {
    breakfast: string;
    lunch: string;
    dinner: string;
}

export interface NutritionalInfo {
    calories: number;
    carbohydrates: number;
    fat: number;
    protein: number;
}

export interface MealImage {
    breakfast: string;
    lunch: string;
    dinner: string;
}

export interface ApiResponse {
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

    const [mealImage, setMealImage] = useState<MealImage>({
        breakfast: "",
        lunch: "",
        dinner: "",
    });

    const [lastGeneratedParams, setLastGenereatedParams] = useState<{ calories: number, diet: string } | null>(null);

    const generateMeals = useCallback(
        async (calories: number, diet: string): Promise<ApiResponse | null> => {
            try {
                const response = await caloriesAPI(calories, diet);
                localStorage.setItem("first response", JSON.stringify(response));
                const stored = JSON.parse(localStorage.getItem("first response"))
                console.log(response, stored, " RESPONSE")
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

                setMealImage({
                    ...mealImage,
                    breakfast: `https://img.spoonacular.com/recipes/${response.meals[0].id}-312x231.jpg`,
                    lunch: `https://img.spoonacular.com/recipes/${response.meals[1].id}-312x231.jpg`,
                    dinner: `https://img.spoonacular.com/recipes/${response.meals[2].id}-312x231.jpg`,
                });

                setLastGenereatedParams({ calories, diet });

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
        lastGeneratedParams,
        mealImage,
        setLastGenereatedParams,
        generateMeals,
        setMealImage

    };
};
