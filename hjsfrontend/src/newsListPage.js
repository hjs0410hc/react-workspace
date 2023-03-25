import React,{ useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

export default function NewsListPage(props) {
    const {state} = useLocation();
    const param = useParams();
    const [data, setData] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const getAsyncData = async ()=>{
            setLoading(true);
            const ad =  await axios.get("http://sa.thxx.xyz:8080/main/word?wordid="+state.id)
            setData(ad.data.data);
            setLoading(false);
        }
        getAsyncData();
        console.log(data);
    },[param.word])

    return (
        <div>
            {!loading && data.map((news)=>(
                <p>{news.id} {news.category} {news.title} {news.url}</p>
            ))}
            <Link to="/">뒤로 가보셈</Link>
        </div>
    );
  }