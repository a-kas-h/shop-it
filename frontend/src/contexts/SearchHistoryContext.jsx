import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const SearchHistoryContext = createContext();

export const SearchHistoryProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const [searchHistory, setSearchHistory] = useState([]);

    // Load search history from localStorage when user changes
    useEffect(() => {
        if (currentUser) {
            const userHistoryKey = `searchHistory_${currentUser.uid}`;
            const savedHistory = localStorage.getItem(userHistoryKey);
            if (savedHistory) {
                try {
                    setSearchHistory(JSON.parse(savedHistory));
                } catch (error) {
                    console.error('Error loading search history:', error);
                    setSearchHistory([]);
                }
            }
        } else {
            setSearchHistory([]);
        }
    }, [currentUser]);

    // Save search history to localStorage whenever it changes
    const saveHistoryToStorage = (history) => {
        if (currentUser) {
            const userHistoryKey = `searchHistory_${currentUser.uid}`;
            localStorage.setItem(userHistoryKey, JSON.stringify(history));
        }
    };

    // Add a new search to history
    const addSearchToHistory = (searchTerm, location, results) => {
        if (!searchTerm.trim()) return;

        const newSearch = {
            id: Date.now(),
            term: searchTerm.trim(),
            date: new Date().toISOString(),
            location: location ? {
                latitude: location.latitude,
                longitude: location.longitude
            } : null,
            resultsCount: results ? results.length : 0
        };

        setSearchHistory(prevHistory => {
            // Remove duplicate searches (same term)
            const filteredHistory = prevHistory.filter(
                search => search.term.toLowerCase() !== searchTerm.toLowerCase()
            );

            // Add new search at the beginning and limit to 20 items
            const newHistory = [newSearch, ...filteredHistory].slice(0, 20);

            // Save to localStorage
            saveHistoryToStorage(newHistory);

            return newHistory;
        });
    };

    // Clear all search history
    const clearSearchHistory = () => {
        setSearchHistory([]);
        if (currentUser) {
            const userHistoryKey = `searchHistory_${currentUser.uid}`;
            localStorage.removeItem(userHistoryKey);
        }
    };

    // Remove a specific search from history
    const removeSearchFromHistory = (searchId) => {
        setSearchHistory(prevHistory => {
            const newHistory = prevHistory.filter(search => search.id !== searchId);
            saveHistoryToStorage(newHistory);
            return newHistory;
        });
    };

    // Get recent searches (last 5)
    const getRecentSearches = () => {
        return searchHistory.slice(0, 5);
    };

    const value = {
        searchHistory,
        addSearchToHistory,
        clearSearchHistory,
        removeSearchFromHistory,
        getRecentSearches
    };

    return (
        <SearchHistoryContext.Provider value={value}>
            {children}
        </SearchHistoryContext.Provider>
    );
};