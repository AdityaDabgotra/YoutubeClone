import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Search.css'
import { api_key } from '../../data'
import moment from 'moment'

const Search = ({ search }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${encodeURIComponent(search)}&key=${api_key}`
      );
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      
      if (data.items?.length) {
        setResults(data.items);
      } else {
        setResults([]);
        throw new Error('No results found');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search?.trim()) searchItems();
  }, [search]);

  return (
    <div className="search-results-container">
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      
      {results.map((item) => (
        item.id.kind === 'youtube#channel' ? (
          <div key={item.etag} className="channel-result">
            <div className="channel-info-container">
              <Link to={`/channel/${item.id.channelId}`} className="channel-link">
                <img 
                  src={item.snippet.thumbnails?.medium?.url} 
                  alt={item.snippet.channelTitle}
                  className="channel-thumbnail"
                />
              </Link>
              <div className="channel-details">
                <Link to={`/channel/${item.id.channelId}`} className="channel-title">
                  {item.snippet.channelTitle}
                </Link>
                <div className="channel-meta">
                  <span className="channel-type">Channel</span>
                  <span className="subscribers">{item.snippet.description}</span>
                </div>
              </div>
            </div>
            <button className="subscribe-button">Subscribe</button>
          </div>
        ) : (
          <Link 
            key={item.etag} 
            to={`/video/0/${item.id.videoId}`} 
            className="video-result"
          >
            <div className="thumbnail-container">
              <img
                src={item.snippet.thumbnails?.medium?.url}
                alt={item.snippet.title}
                className="video-thumbnail"
              />
            </div>
            <div className="video-details">
              <h3 className="video-title">{item.snippet.title}</h3>
              <div className="video-meta">
                <span className="channel-name">{item.snippet.channelTitle}</span>
                <span className="views-date">
                  • {moment(item.snippet.publishedAt).fromNow()}
                </span>
              </div>
              <p className="video-description">{item.snippet.description}</p>
            </div>
          </Link>
        )
      ))}
    </div>
  );
};

export default Search;