import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Create from "./components/Create";
import Notes from "./components/Notes";
import Update from "./components/Update";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Notes />}> </Route>
        <Route path = '/create' element = {<Create />}> </Route>
        <Route path = '/update' element = {<Update />}> </Route>
      </Routes>
  </BrowserRouter>
  );
}

export default App;
