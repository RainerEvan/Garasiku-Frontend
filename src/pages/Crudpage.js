import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./Crudpage.css";

function CrudPage() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/items");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items", error);
    }
  };

  const handleAddItem = async () => {
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/items/${editId}`, { name, description });
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/api/items", { name, description });
      }
      setName("");
      setDescription("");
      fetchItems();
    } catch (error) {
      console.error("Error adding/updating item", error);
    }
  };

  const handleEditItem = (item) => {
    setName(item.name);
    setDescription(item.description);
    setEditId(item._id);
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      fetchItems();
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  return (
    <div className="crud-container">
      <motion.h1 className="title" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        Manage Items
      </motion.h1>

      <motion.div className="form-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="text" className="input" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <button onClick={handleAddItem} className="btn">{editId ? "Update" : "Add"}</button>
      </motion.div>

      <motion.table className="item-table" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <motion.tr key={item._id} whileHover={{ scale: 1.02 }}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td className="actions">
                <button onClick={() => handleEditItem(item)} className="edit-btn">Edit</button>
                <button onClick={() => handleDeleteItem(item._id)} className="delete-btn">Delete</button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  );
}

export default CrudPage;
