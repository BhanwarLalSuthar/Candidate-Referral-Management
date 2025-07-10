import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { referCandidate } from '../slice/candidateSlice';
import { useNavigate } from 'react-router-dom';

export default function ReferralForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector(state => state.candidates);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    jobTitle: '',
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setForm({ ...form, resume: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('phone', form.phone);
    formData.append('jobTitle', form.jobTitle);
    formData.append('resume', form.resume);

    dispatch(referCandidate(formData)).then(() => {
      navigate('/');
    });
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Refer a Candidate</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Candidate Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="phone"
          type="text"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="jobTitle"
          type="text"
          placeholder="Job Title"
          value={form.jobTitle}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <label className="block">
          <span className="text-sm">Resume (PDF only):</span>
          <input
            name="resume"
            type="file"
            accept=".pdf"
            onChange={handleChange}
            className="mt-1"
            required
          />
        </label>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {status === 'loading' ? 'Submitting...' : 'Submit Referral'}
        </button>
      </form>
      {status === 'failed' && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}