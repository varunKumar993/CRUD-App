import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

import "./App.css";
import { db } from "./firebase";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

function App() {  
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState();
  const [users, setUsers] = useState([]);

  const userCollectionRef = collection(db, "Crud-Data");

  // Function to fetch users
  const getUsers = async () => {
    const data = await getDocs(userCollectionRef);
    setUsers(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  // Function to create a new user
  const createUser = async () => {
    await addDoc(userCollectionRef, { name: newName, age: Number(newAge) });
    setNewName("");
    setNewAge(0);
    getUsers(); // Refresh the user list
  };

  // Function to update a user's age
  const updateUser = async (id) => {
    const newlyAge = prompt("Enter the new age:");
    const newlName = prompt("Enter the new Name:");

    const docRef = doc(db, "Crud-Data", id);
    // const newField = { age: Number{newlyAge} };
    await updateDoc(docRef, { age: Number(newlyAge), name: newlName });
    getUsers(); // Refresh the user list
  };
  // Function to delete a user's age
  const deleteUser = async (id) => {
    const docRef = doc(db, "Crud-Data", id);
    await deleteDoc(docRef);
    getUsers(); // Refresh the user list
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container ">
      <h1 className="text-center mb-4">CRUD App</h1>
      <div className="form-floating mb-3">
        <input
          type="name"
          className="form-control"
          value={newName}
          placeholder="name@example.com"
          onChange={(e) => setNewName(e.target.value)}
        />
        <label>Name</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="name@example.com"
          onChange={(e) => setNewAge(e.target.value)}
        />
        <label>Age</label>
      </div>

      <button className="btn btn-primary w-100" onClick={createUser}>
        Create
      </button>
      <div className="card text-center">
        <h3 className="text-center p-3">Users List</h3>
        <div className="list-group">
          {users.map((cdata) => (
            <div
              key={cdata.id}
              className="list-group-item d-flex justify-content-between align-items-center "
            >
              <h2 className="list-group d-flex justify-content-between align-items-center">
                Name: {cdata.name}
              </h2>
              <h2 className="list-group d-flex justify-content-between align-items-center">
                Age: {cdata.age}
              </h2>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => updateUser(cdata.id, cdata.age)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm "
                onClick={() => deleteUser(cdata.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
