import { useState, useCallback, useContext, createContext, ReactNode } from "react";
import { MealType } from "@/hooks/useMealGenerate";
import { NutritionalInfo } from "@/hooks/useMealGenerate";
import { MealImage } from "@/hooks/useMealGenerate";
import caloriesAPI from "@/utils/coloriesAPI"
import { ApiResponse } from "@/hooks/useMealGenerate";
import { useMealGenerate } from "@/hooks/useMealGenerate";

interface MealContextType {
    mealImage: MealImage;
    mealType: MealType;
    nutrition: NutritionalInfo;
    isLoading?: boolean;
    error?: string | null;
    lastGeneratedParams: { calories: number; diet: string } | null;
    generateMeals: (calories: number, diet: string) => Promise<ApiResponse | null>;
    clearMeals?: () => void;
    setMealType: (meals: MealType) => void;
    setNutrition: (nutrition: NutritionalInfo) => void;
};

const MealContext = createContext<MealContextType | null>(null);

export const MealProvider = ({ children }: { children: ReactNode }) => {
    // const { mealImage, mealType, nutrition, lastGeneratedParams, generateMeals, setLastGenereatedParams, setMealImage } = useMealGenerate();


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


    return (
        <MealContext.Provider value={{ mealImage, mealType, nutrition, lastGeneratedParams, generateMeals, setLastGenereatedParams, setMealImage }}>
            {children}
        </MealContext.Provider>
    )
};

export const useMealContext = () => {
    const ctx = useContext(MealContext);
    if (!ctx) {
        throw new Error(`useMealContext must be used within a PageProvider`)
    }

    return ctx;
};