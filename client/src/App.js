import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Dashboard from './pages/dashboard/dashboard';
import backgroundImage from './images/background-image.jpg';
import bannerImage from './images/banner-image.jpg';
import tripImage from './images/new-york-trip-image.jpeg';
import PlanDetails from './pages/planDetails/planDetails';
import DestinationDetails from './pages/destinationDetails/destinationDetails';
import defaultImage from './images/default-image.jpg';

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
    element: <Dashboard banner={bannerImage} tripImage={defaultImage} />,
  },
  {
    path: '/planDetails',
    element: <PlanDetails banner={bannerImage} tripImage={defaultImage} />,
  },
  {
    path: '/destinationDetails',
    element: (
      <DestinationDetails banner={bannerImage} tripImage={defaultImage} />
    ),
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
