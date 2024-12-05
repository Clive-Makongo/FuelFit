import GenerateMeal from "@/components/manual/Meal/GenerateMeal";
import Slide from "@/components/manual/Slide/Slide";
import { useWindowSize } from "@/utils/useWindowSize";

const Meal = (): JSX.Element => {
    const { width } = useWindowSize();
    const isMobile: boolean = width < 768;
    // API CALLS WITH IMAGES AND CALORIE DATA
        return (
        <>
            {/* Mobile Version */}
            {isMobile ? (
                <div className="meal-page bg-yellow-500 min-h-[80vh] text-center w-10/12">
                    <h1 className="text-2xl font-bold">Meal Page</h1>
                    <p style={{ paddingBottom: '2%' }} className="font-bold mb-5 pb-12">This is the Meal Page.</p>
                    <section
                        className="inputs flex flex-row justify-evenly w-4/5 mb-6"
                    >
                        <GenerateMeal info="number" placeholder="Enter calories" />
                        <GenerateMeal info="text" placeholder="Enter meal details" />
                    </section>
                    <div className="flex flex-col md:flex-row justify-evenly w-full md:w-4/5">
                        <Slide/>
                    </div>
                </div>
            ) : (
                <div>
                    DESKTOP
                </div>
            )}
        </>
    );
};

export default Meal;