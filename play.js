const userMap = new Map([
    [1, { name: 'kyle' }],
    [2, { name: 'dave' }]
]);

userMap.forEach((val, index) => {
    console.log(userMap);
    console.log(`Values at ${index} is ${JSON.stringify(val.name)}`);
});