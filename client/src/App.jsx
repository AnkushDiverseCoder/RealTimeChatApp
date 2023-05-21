import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Join from './components/Join';
import Chat from './components/Chat';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Join/>,
  },
  {
    path: "/chat/:id",
    element: <Chat/>,
  },
]);

function App() {


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
