import NavElement from "./NavElement";
import { usePage } from "../Context/pageContext";

const NavbarIds: string[] = ['home', 'meal', 'workOut', 'selfCare'];

const Navbar = (): JSX.Element => {
    // page selections props using useContext
    const { setSelectedPage } = usePage();

    // function to select which page i'm clicking from the array
    // sends the selected page prop back up the tree
    const handleClick = (page: number): void => {
        if(page >= 0 && page <= NavbarIds.length) {
            setSelectedPage(NavbarIds[page]);
        };        
    };

    return (
        <nav>
            <ul className="navbar-desktop flex bg-red-500 flex-row justify-evenly px-5">
                {NavbarIds.map((page, index) => (
                    <NavElement
                        key={page}
                        text={page.charAt(0).toUpperCase() + page.slice(1)}
                        onClick={() => handleClick(index)}
                    />
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
