import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu"; // This is how we rename some named imports
import Cart from "./features/cart/Cart";
import CreateOrder , {action as createOrderAction} from "./features/order/CreateOrder";
import { loader as orderLoader } from "./features/order/Order";
import Order from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

const router = createBrowserRouter([
  {
    element: <AppLayout />, // AppLayout is the parent component of all the other components, hence no path is specified
    // Now, inside the AppLayout component, we can use the Outlet component to render the child components of the current route
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />, // showing the Error component inside the AppLayout component, Each of the error will bubble up to the *parent* route unless it is handled in the route itself.
      },
      { path: "/cart", element: <Cart /> },
      { path: "/order/new", element: <CreateOrder />, 
        action: createOrderAction // defining a form submission action, whenever there is a new submission on the route "/order/new" , the createOrderAction will be called
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        errorElement: <Error />,
        loader: orderLoader,
      }, // defining a route parameter
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
