import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import './index.scss';
import axios from "axios";

function Detail(){

  const [products, setProducts] = useState('');
  const {id} = useParams();

  const PRODUCT_API = `http://localhost:3000/api/v4/product/${id}`;

  useEffect(() => {
    getProducts(PRODUCT_API);
  });

  const getProducts = async (API) => {
    await axios.get(API).then((res) => {
      const products = res.data;
      setProducts(products);
    });
  };

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>

      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>: {products._id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {products.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: {products.price}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {products.stock}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Detail;