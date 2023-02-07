import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import './App.css';
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import BookList from "./components/bookList";
import Edit from "./components/edit";
import Create from "./components/create";
import Confirmation from "./components/confirmation";

 
const App = () => {
 return (
   <div>
     <Navbar />
      <Routes>
       
       <Route exact path="/" element={<BookList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
       <Route path="/confirmation/:id" element={<Confirmation />} />

      </Routes>
   </div>
 );
};
 
export default App;