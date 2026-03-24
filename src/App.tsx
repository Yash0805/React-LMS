import { Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "Feature/Dashboard/Index";
import Category from "./Feature/Category/";
import Member from "./Feature/Member/";
import Mainlayout from "./Layout/Mainlayout";
import Book from "Feature/Book/";
import Bookissue from "Feature/BookIssue";

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Mainlayout />}>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Category/*" element={<Category />} />
            <Route path="/Member/*" element={<Member />} />
            <Route path="/Book/*" element={<Book />} />
            <Route path="/BookIssue/*" element={<Bookissue />} />
          </Route>
        </Routes>
    </>
  );
}

export default App;
