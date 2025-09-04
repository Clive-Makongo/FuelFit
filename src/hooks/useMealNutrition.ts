import { useState, useCallback, useEffect, useMemo } from "react";
import nutritionAPI from "@/utils/nutritionAPI";
import { useMealGenerate } from "@/hooks/useMealGenerate";
import { MealID } from "@/hooks/useMealGenerate";
//import { useMealContext } from "@/components/manual/Context/MealContext";

interface MealNutrition {
    breakfast: string[] | number[];
    lunch: string[] | number[];
    dinner: string[] | number[];
}

interface ChartProps {
    calories: string | number;
    value: number[];
    label: string[];
}

interface PassedProps {
    breakfast: ChartProps;
    lunch: ChartProps;
    dinner: ChartProps;
}

export const useMealNutrition = () => {
    const [mealNutrition, setMealNutrition] = useState<MealNutrition>({
        breakfast: [],
        lunch: [],
        dinner: []
    });
    const [chartProps, setChartProps] = useState<PassedProps>({ breakfast: { calories: 0, value: [], label: [] }, lunch: { calories: 0, value: [], label: [] }, dinner: { calories: 0, value: [], label: [] } });

    const extractNutrients = (mealData: any) => {
        const nutrients = Object.entries(mealData.data.nutrients);
        const filtered = nutrients.filter(([key, nutrient]: [string, any]) =>
            nutrient.unit === 'g' && nutrient.name !== "Net Carbohydrates"
        );

        return {
            values: filtered.map(([key, nutrient]) => nutrient.amount),
            labels: filtered.map(([key, nutrient]) => nutrient.name)
        };
    };


    const processedChartData = useMemo(() => {
        console.log("PROCESS : ", mealNutrition)
        if (!mealNutrition?.breakfast.data?.nutrients) {
            return { value: [], label: [], calories: 0 };
        }

        // Extract for each meal
        const breakfast = extractNutrients(mealNutrition.breakfast);
        const lunch = extractNutrients(mealNutrition.lunch);
        const dinner = extractNutrients(mealNutrition.dinner);

        const breakfastValues = breakfast.values;
        const breakfastLabels = breakfast.labels;
        const lunchValues = lunch.values;
        const lunchLabels = lunch.labels;
        const dinnerValues = dinner.values;
        const dinnerLabels = dinner.labels;

        setChartProps({
            breakfast: {
                calories: mealNutrition.breakfast.data.nutrients[0]?.amount || 0,
                value: breakfastValues,
                label: breakfastLabels
            },
            lunch: {
                calories: mealNutrition.lunch.data.nutrients[0]?.amount || 0,
                value: lunchValues,
                label: lunchLabels
            },
            dinner: {
                calories: mealNutrition.dinner.data.nutrients[0]?.amount || 0,
                value: dinnerValues,
                label: dinnerLabels
            }
        })

        // return [[breakfastLabels, breakfastValues], [lunchLabels, lunchLabels, lunchValues], [dinnerLabels, dinnerValues]]

    }, [mealNutrition]);


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
        console.log(chartProps)
    }, [processedChartData, chartProps]);

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
        chartProps,
        getMealNutrients,
        resetNutrition
    };
};
