import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Create from "./components/Create";
import Notes from "./components/Notes";
import Update from "./components/Update";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Notebook-FrontEnd-React.js/' element={<Notes />}> </Route>
        <Route path='/Notebook-FrontEnd-React.js/create' element={<Create />}> </Route>
        <Route path='/Notebook-FrontEnd-React.js//update' element={<Update />}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
