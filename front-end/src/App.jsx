import { Routes, Route } from "react-router";
import HomePage from './Pages/HomePage'
import CreatePage from './Pages/CreatePage'
import DetailPage from './Pages/DetailPage'

import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div data-theme="coffee" className="relative min-h-screen w-full ">
      <div className="pointer-events-none z-50 fixed bottom-0 left-0 w-full h-40 
        bg-gradient-to-t from-amber-950/40 to-amber-800/20 blur-2xl">
      </div>

      <Routes>
        <Route path ="/" element={<HomePage/>}/>
        <Route path ="/create" element={<CreatePage/>}/>
        <Route path ="/note/:id" element={<DetailPage/>}/>
      </Routes>
    </div>
  );
};
export default App;