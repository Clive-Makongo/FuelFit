import { createContext, useContext, useState, ReactNode } from 'react';

// object to define the page props for the state
interface PageContextType {
    selectedPage: string;  
    setSelectedPage: (page: string) => void;
};

// create context hook
const PageContext = createContext<PageContextType | undefined>(undefined);

// 
export const PageProvider = ({ children }: { children: ReactNode }) => {
    const [selectedPage, setSelectedPage] = useState<string>("home");

    return (
        <PageContext.Provider value={{ selectedPage, setSelectedPage }}>
            {children}
        </PageContext.Provider>
    );
}

// error check
export const usePage = () => {
    const context = useContext(PageContext);
    if (!context) {
        throw new Error('usePage must be used within a PageProvider');
    }
    return context;
}