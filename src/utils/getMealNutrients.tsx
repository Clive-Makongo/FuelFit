// import nutritiomAPI from "@/utils/nutritionAPI";
// import {useCallback} from "react"

// const retryAPI = async (
//         query: string, 
//         maxRetries: number = 2, 
//         delay: number = 200
//     ): Promise<any> => {
//         let attempt = 0;
            
//         while (attempt <= maxRetries) {
//             try {
//                 const response = await nutritiomAPI(query);
                    
//                 // Check if we got actual results
//                 if (response?.data?.results?.length > 0 && response.data.results[0]?.image) {
//                     console.log(`✅ ${query} succeeded on attempt ${attempt + 1}`);
//                         return response;
//                 }
                    
//                 // If empty results and we have retries left
//                 if (attempt < maxRetries) {
//                     console.log(`⚠️ ${query} returned empty, retrying... (attempt ${attempt + 1}/${maxRetries + 1})`);
//                     await new Promise(resolve => setTimeout(resolve, delay));
//                         attempt++;
//                 } else {
//                     console.log(`❌ ${query} failed after ${maxRetries + 1} attempts`);
//                     return { data: { results: [{ image: "" }] } };
//                 }
//             } catch (error) {
//                 console.error(`❌ ${query} API error on attempt ${attempt + 1}:`, error);
//                     if (attempt === maxRetries) {
//                         return { data: { results: [{ image: "" }] } };
//                     }
//                     await new Promise(resolve => setTimeout(resolve, delay));
//                     attempt++;
//                 }
//             }
// };

// const getMealNutrients = useCallback(
//         async (b: string, l: string, d: string): Promise<void> => {
//             if (!b || !l || !d) {
//                 setImagesLoaded(false);
//                 return;
//             }

//             setImagesLoaded(false);

//             try {
//                 // const imagePromises = [
//                 //     imageAPI(b).catch(() => ({ data: { results: [{ image: "" }] } })),
//                 //     imageAPI(l).catch(() => ({ data: { results: [{ image: "" }] } })),
//                 //     imageAPI(d).catch(() => ({ data: { results: [{ image: "" }] } })),
//                 // ];

//                 // console.log("IMAGE PROMISES: ", imagePromises)

//                 // const [breakfastRes, lunchRes, dinnerRes] = await Promise.all(
//                 //     imagePromises
//                 // );

//                 const breakfast = await retryAPI(b).catch(() => ({ data: { results: [{ image: "" }] } }));
//                 await new Promise(resolve => setTimeout(resolve, 100)); // Small delay
            
//                 const lunch = await retryAPI(l).catch(() => ({ data: { results: [{ image: "" }] } }));
//                 await new Promise(resolve => setTimeout(resolve, 100));
            
//                 const dinner = await retryAPI(d).catch(() => ({ data: { results: [{ image: "" }] } }));

//                 console.log("DINNER :",breakfast, lunch, dinner )


//                 setMealImage({
//                     breakfast: breakfast.data.results[0]?.image || "",
//                     lunch: lunch.data.results[0]?.image || "",
//                     dinner: dinner.data.results[0]?.image || "",
//                 });
//             } catch (error) {
//                 console.error("Error fetching meal images:", error);
//             } finally {
//                 setImagesLoaded(true);
//             }
//         },
//         []
//     );

// export default getMealNutrients;