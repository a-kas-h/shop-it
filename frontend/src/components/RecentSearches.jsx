import { useContext } from 'react';
import { SearchHistoryContext } from '../contexts/SearchHistoryContext';

function RecentSearches({ onSearchSelect }) {
    const { getRecentSearches } = useContext(SearchHistoryContext);
    const recentSearches = getRecentSearches();

    if (recentSearches.length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Searches</h3>
            <div className="flex flex-wrap gap-2">
                {recentSearches.map(search => (
                    <button
                        key={search.id}
                        onClick={() => onSearchSelect(search.term)}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors duration-200"
                    >
                        {search.term}
                        {search.resultsCount !== undefined && (
                            <span className="ml-1 text-xs text-gray-500">
                                ({search.resultsCount})
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default RecentSearches;