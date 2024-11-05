import { useState } from 'react';
import axios from 'axios';
import './UpdateForm.css';

function UpdateProductForm({ product, close, refreshProducts }) {
  const [formData, setFormData] = useState({
    productName: product.productName || '',
    brand: product.brand || '',
    quantity: product.quantity || '',
    purchasePrice: product.purchasePrice || '',
    sellingPrice: product.sellingPrice || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/product/updateProduct/${product._id}`, formData, { withCredentials: true})
      refreshProducts(); 
      close(); 
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="flexCol update-form">
      <div className="form-group">
        <div className="form-field">
          <label>Product Name</label>
          <input type="text" name="productName" value={formData.productName} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Brand</label>
          <input type="text" name="brand" value={formData.brand} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Quantity</label>
          <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} />
        </div>
        <div className="flex gap form-field-pricing">
          <div className="form-field">
            <label>Purchase Price</label>
            <input type="text" name="purchasePrice" value={formData.purchasePrice} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label>Selling Price</label>
            <input type="text" name="sellingPrice" value={formData.sellingPrice} onChange={handleChange} />
          </div>
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={close}>Cancel</button>
        <button className="btn-save" type="submit">Save Changes</button>
      </div>
    </form>
  );
}

export default UpdateProductForm;
