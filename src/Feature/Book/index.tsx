import { Navigate, Route, Routes } from "react-router";
import List from "./Pages/List";
import Create from "./Pages/Create";
import Edit from "./Pages/Edit";


export default function Member() {
    return (
        <Routes>
            <Route index element={<Navigate to="list" />} />
            <Route path="list" element={<List />} />
            <Route path="create" element={<Create />} />
            <Route path="edit/:bookId" element={<Edit />} />
        </Routes>
    );
}