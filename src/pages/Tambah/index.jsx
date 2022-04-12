import { useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../components/Input";
import "./index.scss";
import axios from "axios";

function Tambah() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState(false);
  const [image, setImage] = useState("");
  const history = useHistory();

  const [nameError, setNameError] = useState({});
  const [priceError, setPriceError] = useState({});
  const [stockError, setStockError] = useState({});
  const [imageError, setImageError] = useState({});

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChangeStatus = () => {
    setStatus(!status);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if (isValid) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("status", status);
      formData.append("image", image);
      axios
        .post("http://localhost:3000/api/v4/product/", formData)
        .then((response) => {
          alert("Data berhasil ditambahkan");
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
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            type="text"
            placeholder="Nama Laptop"
            onChange={(event) => {
              setName(event.target.value);
            }}
            label="Nama"
          />
          {Object.keys(nameError).map((key) => {
            return <div className="invalid">*{nameError[key]}</div>;
          })}
          <Input
            type="number"
            placeholder="Harga Laptop"
            onChange={(event) => {
              setPrice(event.target.value);
            }}
            label="Harga"
          />
          {Object.keys(priceError).map((key) => {
            return <div className="invalid">*{priceError[key]}</div>;
          })}
          <Input
            type="number"
            placeholder="Stock Laptop"
            onChange={(event) => {
              setStock(event.target.value);
            }}
            label="Stock"
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
            type="file"
            name="file"
            placeholder="Image"
            onChange={handleFileChange}
            label="Gambar"
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

export default Tambah;
