import { motion } from 'motion/react';
import { useEffect } from 'react';
import pic1 from '../../../assets/bg-image.jpg';
import pic2 from '../../../assets/construction.jpeg';
import pic3 from '../../../assets/light.avif';

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
}

const MealSegment = ({
    meal,
    image,
    title,
    isLoading = false
}: MealSegmentProps): JSX.Element => {

    // Use API image if provided, otherwise fallback to local images
    const displayImage = image || FALLBACK_IMAGES[meal as keyof typeof FALLBACK_IMAGES] || pic1;


    useEffect(() => {
        console.log("TITLE PASSED: ", title)
    }, [image, displayImage, meal,])

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

                <div className="bg-blue-500 text-white p-2 rounded text-sm font-medium">
                    {title && 'Click Generate to Nutrition'}
                </div>
            </div>
        </motion.div>
    );
};

export default MealSegment;