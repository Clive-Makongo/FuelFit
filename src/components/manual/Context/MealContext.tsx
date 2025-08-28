import { useContext, createContext, ReactNode } from "react";
import { MealType } from "@/hooks/useMealGenerate";
import { NutritionalInfo } from "@/hooks/useMealGenerate";
import { ApiResponse } from "@/hooks/useMealGenerate";
import { useMealGenerate } from "@/hooks/useMealGenerate";

interface MealContextType {
    mealImage: string
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
    const { mealImage, mealType, nutrition, lastGeneratedParams, generateMeals, setLastGenereatedParams, setMealImage } = useMealGenerate();

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
};