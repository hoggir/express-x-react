import { Link } from "react-router-dom";
import "./index.scss";
import axios from "axios";
import { useEffect, useState } from "react";

const PRODUCT_API = "http://localhost:3000/api/v4/product";

function Home() {
  const [products, setProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getProducts(PRODUCT_API);
  }, []);

  const getProducts = async (API) => {
    await axios.get(API).then((res) => {
      const products = res.data;
      setProduct(products);
      //console.log(products);
    });
  };

  const deleteProduct = async (id) => {
    var yakin = window.confirm(
      `Apakah kamu yakin akan menghapus laptop ${id}?`
    );
    if (yakin) {
      await axios
        .delete(`http://localhost:3000/api/v4/product/${id}`)
        .then((res) => {
          if (res.status === 200) {
            alert("Berhasil dihapus");
            window.location.reload();
          }
        });
    } else {
      window.location.reload();
    }
  };

  const handleOnchange = (e) => {
    setSearchTerm(e.target.value);
    //console.log(searchTerm);
  };

  const handleonSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getProducts(`http://localhost:3000/api/v4/product?search=${searchTerm}`);

      setSearchTerm("");
    } else {
      getProducts(PRODUCT_API);
      alert("Tidak ada");
    }
  };

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">
        Tamah Produk
      </Link>
      <form onSubmit={handleonSubmit} className="search">
        
          <input
            type="search"
            placeholder="Masukan kata kunci..."
            value={searchTerm}
            onChange={handleOnchange}
          />
        
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td className="text-right">{product.price}</td>
              <td className="text-center">
                <Link
                  to={`/detail/${product._id}`}
                  className="btn btn-sm btn-info"
                >
                  Detail
                </Link>
                <Link
                  to={`/edit/${product._id}`}
                  className="btn btn-sm btn-warning"
                >
                  Edit
                </Link>
                <Link
                  to={"/"}
                  onClick={() => deleteProduct(product._id)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
