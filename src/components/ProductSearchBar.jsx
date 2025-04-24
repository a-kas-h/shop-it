import { useState } from 'react';

function ProductSearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center border-2 border-blue-500 rounded-lg overflow-hidden">
        <input
          type="text"
          className="flex-grow px-4 py-3 focus:outline-none"
          placeholder="Search for products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default ProductSearchBar;