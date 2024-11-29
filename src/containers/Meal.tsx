import {Card} from '@/components/ui/card';

const Meal = (): JSX.Element => {
    // API CALLS WITH IMAGES AND CALORIE DATA
    const meals: string[] = ["breakfast", "lunch"]
    return (
        <>
            <div className="bg-yellow-500">
                <h1 className="text-2xl font-bold">Meal Page</h1>
                <p>This is the Meal Page.</p>
                <section className="flex flex-row justify-evenly min-h-[80vh]">
                    <Card/>
                    
                </section>
            </div>
        </>
    );
};

export default Meal;