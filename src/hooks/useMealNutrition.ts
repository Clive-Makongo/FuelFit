import { useState, useCallback } from "react";
import nutritionAPI from "@/utils/nutritionAPI"

interface MealNutrition {
    breakfast: any[],
    lunch: any[],
    dinner: any[]
};

export const useMealNutrition = () => {
    const [mealNutrition, setMealNutrition] = useState<MealNutrition>({
        breakfast: [],
        lunch: [],
        dinner: []
    });

    
};
