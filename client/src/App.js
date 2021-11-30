import Header from "./components/Header/Header";
import Home from "./components/home/Home";
import DetailView from "./components/post/DetailView";
import CreateView from "./components/post/CreateView";
import UpdateView from "./components/post/UpdateView";
import SignUp from './components/Pages/SignUp';
import Login from './components/Pages/Login';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
function App() {
  return (
   <>
   <BrowserRouter>
   <Header/>
   <Routes>
     <Route path="/" element={<Home/>} />
     <Route path="/details/:id" element={<DetailView/>} />
     <Route path="/create" element={<CreateView/>} />
     <Route path="/update/:id" element={<UpdateView/>} />
     <Route exact path='/signup'  element={<SignUp/>}  />
        <Route exact path='/login'  element={<Login/>}  />
     </Routes>
  
   </BrowserRouter>
  
   </>
  );
}

export default App;
