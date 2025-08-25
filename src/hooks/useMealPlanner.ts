import { useState, useCallback, useEffect } from "react";
import { useWindowSize } from "@/utils/useWindowSize";
import caloriesAPI from "@/utils/coloriesAPI";

import nutritionAPI from "@/utils/nutritionAPI";

const MEALS = ["breakfast", "lunch", "dinner"] as const;
const MOBILE_BREAKPOINT = 768;

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

interface MealImage {
    breakfast: string;
    lunch: string;
    dinner: string;
}

interface mealNutrition {
    breakfast: {},
    lunch: {},
    dinner: {}
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

    const [mealNutrition, setMealNutrition] = useState<mealNutrition>({
        breakfast: [],
        lunch: [],
        dinner: []
    })
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

        // Get Meal Nutrients
    const retryAPI = async (
        query: string, 
        maxRetries: number = 2, 
        delay: number = 200
    ): Promise<any> => {
        let attempt = 0;
            
        while (attempt <= maxRetries) {
            try {
                const response = await nutritionAPI(query);
                    
                // Check if we got actual results
                if (response?.data?.results?.length > 0 && response.data.results[0]?.image) {
                    console.log(`✅ ${query} succeeded on attempt ${attempt + 1}`);
                        return response;
                }
                    
                // If empty results and we have retries left
                if (attempt < maxRetries) {
                    console.log(`⚠️ ${query} returned empty, retrying... (attempt ${attempt + 1}/${maxRetries + 1})`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                        attempt++;
                } else {
                    console.log(`❌ ${query} failed after ${maxRetries + 1} attempts`);
                    return { data: { results: [{ image: "" }] } };
                }
            } catch (error) {
                console.error(`❌ ${query} API error on attempt ${attempt + 1}:`, error);
                    if (attempt === maxRetries) {
                        return { data: { results: [{ image: "" }] } };
                    }
                    await new Promise(resolve => setTimeout(resolve, delay));
                    attempt++;
                }
            }
        };

const getMealNutrients = useCallback(
        async (b: string, l: string, d: string): Promise<void> => {
            if (!b || !l || !d) {

                return;
            }


            try {
                // const imagePromises = [
                //     imageAPI(b).catch(() => ({ data: { results: [{ image: "" }] } })),
                //     imageAPI(l).catch(() => ({ data: { results: [{ image: "" }] } })),
                //     imageAPI(d).catch(() => ({ data: { results: [{ image: "" }] } })),
                // ];

                // console.log("IMAGE PROMISES: ", imagePromises)

                // const [breakfastRes, lunchRes, dinnerRes] = await Promise.all(
                //     imagePromises
                // );

                const breakfast = await retryAPI(b).catch(() => ({ data: { results: [{ image: "" }] } }));
                await new Promise(resolve => setTimeout(resolve, 100)); // Small delay
            
                const lunch = await retryAPI(l).catch(() => ({ data: { results: [{ image: "" }] } }));
                await new Promise(resolve => setTimeout(resolve, 100));
            
                const dinner = await retryAPI(d).catch(() => ({ data: { results: [{ image: "" }] } }));

                console.log("DINNER :",breakfast, lunch, dinner )

                setMealNutrition({
                    breakfast: [breakfast.data.results[0]?.nutrition],
                    lunch: [lunch.data.results[0]?.nutrition],
                    dinner: [dinner.data.results[0]?.nutrition.nutrients]
                });
               
            } catch (error) {
                console.error("Error fetching meal images:", error);
            } finally {
                
            }
        },
        []
    );

    // --- Actions ---
    const handleGenerateMeal = useCallback(async () => {
        if (!isFormValid()) {
            setError("Please enter valid calories (1-5000) and diet type");
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const response = await caloriesAPI(Number(caloriesSet), dietSet.trim());

            console.log("RESPONSE :", response);

            if (!validateApiResponse(response)) {
                throw new MealGenerationError("Invalid API response format");
            }

            // Meals
            setMealType({
                breakfast: response.meals[0].title,
                lunch: response.meals[1].title,
                dinner: response.meals[2].title,
            });

            // Images
            const imageSourceUrl =(meal:number):string => { return `https://img.spoonacular.com/recipes/${response.meals[meal].id}-312x231.jpg`};

            // await getMealImageOptimized(
            //     response.meals[0].title,
            //     response.meals[1].title,
            //     response.meals[1].title
            // );

            setMealImage({
                ...mealImage,
                breakfast: `https://img.spoonacular.com/recipes/${response.meals[0].id}-312x231.jpg`,
                lunch: `https://img.spoonacular.com/recipes/${response.meals[1].id}-312x231.jpg`,
                dinner: `https://img.spoonacular.com/recipes/${response.meals[2].id}-312x231.jpg`
            })

            setImagesLoaded(true)

            // Nutrition
            getMealNutrients(
                response.meals[0].title,
                response.meals[1].title,
                response.meals[2].title
            );

            setNutrition({
                calories: response.nutrients.calories,
                carbohydrates: response.nutrients.carbohydrates,
                protein: response.nutrients.protein,
                fat: response.nutrients.fat,
            });
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Failed to generate meal plan";

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
        MEALS
    };
};
