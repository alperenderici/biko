import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MachinePage from "./pages/machine_page/machine_page";
import FileList from "./pages/file_list/file_list";
import ViewPage from "./pages/pdf/view_page";


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/machines/:machineId" element={<MachinePage/>}/>
                <Route path="/folders/:folderId" element={<FileList/>}/>
                <Route path="/pdf/:fileId" element={<ViewPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App/>);

