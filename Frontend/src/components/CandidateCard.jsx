import React from 'react';
import StatusDropdown from './StatusDropdown';

export default function CandidateCard({ candidate }) {
  return (
    <div className="border p-4 rounded">
      <h3 className="text-xl">{candidate.name}</h3>
      <p>{candidate.jobTitle}</p>
      <p>Status: {candidate.status}</p>
      <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a>
      <StatusDropdown candidate={candidate} />
    </div>
  );
}