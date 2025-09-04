import { motion } from 'motion/react';
import { useEffect, useState, useMemo } from 'react';
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

interface ChartProps {
    calories: string | number;
    value: number[];
    label: string[];
}

interface MealSegmentProps {
    meal: string;
    image?: string;
    title?: string;
    isLoading?: boolean;
    chartProps: ChartProps;
}



const MealSegment = ({
    meal,
    image,
    title,
    isLoading = false,
    chartProps
}: MealSegmentProps): JSX.Element => {

    const displayImage = image || FALLBACK_IMAGES[meal as keyof typeof FALLBACK_IMAGES] || pic1;
    const [open, setOpen] = useState<boolean>(false);

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
            className="flex flex-col justify-evenly text-center meal-segment rounded-lg m-2 h-full overflow-hidden shadow-lg"
        >
            <div className="flex relative overflow-hidden rounded-3xl">
                <img
                    className="w-full h-full object-cover"
                    src={displayImage}
                    alt={`${meal} meal`}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = FALLBACK_IMAGES[meal as keyof typeof FALLBACK_IMAGES] || pic1;
                    }}
                />
            </div>

            <div className="flex flex-col justify-between text-left p-4">
                <h2 className="text-xl font-bold mb-2 text-black-900">
                    {meal.toUpperCase()}
                </h2>

                {title && (
                    <h3 className="text-lg font-medium mb-3 text-black-600 line-clamp-2">
                        {title}
                    </h3>
                )}

                <div className="bg-blue-500 text-white p-2 rounded text-sm font-medium mb-2">
                    {title ? 'Click Generate to Recipe' : 'No recipe available'}
                </div>

                <button
                    onClick={() => setOpen(true)}
                    className="bg-blue-500 text-white p-2 rounded text-sm font-medium"
                >
                    {title ? 'View Nutrition Info' : 'View Nutrition'}
                </button>

                <Modal
                    classNames={{
                        overlay: "bg-black/50 fixed inset-0 flex items-center justify-center",
                        modal: "bg-white rounded-2xl shadow-xl p-6 w-96 max-w-full text-center",
                    }}
                    open={open}
                    onClose={() => setOpen(false)}
                    center
                >
                    <h1>{title || meal} - Calories: {chartProps.calories}</h1>
                    <Chart value={chartProps.value} label={chartProps.label} />
                </Modal>
            </div>
        </motion.div>
    );
};

export default MealSegment;