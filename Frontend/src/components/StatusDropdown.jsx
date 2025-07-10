import React from 'react';
import { useDispatch } from 'react-redux';
import { updateStatus } from '../slice/candidateSlice';

export default function StatusDropdown({ candidate }) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(updateStatus({ id: candidate._id, status: e.target.value }));
  };

  return (
    <select value={candidate.status} onChange={handleChange}>
      <option value="Pending">Pending</option>
      <option value="Reviewed">Reviewed</option>
      <option value="Hired">Hired</option>
    </select>
  );
}