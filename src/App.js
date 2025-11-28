import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import OrderList from "./pages/OrderList";
import ProductList from "./pages/ProductList";
import Navbar from './components/Navbar';
import Layout from './layout/Layout';
import './App.css';

function App() {
  return (

    <BrowserRouter>
      <Layout>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/orderList" element={<OrderList />} />
        </Routes>
      </Layout>

    </BrowserRouter>
  );
}

export default App;
