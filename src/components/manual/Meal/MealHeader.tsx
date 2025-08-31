import React from "react"

const MealHeader = (): JSX.Element => {
    return (
        <header className="text-left font-mono">
            <h1 className="text-3xl font-bold mb-2">Meal Planner</h1>
            <p className="text-lg">Generate personalized meal plans based on your dietary preferences</p>
        </header>
    )
};

export default MealHeader;