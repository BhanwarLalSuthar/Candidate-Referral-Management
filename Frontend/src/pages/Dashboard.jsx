import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCandidates } from '../slice/candidateSlice';
import CandidateCard from '../components/CandidateCard';
import SearchBar from '../components/SearchBar';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.candidates);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchCandidates());
  }, [status, dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <SearchBar />
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {items.map(c => <CandidateCard key={c._id} candidate={c} />)}
      </div>
    </div>
  );
}