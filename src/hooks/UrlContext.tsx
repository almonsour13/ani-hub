import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UrlContextType {
    urlDetection: string;
    setUrlDetection: (url: string) => void;
}

const UrlContext = createContext<UrlContextType | undefined>(undefined);

export const UrlProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [urlDetection, setUrlDetection] = useState(window.location.href);

    return (
        <UrlContext.Provider value={{ urlDetection, setUrlDetection }}>
            {children}
        </UrlContext.Provider>
    );
};

export const useUrlState = () => {
    const context = useContext(UrlContext);
    if (!context) {
        throw new Error('useUrlState must be used within a UrlProvider');
    }
    return context;
};
