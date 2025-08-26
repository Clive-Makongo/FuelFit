import React from "react";

interface InputSectionProps {
    caloriesSet: string;
    dietSet: string;
    setCalories: (val: string) => void;
    setDiet: (val: string) => void;
    isFormValid: () => boolean;
    isLoading: boolean;
    handleGenerateMeal: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({
    caloriesSet,
    dietSet,
    setCalories,
    setDiet,
    isFormValid,
    isLoading,
    handleGenerateMeal,
}) => {
    return (
        <section className="inputs flex flex-row justify-evenly w-full mb-6 gap-4 mx-auto">
            {/* Calories Input */}
            <div className="flex flex-col">
                <label htmlFor="calories" className="text-sm font-medium mb-1">
                    Calories (1-5000)
                </label>
                <input
                    id="calories"
                    className="set-calories border-2 border-black rounded-lg px-3 py-2"
                    type="number"
                    min="1"
                    max="5000"
                    placeholder="2000"
                    onChange={(e) => setCalories(e.target.value)}
                    value={caloriesSet}
                    disabled={isLoading}
                />
            </div>

            {/* Diet Input */}
            <div className="flex flex-col">
                <label htmlFor="diet" className="text-sm font-medium mb-1">
                    Diet Type
                </label>
                <input
                    id="diet"
                    className="set-diet border-2 border-black rounded-lg px-3 py-2"
                    type="text"
                    placeholder="Mediterranean"
                    onChange={(e) => setDiet(e.target.value)}
                    value={dietSet}
                    disabled={isLoading}
                />
            </div>

            {/* Button */}
            <div className="flex flex-row items-end">
                <button
                    onClick={handleGenerateMeal}
                    disabled={!isFormValid() || isLoading}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                   transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {isLoading ? "Generating..." : "Generate Meals"}
                </button>
            </div>
        </section>
    );
};

export default InputSection;
