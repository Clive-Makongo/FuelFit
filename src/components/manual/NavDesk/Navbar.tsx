import NavElement from "./NavElement";

const Navbar = (): JSX.Element => {
    return (
        <ul className="flex bg-gray-500 flex-row justify-evenly px-5">
            <NavElement text="Home" onClick={() => alert("Button 1 clicked")} />
            <NavElement text="Meal Ideas" onClick={() => alert("Button 2 clicked")} />
            <NavElement text="Workout Plans" onClick={() => alert("Button 3 clicked")} />
            <NavElement text="Self Care" onClick={() => alert("Button 3 clicked")} />
        </ul>
    );
};

export default Navbar;
