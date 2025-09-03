import { useState, useCallback, useEffect, createContext, useContext, ReactNode } from "react";
import { useWindowSize } from "@/utils/useWindowSize";
import { useMealGenerate, MealImage, MealType, ApiResponse, NutritionalInfo } from "@/hooks/useMealGenerate";
import { useMealNutrition } from "@/hooks/useMealNutrition";
import { MealID } from "@/hooks/useMealGenerate";

const MEALS = ["breakfast", "lunch", "dinner"] as const;
const MOBILE_BREAKPOINT = 768;

class MealGenerationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "MealGenerationError";
    }
};

interface MealContextType {
    isMobile: boolean,
    isLoading: boolean,
    error: string | null,
    nutrition: NutritionalInfo,
    mealId: MealID,
    mealType: MealType,
    mealImage: MealImage,
    setMealImage: () => void,
    mealNutrition: []
    imagesLoaded: boolean,
    handleGenerateMeal: () => void,
    caloriesSet: number,
    dietSet: string,
    setCalories: () => void,
    setDiet: () => void,
    isFormValid: () => boolean,
    MEALS: string[];
};

const newMealContext = createContext<MealContextType | null>(null);

export const MealProvider = ({ children }: { children: ReactNode }) => {
    // Input state
    const [caloriesSet, setCalories] = useState<number | string>('');
    const [dietSet, setDiet] = useState<string>("");

    // Status state
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // First API call to get meals
    const { mealType, nutrition, mealImage, mealId, generateMeals, setMealImage } = useMealGenerate();

    useEffect(() => {
        console.log("USEEEE MEAL ID: ", mealId)
    }, [mealId])

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
            getMealNutrients(mealId);

        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Failed to generate meal plan";

            console.error("Error fetching meal data:", error);
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, [caloriesSet, dietSet, isFormValid, getMealNutrients]);

    useEffect(() => {
        //console.log("Updated mealType:", mealType);
        //console.log("Updated nutrition:", nutrition);
        //console.log("Updated images:", mealImage);
        console.log("GET MEAL NUTRIENTS: ", mealNutrition);
    }, [mealType, nutrition, mealImage]);

    const value = {
        caloriesSet,
        dietSet,
        setCalories,
        setDiet,
        isLoading,
        error,
        isMobile,
        imagesLoaded,
        mealId,
        mealType,
        mealImage,
        mealNutrition,
        nutrition,
        handleGenerateMeal,
        isFormValid,
        setMealImage,
        MEALS
    };

    return (
        <newMealContext.Provider value={value}>
            {children}
        </newMealContext.Provider>
    )
};

export const useMealContext = () => {
    const ctx = useContext(newMealContext);
    if (!ctx) {
        throw new Error(`useMealContext must be used within a PageProvider`)
    }

    return ctx;
};