import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import pic1 from '@/assets/bg-image.jpg';
import pic2 from '@/assets/construction.jpeg';
import pic3 from '@/assets/light.avif';
import Modal from 'react-responsive-modal';
import Chart from '@/components/manual/Chart/Chart';

// Fallback images map
const FALLBACK_IMAGES = {
    'breakfast': pic1,
    'lunch': pic2,
    'dinner': pic3
};

// Props interface
interface MealSegmentProps {
    meal: string;
    image?: string;  // Optional - will use fallback if not provided
    title?: string;  // Optional - will use meal name if not provided
    isLoading?: boolean;
    mealNutrition: string[][] | number[][]
}

interface ChartProps {
    calories: string[] | number[];
    value: number[];
    label: string[]
}

const MealSegment = ({
    meal,
    image,
    title,
    isLoading = false,
    mealNutrition
}: MealSegmentProps): JSX.Element => {

    // Use API image if provided, otherwise fallback to local images
    const displayImage = image || FALLBACK_IMAGES[meal as keyof typeof FALLBACK_IMAGES] || pic1;

    const [open, setOpen] = useState<boolean>(false);
    const [chartProps, setChartProps] = useState<ChartProps>({ value: [], label: [], calories: [] })


    useEffect(() => {
        console.log("MEAL SEGMENT PROPS: ", mealNutrition)
        if (mealNutrition.data) {
            console.log("CHART DATA : ", mealNutrition.data)
            const arr = Object.entries(mealNutrition.data.nutrients)
            const filtered = arr.filter(value => value[1].unit === `g`);
            console.log("ARRRR: ", filtered);
            const value: number[] = []
            const label: string[] = []

            for (let index = 0; index < filtered.length; index++) {
                value.push(filtered[index][1].amount);
                label.push(filtered[index][1].name)
            }

            setChartProps({
                calories: mealNutrition.data.nutrients[0].amount,
                value: value,
                label: label
            })


            console.log("INTPUSS: ", chartProps, value, label)
        }

        console.log("CHART PROPS: ", chartProps)
    }, [image, displayImage, meal, mealNutrition, open])

    if (isLoading) {
        return (
            <div className="flex flex-col border-black border text-center meal-segment rounded-lg m-2 h-full">
                <div className="w-full h-48 bg-gray-200 animate-pulse flex items-center justify-center">
                    <span className="text-gray-500">Loading...</span>
                </div>
                <div className="p-4">
                    <div className="h-6 bg-gray-200 animate-pulse rounded mb-2"></div>
                    <div className="h-8 bg-gray-200 animate-pulse rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            whileHover={{ scale: 1.015 }}
            className="flex flex-col justify-evenly  text-center meal-segment rounded-lg m-2 h-full overflow-hidden shadow-lg"
        >
            <div className="flex relative overflow-hidden rounded-3xl ">
                <img
                    className="w-full h-full object-cover"
                    src={image}
                    alt={`${meal} meal`}
                //     onError={(e) => {
                //         // Fallback if API image fails to load
                //         const target = e.target as HTMLImageElement;
                //         target.src = FALLBACK_IMAGES[meal as keyof typeof FALLBACK_IMAGES] || pic1;
                //     }
                // }
                />
            </div>

            <div className="flex flex-col justify-between text-left p-4 ">
                <h2 className="text-xl font-bold mb-2 text-black-900">
                    {meal.toUpperCase()}
                </h2>

                {title && (
                    <h3 className="text-lg font-medium mb-3 text-black-600 line-clamp-2">
                        {title}
                    </h3>
                )}

                <div className="bg-blue-500 text-white p-2 rounded text-sm font-medium">
                    {title && 'Click Generate to Recipe'}
                </div>

                <button
                    onClick={() => setOpen(true)}
                    className="bg-blue-500 text-white p-2 rounded text-sm font-medium">
                    {title && 'Click Generate to Nutrition'}
                </button>

                {<Modal
                    classNames={{
                        overlay: "bg-black/50 fixed inset-0 flex items-center justify-center",
                        modal: "bg-white rounded-2xl shadow-xl p-6 w-96 max-w-full text-center",
                    }}
                    open={open}
                    onClose={() => setOpen(false)}
                    center
                >
                    <h1>{title} Calories {chartProps.calories}</h1>
                    <Chart value={chartProps.value} label={chartProps.label} />
                </Modal>}
            </div>
        </motion.div>
    );
};

export default MealSegment;