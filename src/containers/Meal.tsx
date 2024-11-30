import MealSegment from "@/components/manual/Meal/MealSegment";
import GenerateMeal from "@/components/manual/Meal/GenerateMeal";


const Meal = (): JSX.Element => {
    // API CALLS WITH IMAGES AND CALORIE DATA
    const meals: string[] = ['breakfast', 'lunch', 'dinner'];
    return (
        <>
            <div className="meal-page bg-yellow-500">
                <h1 className="text-2xl font-bold">Meal Page</h1>
                <p>This is the Meal Page.</p>
                <section
                    className="flex flex-row justify-evenly w-4/5"
                >
                <GenerateMeal info="number" placeholder="Enter calories" />
                <GenerateMeal info="text" placeholder="Enter meal details" />
                </section>
                <section className="flex flex-row justify-start min-h-[20vh]">
                    {meals && meals.map((meal, index) => (
                        <MealSegment
                            meal={meal}
                            key={index} />
                    ))}
                </section>
            </div>
        </>
    );
};

export default Meal;