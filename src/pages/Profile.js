import React from 'react';

const Profile = () => {
  // Get user details from localStorage
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  if (!user) {
    return <h2 className="text-center">No user data available. Please login.</h2>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">User Profile</h2>
      <div className="card mx-auto mt-3" style={{ width: "350px" }}>
        {user.profilePicture && (
          <img src={user.profilePicture} className="card-img-top" alt="Profile" />
        )}
        <div className="card-body text-center">
          <h5 className="card-title">{user.name}</h5>
          <p className="card-text"><strong>Email:</strong> {user.email}</p>
          <p className="card-text"><strong>Role:</strong> {user.role || "User"}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
