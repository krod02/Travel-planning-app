import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/login/login';
import Register from './pages/register/register';
import backgroundImage from './images/background-image.jpg';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login background={backgroundImage} />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/home',
    element: <div>This is the home page</div>,
  },
]);

function App() {
  return (
    <div className='App'>
      <div className='container'>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
