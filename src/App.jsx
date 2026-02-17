import Login from "./components/frontend/Login.jsx";
import ForgotPassword from "./components/frontend/ForgotPass.jsx";
import Signup from "./components/frontend/SignUp.jsx";
import DeleteUpdate from "./components/frontend/Delete_Update.jsx";
import Dashboard from "./components/frontend/Dashboard.jsx";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Wrapper from "./components/frontend/Wrapper.jsx";

export default function App() {
    return (
        <Routes>
            <Route
                path='/'
                element={<Wrapper children={<Login />}></Wrapper>}
            />
            <Route
                path='/forgot'
                element={<Wrapper children={<ForgotPassword />}></Wrapper>}
            />
            <Route
                path='/signup'
                element={<Wrapper children={<Signup />}></Wrapper>}
            />
            <Route
                path='/manage'
                element={<Wrapper children={<DeleteUpdate />}></Wrapper>}
            />
            <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
    );
}

// import { useState } from "react";
// import Login from "./Login";
// import ForgotPassword from "./ForgotPass.jsx";
// import "./App.css";
// import image from "/Login-amico.svg"

// export default function App() {
//   const [screen, setScreen] = useState("login");

//   return (
//     <div className="app-wrapper">
//       <div className="left-panel">
//          <img
//           src= {image}
//           alt="Login Illustration"
//         />
//       </div>

//       <div className="right-panel">
//         {screen === "login" && (
//           <Login onForgot={() => setScreen("forgot")} />
//         )}

//         {screen === "forgot" && (
//           <ForgotPassword onBack={() => setScreen("login")} />
//         )}
//       </div>
//     </div>
//   );
// }
