import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "Feature/Dashboard/Index";
import Category from "./Feature/Category/";
import Member from "./Feature/Member/";
import Mainlayout from "./Layout/Mainlayout";
import BookList from "Feature/Book/List";
import BookissueList from "Feature/BookIssue/List";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainlayout />}>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Category/*" element={<Category />} />
            <Route path="/Member/*" element={<Member />} />
            <Route path="/BookList" element={<BookList />} />
            <Route path="/BookIssueList" element={<BookissueList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
