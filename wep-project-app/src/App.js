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
import MainPage from "./MainPage";


function App(){
  return (
      <Routes>
        <Route path='/:word' exact element={<NewsListPage/>} />
        <Route path='/' exact element={<MainPage />} />
      </Routes>
    );
 };

export default App;