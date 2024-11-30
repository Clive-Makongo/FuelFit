import { useState } from "react";

const MealSegment = ({ meal }: {meal: string}): JSX.Element => {
    

    return (
        <section>
            <img src="" alt="meal-image" />
            <h2>{meal }</h2>
            <p>Data</p>
        </section>
    );
};

export default MealSegment