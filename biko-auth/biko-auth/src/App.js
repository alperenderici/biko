// import {Route, Routes} from "react-router-dom";
// import LoginFormPage from "./pages/login_form_page";
// import MachinesListPage from "./pages/machine_list_page";
// import {Toaster} from 'react-hot-toast';
// import RegisterFormPage from "./pages/admin_page";

// function App() {
//   return (
//  <>
//     <Toaster position='top-right'/>
//       <Routes>
//         <Route path="/auth" element={<LoginFormPage />} />
//         <Route path="/machines" element={<MachinesListPage />} />
//         <Route path="/register" element={<RegisterFormPage />} />
//       </Routes>
//       </>
//   );
// }

// export default App;

import { Route, Routes } from "react-router-dom";
import LoginFormPage from "./pages/login_form_page";
import MachinesListPage from "./pages/machine_list_page";
import { Toaster } from 'react-hot-toast';
import RegisterFormPage from "./pages/admin_page";
import { AuthProvider } from "./pages/auth_provider";
import PrivateRoute from "./pages/private_route";



function App() {
  return (
    <AuthProvider>
       <Routes>
    <>
      <Toaster position='top-right' />
     
        <Route path="/auth" element={<LoginFormPage />} />
        <Route path="/machines" element={<MachinesListPage />} />
        <PrivateRoute path="/admin" element={<RegisterFormPage />} />
     
    </>
    </Routes>
  </AuthProvider>
  );
}

export default App;