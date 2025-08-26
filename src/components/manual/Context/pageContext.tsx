import { createContext, useContext, useState, ReactNode } from 'react';

//THIS IS WHERE THE NAVBAR CONTEXT IS DEFINED FOR MOBILE

// object to define the page props for the state
// holds the navbar titles and function to update the selected page
interface PageContextType {
    selectedPage: string;  
    setSelectedPage: (page: string) => void;
};

// create context hook
const PageContext = createContext<PageContextType | undefined>(undefined);

// providing context for the navbar
export const PageProvider = ({ children }: { children: ReactNode }) => {
    const [selectedPage, setSelectedPage] = useState<string>('home');

    // im saving the navigating state with this
    return (
        <PageContext.Provider value={{ selectedPage, setSelectedPage }}>
            {children}
        </PageContext.Provider>
    );
};

// error checking for context provider
export const usePage = () => {
    const context = useContext(PageContext);
    if (!context) {
        throw new Error('usePage must be used within a PageProvider');
    };
    return context;
};