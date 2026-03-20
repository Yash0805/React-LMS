import { Navigate, Route, Routes } from "react-router";
import List from "./Pages/List";
import Create from "./Pages/Create";
import "primereact/resources/themes/lara-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function Member() {
    return (
        <Routes>
            <Route index element={<Navigate to="list" />} />
            <Route path="list" element={<List />} />
            <Route path="create" element={<Create />} />
        </Routes>
    );
}