import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import Home from "./pages/Home";
import OrderList from "./pages/OrderList";
import ProductList from "./pages/ProductList";
import NotFound from "./pages/NotFound";
import Navbar from './components/Navbar';
import Layout from './layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const login = useSelector((state) => state.ui.login);

  return (

    <BrowserRouter>
      <Layout>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productList" element={<ProtectedRoute element={<ProductList />} />} />
          <Route path="/orderList" element={<ProtectedRoute element={<OrderList />} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>

    </BrowserRouter>
  );
}

export default App;
