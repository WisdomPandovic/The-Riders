"use client";
import React, { useState, useEffect } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data);
        console.log("Fetched Users:", data); // Log fetched data
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array to fetch users only once on component mount

  useEffect(() => {
    console.log("Users State:", users); // Log users state whenever it changes
  }, [users]); // Log whenever users state changes

  return (
    <div className="width80">
      <h3 className="table-header">All Users</h3>
      {users.length > 0 ? (
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No user found.</p>
      )}
    </div>
  );
};

export default UserList;
