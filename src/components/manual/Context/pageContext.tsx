import { createContext, useContext, useState } from 'react';

// object that defines page selection
interface PageContextType {
    page: string;
    setSelectedPage: (page: string) => void;
};

// Create the context
const PageContext = createContext<PageContextType | undefined>(undefined);

// this is creating the context that takes the props gor the different pages
export const PageProvider = ({ page }: PageContextType): JSX.Element => {
    const [selectedPage,  setSelectedPage] = useState<string>("home")
    return (
        <>
            {/* this is where i'm going to use the states */}
            <PageContext.Provider value={{selectedPage, setSelectedPage}}>
                {selectedPage}
            </PageContext.Provider>
        </>
    )
    
}