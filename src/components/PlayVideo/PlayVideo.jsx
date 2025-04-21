import React, { useEffect, useState } from 'react';
import './PlayVideo.css';
import { api_key, valueConverter } from '../../data';
import moment from 'moment';

const PlayVideo = ({ videoId }) => {
    const [like, setLike] = useState(false);
    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);

    // Fetch video details
    const fetchVideoData = async () => {
        try {
            const videoDetailUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${api_key}`;
            const res = await fetch(videoDetailUrl);
            const data = await res.json();
            if (data.items && data.items.length > 0) {
                setApiData(data.items[0]);
            }
        } catch (error) {
            console.error('Error fetching video details:', error);
        }
    };

    // Fetch channel and comment data (runs only when apiData is available)
    const fetchOtherData = async () => {
        if (!apiData) return;

        try {
            const otherDataUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${apiData.snippet.channelId}&key=${api_key}`;
            const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&maxResults=50&videoId=${videoId}&key=${api_key}`;

            const [channelRes, commentRes] = await Promise.all([
                fetch(otherDataUrl).then((res) => res.json()),
                fetch(commentUrl).then((res) => res.json()),
            ]);

            if (channelRes.items && channelRes.items.length > 0) {
                setChannelData(channelRes.items[0]);
            }

            if (commentRes.items) {
                setCommentData(commentRes.items);
            }
        } catch (error) {
            console.error('Error fetching channel/comments data:', error);
        }
    };

    // Fetch video data on mount
    useEffect(() => {
        fetchVideoData();
    }, [videoId]);

    // Fetch channel & comments after video data is loaded
    useEffect(() => {
        if (apiData) {
            fetchOtherData();
        }
    }, [apiData]);

    return (
        <div className="play-video">
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"referrerPolicy="strict-origin-when-cross-origin"allowFullScreen>
            </iframe>

            <h3>{apiData ? apiData.snippet.title : 'Title Here'}</h3>
            <div className="play-video-info">
                <p>
                    {apiData ? valueConverter(apiData.statistics.viewCount) : '0'} Views &bull;{' '}
                    {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ''}
                </p>
                <div>
                    <span onClick={() => setLike(true)}>
                        <i className={`fa-solid fa-thumbs-up ${like ? 'like' : ''}`}></i>{' '}
                        {apiData ? valueConverter(apiData.statistics.likeCount) : '0'}
                    </span>
                    <span onClick={() => setLike(false)}>
                        <i className={`fa-solid fa-thumbs-down ${!like ? 'like' : ''}`}></i>
                    </span>
                    <span>
                        <i className="fa-solid fa-share"></i> Share
                    </span>
                    <span>
                        <i className="fa-solid fa-bookmark"></i> Save
                    </span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={channelData ? channelData.snippet.thumbnails.default.url : ''} alt="Channel Thumbnail" />
                <div>
                    <p>{apiData ? apiData.snippet.channelTitle : ''}</p>
                    <span>{channelData ? valueConverter(channelData.statistics.subscriberCount) : '0'} subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-description">
                <p>{apiData ? apiData.snippet.description.slice(0, 250) : 'Description Here'}</p>
                <hr />
                <h4>{apiData ? valueConverter(apiData.statistics.commentCount) : '0'} Comments</h4>

                {commentData.length > 0 ? (
                    commentData.map((item, index) => (
                        <div key={index} className="comment">
                            <img
                                src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
                                alt="User Avatar"
                            />
                            <div>
                                <h3>
                                    {item.snippet.topLevelComment.snippet.authorDisplayName}{' '}
                                    <span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span>
                                </h3>
                                <p dangerouslySetInnerHTML={{ __html: item.snippet.topLevelComment.snippet.textDisplay }}></p>
                                <div className="comment-action">
                                    <i className="fa-solid fa-thumbs-up"></i>
                                    <span>{valueConverter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                    <i className="fa-solid fa-thumbs-down"></i>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No comments available.</p>
                )}
            </div>
        </div>
    );
};

export default PlayVideo;
