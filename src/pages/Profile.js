import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Profile</h2>
      <p><strong>Username:</strong> {user?.username}</p>
      <p><strong>Role:</strong> {user?.role}</p>
    </div>
  );
};

export default Profile;
