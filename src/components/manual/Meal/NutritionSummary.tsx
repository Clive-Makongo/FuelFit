import React from "react";
import {motion} from "motion/react"

interface NutritionSummaryProps {
    nutrition: { calories: number, protein: number, fat: number, carbohydrates: number }
};

const NutritionSummary: React.FC<NutritionSummaryProps> = ({ nutrition }) => {
    return (
        <motion.div
            className="mt-8 p-6 bg-white rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-xl font-bold mb-4">Daily Nutrition Summary</h2>
            <div className="flex justify-between">
                <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{nutrition.calories}</div>
                    <div className="text-sm text-gray-600">Calories</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{nutrition.protein}g</div>
                    <div className="text-sm text-gray-600">Protein</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{nutrition.carbohydrates}g</div>
                    <div className="text-sm text-gray-600">Carbs</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{nutrition.fat}g</div>
                    <div className="text-sm text-gray-600">Fat</div>
                </div>
            </div>
        </motion.div>
    )
};

export default NutritionSummary;