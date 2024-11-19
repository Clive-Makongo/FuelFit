// create generic for testing purposes. 
type unique<T> = T[];

//create interface for person object
interface Person<T> {
    name: string,
    age: number,
    friends: string[],
    special?: unique<T>
};

const barry: Person<number> = {
    name: "Barry",
    age: 18,
    friends: ["Steve", "rachel", "james"],
    special: [1]
};

const steve: Person<string> = {
    name: "Steve",
    age: 18,
    friends: ["Barry", "rachel", "james"],
    special: ["a"]
};

const createPerson = (name: string, age: number, friends: string[]): Person => {
    return { name, age, friends };
};
