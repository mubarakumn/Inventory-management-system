import axios from 'axios';
import './UpdateProduct.css'
import DataTable from 'react-data-table-component'
import { useEffect, useState } from 'react';
import ToggleMode from '../../Components/ToggleMode/ToggleMode';
import { BiEdit } from 'react-icons/bi';
import { MdDeleteSweep } from 'react-icons/md';
import Modal from '../../Components/Modal/Modal';
import UpdateFormProduct from '../../Components/UpdateForm/UpdateProductForm';
import { useUser } from '../../Context/UserContext';
import SideBar from '../../Components/SideBar/SideBar';
import { useNavigate } from 'react-router-dom';

const UpdateProduct = ({ mode, toggleMode }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalType, setModalType] = useState(null); // 'update' or 'delete'

  const navigate = useNavigate()

  const userData = useUser()
  useEffect(() => {
    fetchProducts();
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/product/getProduct", { withCredentials: true})
      if (response) {
        setProducts(response.data.response)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const openModal = (product, type) => {
    setSelectedProduct(product);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalType(null);
  };

  const handleDelete = async () => {
    if (selectedProduct) {
      try {
        await axios.delete(`http://localhost:4000/product/deleteProduct/${selectedProduct._id}`, { withCredentials: true});
        fetchProducts();
        closeModal();
      } catch (error) {
        console.error('Error deleting Product:', error);
      }
    }
  };


  const columns = [
    { name: 'Product Name', selector: row => row.productName, sortable: true, },
    { name: 'Quantity', selector: row => row.quantity, sortable: true, },
    {
      name: 'Actions',
      cell: row => (
        <div className='flex icons-container'>
          <BiEdit className='icon grn ' onClick={() => openModal(row, "update")} />
          <MdDeleteSweep className='icon red' onClick={() => openModal(row, "delete")} />
        </div>
      ),
    },
  ];


  return (
    <div className={!mode ? "dashboard-container" : "dashboard-container dashboard-container-dark"}>
      <SideBar role={userData.role} mode={mode} />
      <main className="main-content">
        <div className="main-heading">
          <div>
            <h1>Update Products</h1>
            <p>Here you can see an overview of your activities and manage settings.</p>
          </div>
          <ToggleMode ischecked={mode} handleMode={toggleMode} />
        </div>
        <button className='actionBtn' onClick={() => { navigate('/addProduct') }}>Add Product </button>
        <DataTable columns={columns} data={products} pagination />
        {modalType === 'delete' && (
          <Modal
            visible={!!selectedProduct}
            close={closeModal}
            modalHead={"Confirm"}
            onConfirm={handleDelete}
            message={`Are you sure you want to delete ${selectedProduct?.productName}?`}
          /> 
        )}
        {modalType === 'update' && (
          <Modal visible={!!selectedProduct} modalHead={"Update product details"} close={closeModal}>
            <UpdateFormProduct product={selectedProduct} close={closeModal} refreshProducts={fetchProducts} />
          </Modal>
        )}
      </main>
    </div>
  )
}

export default UpdateProduct