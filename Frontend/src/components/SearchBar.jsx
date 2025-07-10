import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCandidates } from '../slice/candidateSlice';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    dispatch(fetchCandidates({ q: query }));
  };

  return (
    <div className="flex space-x-2">
      <input
        placeholder="Search by title or status"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}