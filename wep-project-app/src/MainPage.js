import React, { useState, useEffect} from "react";
// import * as React from "react";
import { TagCloud } from 'react-tagcloud';
import './App.css';
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer
} from "@material-ui/core";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import NewsListPage from "./newsListPage";


export default function MainPage(){
  
  const [words, setWords] = useState(null);
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
    
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        setWords(null);
        setStock(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get(
          'http://localhost:8080/main/words'
        );

        const response2 = await axios.get(
          'http://localhost:8080/main/stock'
        );
        setWords(response.data); // 데이터는 response.data 안에 들어있습니다.
        setStock(response2.data)
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    
    fetchUsers();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!words) return null;
  if (!stock) return null;

  const wordData = words.data;
  const stockData = stock.data;

  let result = wordData.map(({ id: key,word:value, ...rest }) => ({ key,value, ...rest }));

  console.log(result)
  const customRender = (tag,size,color)=>{
    return (
      <Link to={tag.value} state={{
        word:tag.value,
        id:tag.key
      }}>
        <span key={tag.value} style={{color, fontSize:`${size/20}em`}} className={`tag=${size}`}>
          {tag.value}
        </span>
      </Link>
    )
  }
  // const url = "https://www.hanaw.com/main/research/research/list.cmd?pid=0&cid=0&srchTitle=ALL&srchWord=%EC%9E%90%EB%8F%99%EC%B0%A8&startDate=2023-03-02&endDate=2023-03-09"

  return (
      
      <div className="App">
       
        <div className="link">
        </div>
        <section>
          <article>
            <div className="words">
              <TagCloud
              minSize={24}
              maxSize={70}
              tags={result}
              renderer={customRender}
              />
            </div>
          </article>
        </section>
        <aside>
          <div className="stock">
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell align="right">테마</TableCell>
                    <TableCell align="right">전일대비등락</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stockData.map(({id, thema, value}) => (
                  <TableRow key={id}>
                    <TableCell>{id}</TableCell>
                    <TableCell align="right">
                    <p onClick={()=>{window.open("https://www.hanaw.com/main/research/research/list.cmd?pid=0&cid=0&srchTitle=ALL&srchWord=" + {thema}.thema + "&startDate=2023-03-02&endDate=2023-03-09")}}>
                      {thema}
                    </p>               
                    </TableCell>
                    <TableCell align="right">{value}</TableCell>
                  </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </aside>
        
      </div>
      
    );
 };
