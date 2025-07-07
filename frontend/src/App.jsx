import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [validity, setValidity] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [expiration, setExpiration] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/shorturls', {
        url: longUrl,
        shortcode: customCode || undefined,
        validity: validity ? parseInt(validity) : undefined,
      });

      setShortUrl(res.data.shortLink);
      setExpiration(new Date(res.data.expiry).toLocaleString());
    } catch (err) {
      alert(err.response?.data?.error || 'Something went wrong while shortening the URL.');
    }
  };

  return (
    <div className="container">
      <h1>Simple URL Shortener</h1>

      <form onSubmit={handleFormSubmit}>
        <input
          type="url"
          placeholder="Paste your long URL here"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Custom shortcode (optional)"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
        />

        <input
          type="number"
          placeholder="Link expiry in minutes (optional)"
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
        />

        <button type="submit">Generate Short Link</button>
      </form>

      {shortUrl && (
        <div className="result">
          <p>
            Short URL:&nbsp;
            <a href={shortUrl} target="_blank" rel="noreferrer">
              {shortUrl}
            </a>
          </p>
          <p>Valid Until: {expiration}</p>
        </div>
      )}
    </div>
  );
}

export default App;
