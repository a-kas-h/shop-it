# 🔍 Search History Feature Documentation

## Overview

The search history feature tracks user searches and provides easy access to recent searches. It's implemented using React Context and localStorage for persistence.

## Features

✅ **Automatic Search Tracking** - Every search is automatically saved
✅ **User-Specific History** - Each user has their own search history
✅ **Persistent Storage** - History survives browser restarts
✅ **Recent Searches Display** - Quick access to last 5 searches
✅ **Search Again Functionality** - One-click to repeat searches
✅ **Remove Individual Searches** - Delete specific searches
✅ **Clear All History** - Clear entire search history
✅ **Search Results Count** - Shows how many results each search returned
✅ **Location Tracking** - Records where each search was performed

## Implementation

### 1. SearchHistoryContext
**File:** `frontend/src/contexts/SearchHistoryContext.jsx`

Provides:
- `searchHistory` - Array of all searches
- `addSearchToHistory(term, location, results)` - Add new search
- `clearSearchHistory()` - Clear all searches
- `removeSearchFromHistory(id)` - Remove specific search
- `getRecentSearches()` - Get last 5 searches

### 2. Integration Points

#### Search Page (`frontend/src/pages/Search.jsx`)
- Automatically tracks searches when performed
- Shows recent searches when no current search
- Handles URL parameters for "Search Again" functionality

#### User Profile (`frontend/src/pages/UserProfile.jsx`)
- Displays complete search history
- Provides search management (clear, remove, search again)
- Shows search metadata (date, location, results count)

#### Recent Searches Component (`frontend/src/components/RecentSearches.jsx`)
- Quick access widget for recent searches
- Displays on search page when no active search

### 3. Data Structure

Each search entry contains:
```javascript
{
  id: 1641234567890,           // Timestamp ID
  term: "Aashirvaad Atta",     // Search term
  date: "2024-01-03T10:30:00Z", // ISO date string
  location: {                   // User location when searched
    latitude: 11.167941,
    longitude: 79.708992
  },
  resultsCount: 3              // Number of results found
}
```

### 4. Storage

- **Method:** localStorage
- **Key Pattern:** `searchHistory_{userId}`
- **Max Items:** 20 searches per user
- **Deduplication:** Removes duplicate search terms

## Usage Examples

### Adding a Search
```javascript
const { addSearchToHistory } = useContext(SearchHistoryContext);

// After performing a search
addSearchToHistory("Aashirvaad Atta", userLocation, searchResults);
```

### Displaying Recent Searches
```javascript
const { getRecentSearches } = useContext(SearchHistoryContext);
const recentSearches = getRecentSearches(); // Returns last 5 searches
```

### Clearing History
```javascript
const { clearSearchHistory } = useContext(SearchHistoryContext);
clearSearchHistory(); // Removes all searches for current user
```

## User Experience

### Search Page
1. User enters search term
2. Search is performed and results displayed
3. Search is automatically added to history
4. When user returns to search page, recent searches are shown

### Profile Page
1. User can view complete search history
2. Each search shows:
   - Search term and results count
   - Date and time performed
   - Location where search was performed
3. User can:
   - Click "Search Again" to repeat search
   - Remove individual searches with "×" button
   - Clear entire history with "Clear History" button

### Recent Searches Widget
1. Shows last 5 searches as clickable buttons
2. Displays results count for each search
3. One-click to perform search again

## Privacy & Data Management

- **User-Specific:** Each user's history is separate
- **Local Storage:** Data stays on user's device
- **No Server Storage:** Search history is not sent to backend
- **User Control:** Users can clear or remove searches anytime
- **Automatic Cleanup:** Limited to 20 searches to prevent storage bloat

## Benefits

1. **Improved UX** - Quick access to previous searches
2. **Time Saving** - No need to retype common searches
3. **Search Patterns** - Users can see their search behavior
4. **Convenience** - Easy to repeat successful searches
5. **Privacy** - Data stays local to user's device

## Future Enhancements

Potential improvements:
- Search frequency tracking
- Favorite searches
- Search suggestions based on history
- Export/import search history
- Search history analytics
- Shared search history across devices (with user consent)