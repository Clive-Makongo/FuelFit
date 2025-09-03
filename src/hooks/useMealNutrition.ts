import { useState, useCallback, useEffect } from "react";
import nutritionAPI from "@/utils/nutritionAPI";
import { useMealGenerate } from "@/hooks/useMealGenerate";
import { MealID } from "@/hooks/useMealGenerate";
//import { useMealContext } from "@/components/manual/Context/MealContext";

interface MealNutrition {
    breakfast: string[] | number[];
    lunch: string[] | number[];
    dinner: string[] | number[];
}

export const useMealNutrition = () => {
    const [mealNutrition, setMealNutrition] = useState<MealNutrition>({
        breakfast: [],
        lunch: [],
        dinner: []
    });

    //Get Meal Nutrients
    // const retryAPI = async (
    //     query: string,
    //     maxRetries: number = 2,
    //     delay: number = 200,
    // ): Promise<any> => {
    //     let attempt = 0;

    //     while (attempt <= maxRetries) {
    //         try {
    //             const response = await nutritionAPI(mealId);

    //             // Check if we got actual results
    //             if (
    //                 response?.data?.results?.length > 0 &&
    //                 response.data.results[0]?.image
    //             ) {
    //                 console.log(`✅ ${query} succeeded on attempt ${attempt + 1}`);
    //                 return response;
    //             }

    //             // If empty results and we have retries left
    //             if (attempt < maxRetries) {
    //                 console.log(
    //                     `⚠️ ${query} returned empty, retrying... (attempt ${attempt + 1}/${maxRetries + 1})`,
    //                 );
    //                 await new Promise((resolve) => setTimeout(resolve, delay));
    //                 attempt++;
    //             } else {
    //                 console.log(`❌ ${query} failed after ${maxRetries + 1} attempts`);
    //                 return { data: { results: [{ image: "" }] } };
    //             }
    //         } catch (error) {
    //             console.error(
    //                 `❌ ${query} API error on attempt ${attempt + 1}:`,
    //                 error,
    //             );
    //             if (attempt === maxRetries) {
    //                 return { data: { results: [{ image: "" }] } };
    //             }
    //             await new Promise((resolve) => setTimeout(resolve, delay));
    //             attempt++;
    //         }
    //     }
    // };

    // slice out relevant nutrition
    // const getRelNutr = (meal: {}): string[][] | number[][] => {
    //     const x = Object.entries(meal.data.results[0]?.nutrition.nutrients).slice(0, 6);

    //     const y = x.map((value) => {
    //         const name = value[1].name;
    //         const amount = value[1].amount;
    //         const unit = value[1].unit;
    //         console.log("2222: ", name, amount, unit)

    //         return [name, amount, unit];
    //     });

    //     return y;
    // }

    // const getMealNutrients = useCallback(
    //     async (b: string, l: string, d: string): Promise<void> => {
    //         if (!b || !l || !d) {
    //             return;
    //         }

    //         try {
    //             // const imagePromises = [
    //             //     imageAPI(b).catch(() => ({ data: { results: [{ image: "" }] } })),
    //             //     imageAPI(l).catch(() => ({ data: { results: [{ image: "" }] } })),
    //             //     imageAPI(d).catch(() => ({ data: { results: [{ image: "" }] } })),
    //             // ];

    //             // console.log("IMAGE PROMISES: ", imagePromises)

    //             // const [breakfastRes, lunchRes, dinnerRes] = await Promise.all(
    //             //     imagePromises
    //             // );

    //             const breakfast = await nutritionAPI(mealId.breakfast)
    //             await new Promise((resolve) => setTimeout(resolve, 100));

    //             //const bNutr = getRelNutr(breakfast);
    //             //console.log("NEWW : ", bNutr)

    //             // const bArr = Object.entries(breakfast.data.results[0]?.nutrition.nutrients)

    //             // const gBreakfast: [] = bArr.slice(0, 6)

    //             // gBreakfast.forEach((value, index) => {
    //             //     value[1].amount, value[1].name, value[1].unit,
    //             // })

    //             // const test = gBreakfast.map((value, index) => {
    //             //     const name = value[1].name;
    //             //     const amount = value[1].amount;
    //             //     const unit = value[1].unit;
    //             //     console.log("2222: ", name, amount, unit)

    //             //     return [name, amount, unit];
    //             // });



    //             const lunch = await nutritionAPI(mealId.lunch)
    //             await new Promise((resolve) => setTimeout(resolve, 100));

    //             const dinner = await nutritionAPI(mealId.dinner)

    //             setMealNutrition({
    //                 breakfast: breakfast,
    //                 lunch: lunch,
    //                 dinner: dinner
    //             });
    //         } catch (error) {
    //             console.error("Error fetching meal images:", error);
    //         }
    //     },
    //     []
    // );

    const getMealNutrients = useCallback(async (mealId: MealID) => {
        console.log("MEAL IDDDDDD: ", mealId)
        if (mealId.breakfast != null && mealId.lunch != null && mealId.dinner != null) {
            const [breakfast, lunch, dinner] = await Promise.all([
                nutritionAPI(mealId.breakfast),
                nutritionAPI(mealId.lunch),
                nutritionAPI(mealId.dinner)
            ])

            console.log(breakfast, lunch, dinner)

            setMealNutrition({
                breakfast: breakfast,
                lunch: lunch,
                dinner: dinner
            })
        }
    }, [])



    useEffect(() => {
        console.log("MEALLLLLLLLL: ", mealNutrition);
    }, [mealNutrition]);

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
        resetNutrition
    };
};
