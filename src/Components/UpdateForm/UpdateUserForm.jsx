import { useState } from 'react';
import axios from 'axios';
import './UpdateForm.css'

function UpdateUserForm({ user, close, refreshUsers }) {
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    password: user.password || '',
    role: user.role || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/user/updateUser/${user._id}`, formData, {withCredentials: true});
      refreshUsers();
      close();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="flex update-form">
      <div className="form-group">
        <div className="form-field">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label>Role:</label>
          <select name="role" id="" value={formData.role} onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={close}>Cancel</button>
          <button className="btn-save" type="submit">Save Changes</button>
        </div>
      </div>
    </form>
  );
}

export default UpdateUserForm;
