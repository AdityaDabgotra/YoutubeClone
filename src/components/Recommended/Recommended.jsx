import React, { useEffect, useState } from 'react'
import './Recommended.css'
import {api_key,valueConverter} from '../../data'
import { Link } from 'react-router-dom';

const Recommended = ({categoryId}) => {

  const[apiData,setApiData] = useState([]);

  const fetchData = async()=>{
    const relatedVideoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=30&regionCode=IN&videoCategoryId=${categoryId}&key=${api_key}`
    await fetch(relatedVideoUrl).then(res=>res.json()).then(data=>setApiData(data.items));
  }
  useEffect(()=>{
    fetchData();
  },[]);

  return (
    <div className='recommended'>
      {
        apiData.map((item,index)=>{
          return(
            <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
              <img src={item.snippet.thumbnails.medium.url} alt="" />
              <div className="vid-info">
                <h4>{item.snippet.title}</h4>
                <p>{item.snippet.channelTitle}</p>
                <p>{valueConverter(item.statistics.viewCount)} Views</p>
              </div>
            </Link>
          )
        })
      }
    </div>
  )
}

export default Recommended
