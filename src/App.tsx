import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import CategoryList from "./Feature/Category/List";
import MemberList from "./Feature/Member/List";
import Mainlayout from "./Layout/Mainlayout";
import BookList from "Feature/Book/List";
import BookissueList from "Feature/BookIssue/List";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainlayout />}>
            <Route path="/CategoryList" element={<CategoryList />} />
            <Route path="/MemberList" element={<MemberList />} />
            <Route path="/BookList" element={<BookList />} />
            <Route path="/BookIssueList" element={<BookissueList/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
