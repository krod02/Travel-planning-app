import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Dashboard from './pages/dashboard/dashboard';
import backgroundImage from './images/background-image.jpg';
import bannerImage from './images/banner-image.jpeg';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login background={backgroundImage} />,
  },
  {
    path: '/register',
    element: <Register background={backgroundImage} />,
  },
  {
    path: '/dashboard',
    element: <Dashboard banner={bannerImage}/>,
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
