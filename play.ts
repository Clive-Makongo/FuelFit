const userMap = new Map([
    [1, { name: 'kyle' }],
    [2, { name: 'dave' }]
]);

userMap.forEach((val, index) => {
    console.log(userMap);
    console.log(`Values at ${index} is ${JSON.stringify(val.name)}`);
});

// slice out relevant nutrition
const getRelNutr = (meal: {}): string | number[] => {
    const x = Object.entries(meal.data.results[0]?.nutrition.nutrients).slice(0, 6);

    const y = x.map((value, index) => {
        const name = value[1].name;
        const amount = value[1].amount;
        const unit = value[1].unit;
        console.log("2222: ", name, amount, unit)

        return [name, amount, unit];
    });
}