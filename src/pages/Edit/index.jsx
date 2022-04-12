import Input from "../../components/Input";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

function Edit() {
  const [products, setProducts] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState("");
  const { id } = useParams();
  const history = useHistory();

  const [nameError, setNameError] = useState({});
  const [priceError, setPriceError] = useState({});
  const [stockError, setStockError] = useState({});
  const [imageError, setImageError] = useState({});

  const PRODUCT_API = `http://localhost:3000/api/v4/product/${id}`;

  useEffect(() => {
    getProducts(PRODUCT_API);
  }, [PRODUCT_API]);

  const handleChangeStatus = () => {
    setStatus(!status);
  };

  const getProducts = async (API) => {
    const res = await axios.get(API);
    const products = res.data;
    setProducts(products);
    setName(products.name);
    setPrice(products.price);
    setStock(products.stock);
    setStatus(products.status);
    //console.log(products);
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if (isValid) {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("status", status);
      formData.append("image", image);
      axios
        .put(`http://localhost:3000/api/v4/product/${id}`, formData)
        .then((response) => {
          alert('Data berhasil diubah')
          history.push("/");
        });
    }
  };

  const formValidation = () => {
    const nameError = {};
    const priceError = {};
    const stockError = {};
    const imageError = {};
    let isValid = true;

    if (name.length === 0) {
      nameError.nameNull = "Nama Tidak boleh kosong";
      isValid = false;
    }

    if (price.length === 0) {
      priceError.priceNull = "Harga Tidak boleh kosong";
      isValid = false;
    }

    if (stock.length === 0) {
      stockError.stockNull = "Stock Tidak boleh kosong";
      isValid = false;
    }

    if (image.length === 0) {
      imageError.imageNull = "Image Tidak boleh kosong";
      isValid = false;
    }

    setNameError(nameError);
    setPriceError(priceError);
    setStockError(stockError);
    setImageError(imageError);
    return isValid;
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input
            label="Nama"
            name="name"
            type="text"
            placeholder="Nama Laptop"
            defaultValue={products.name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          {Object.keys(nameError).map((key) => {
            return <div className="invalid">*{nameError[key]}</div>;
          })}
          <Input
            label="Harga"
            type="number"
            placeholder="Harga Laptop"
            defaultValue={products.price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
          {Object.keys(priceError).map((key) => {
            return <div className="invalid">*{priceError[key]}</div>;
          })}
          <Input
            label="Stock"
            type="number"
            placeholder="Stock Laptop"
            defaultValue={products.stock}
            onChange={(event) => {
              setStock(event.target.value);
            }}
          />
          {Object.keys(stockError).map((key) => {
            return <div className="invalid">*{stockError[key]}</div>;
          })}
          <Input
            type="checkbox"
            checked={status}
            onChange={handleChangeStatus}
            label="Active"
          />
          <Input
            label="Image"
            type="file"
            name="file"
            defaultValue={products.image_url}
            onChange={handleFileChange}
          />
          {Object.keys(imageError).map((key) => {
            return <div className="invalid">*{imageError[key]}</div>;
          })}
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}

export default Edit;
