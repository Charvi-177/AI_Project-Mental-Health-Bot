import React, { useState } from 'react';

export default function FeedbackModal({ onClose, onSubmit }) {
  const [rating, setRating] = useState(5);
  const [note, setNote] = useState('');

  function submit() {
    onSubmit({ convo_id: null, rating, note });
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Feedback</h3>
        <p>Share how helpful the assistant was.</p>

        <label>Rating</label>
        <input type="range" min="1" max="5" value={rating} onChange={e => setRating(Number(e.target.value))} />
        <div className="rating-value">{rating} / 5</div>

        <label>Note (optional)</label>
        <textarea value={note} onChange={e => setNote(e.target.value)} rows={4} />

        <div className="modal-actions">
          <button className="btn" onClick={submit}>Submit</button>
          <button className="btn ghost" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
