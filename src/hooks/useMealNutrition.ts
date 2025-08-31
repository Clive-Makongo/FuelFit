import { useState, useCallback, useEffect } from "react";
import nutritionAPI from "@/utils/nutritionAPI";

interface MealNutrition {
    breakfast: any[];
    lunch: any[];
    dinner: any[];
}

export const useMealNutrition = () => {
    const [mealNutrition, setMealNutrition] = useState<MealNutrition>({
        breakfast: [],
        lunch: [],
        dinner: []
    });

    // Get Meal Nutrients
    const retryAPI = async (
        query: string,
        maxRetries: number = 2,
        delay: number = 200,
    ): Promise<any> => {
        let attempt = 0;

        while (attempt <= maxRetries) {
            try {
                const response = await nutritionAPI(query);

                // Check if we got actual results
                if (
                    response?.data?.results?.length > 0 &&
                    response.data.results[0]?.image
                ) {
                    console.log(`✅ ${query} succeeded on attempt ${attempt + 1}`);
                    return response;
                }

                // If empty results and we have retries left
                if (attempt < maxRetries) {
                    console.log(
                        `⚠️ ${query} returned empty, retrying... (attempt ${attempt + 1}/${maxRetries + 1})`,
                    );
                    await new Promise((resolve) => setTimeout(resolve, delay));
                    attempt++;
                } else {
                    console.log(`❌ ${query} failed after ${maxRetries + 1} attempts`);
                    return { data: { results: [{ image: "" }] } };
                }
            } catch (error) {
                console.error(
                    `❌ ${query} API error on attempt ${attempt + 1}:`,
                    error,
                );
                if (attempt === maxRetries) {
                    return { data: { results: [{ image: "" }] } };
                }
                await new Promise((resolve) => setTimeout(resolve, delay));
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

                const breakfast = await retryAPI(b).catch(() => ({
                    data: { results: [{ image: "" }] },
                }));
                await new Promise((resolve) => setTimeout(resolve, 100));

                const lunch = await retryAPI(l).catch(() => ({
                    data: { results: [{ image: "" }] },
                }));
                await new Promise((resolve) => setTimeout(resolve, 100));

                const dinner = await retryAPI(d).catch(() => ({
                    data: { results: [{ image: "" }] },
                }));

                setMealNutrition({
                    breakfast: [breakfast.data.results[0]?.nutrition.nutrients],
                    lunch: [lunch.data.results[0]?.nutrition.nutrients],
                    dinner: [dinner.data.results[0]?.nutrition.nutrients],
                });
            } catch (error) {
                console.error("Error fetching meal images:", error);
            }
        },
        []
    );

    useEffect(() => {
        console.log("NUTRRRRR: ", mealNutrition)
    }, [mealNutrition])

    const resetNutrition = useCallback(() => {
        setMealNutrition({
            breakfast: [],
            lunch: [],
            dinner: [],
        });
    }, []);

    return {
        mealNutrition,
        getMealNutrients,
        resetNutrition,
    };
};
