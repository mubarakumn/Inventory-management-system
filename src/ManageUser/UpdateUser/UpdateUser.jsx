import { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import Modal from '../../Components/Modal/Modal';
import ToggleMode from '../../Components/ToggleMode/ToggleMode';
import { FaUserEdit } from 'react-icons/fa';
import { AiOutlineUserDelete } from 'react-icons/ai';
import UpdateUserForm from '../../Components/UpdateForm/UpdateUserForm';
import { useUser } from '../../Context/UserContext';
import SideBar from '../../Components/SideBar/SideBar';
import { useNavigate } from 'react-router-dom';


function UpdateUser({ mode, toggleMode }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null); 

  const userData = useUser()

  const navigate = useNavigate()

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/user/getUsers', { withCredentials: true, });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const openModal = (user, type) => {
    setSelectedUser(user);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalType(null);
  };

  const handleDelete = async () => {
    if (selectedUser) {
      try {
        await axios.delete(`http://localhost:4000/user/deleteUser/${selectedUser._id}`, { withCredentials: true, });
        fetchUsers();
        closeModal();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const columns = [
    { name: 'User Name', selector: row => row.name, sortable: true },
    { name: 'Email', selector: row => row.email },
    {
      name: 'Actions',
      cell: row => (
        <div className='flex icons-container'>
          <FaUserEdit className='icon grn' onClick={() => openModal(row, 'update')} />
          <AiOutlineUserDelete className='icon red' onClick={() => openModal(row, 'delete')} />
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
            <div>
              <h1>Update Users</h1>
              <p>Here you can see an overview of your activities and manage settings.</p>
            </div>
            <button className='actionBtn' onClick={() => { navigate('/addUser') }}>Add User </button>
          </div>
          <ToggleMode ischecked={mode} handleMode={toggleMode} />
        </div>
        <DataTable columns={columns} data={users} pagination />
        {modalType === 'delete' && (
          <Modal
            visible={!!selectedUser}
            close={closeModal}
            modalHead="Confirm"
            onConfirm={handleDelete}
            message={`Are you sure you want to delete ${selectedUser?.name}?`}
          />
        )}
        {modalType === 'update' && (
          <Modal visible={!!selectedUser} modalHead="Update User" close={closeModal}>
            <UpdateUserForm user={selectedUser} close={closeModal} refreshUsers={fetchUsers} />
          </Modal>
        )}
      </main>
    </div>
  );
}

export default UpdateUser;
