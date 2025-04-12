import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/login";
import PList from './components/plist';
import Admin from './components/admin';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/plist" element={<PList />} />
            <Route exact path="/admin" element={<Admin />} />
        </Routes>
    </BrowserRouter>
);