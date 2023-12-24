import React, { useState, useEffect } from 'react';
import ImageForm from './components/ImageForm';

const App = () => {
  const [userId, setUserId] = useState(120); // Set your hardcoded userId
  const [userImages, setUserImages] = useState([]);

  const uploadImage = async (formData) => {
    try {
      // Append userId to formData
      formData.append('userId', userId);

      const response = await fetch('http://localhost:5000/api/uploadImage', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Image uploaded successfully.....');
        // After uploading, fetch the updated list of images
        fetchUserImages();
      } else {
        console.error('Failed to upload image.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const fetchUserImages = async () => {
    try {
      console.log(userId);
      const response = await fetch('http://localhost:5000/api/viewGallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId})
      });
      if (response.ok) {
        const data = await response.json();
        setUserImages(data.images);
      } else {
        console.error('Failed to fetch user images.');
      }
    } catch (error) {
      console.error('Error fetching user images:', error);
    }
  };

  // Fetch user images when the component mounts
  useEffect(() => {
    if (userId) {
      fetchUserImages();
    }
  }, [userId]);

  return (
    <div>
  <h1>React Frontend</h1>
  <ImageForm uploadImage={uploadImage} />
  <div>
    <h2>User Images</h2>
    <ul>
      {userImages.map((image) => (
        <li key={image._id}>
          <img src={`data:image/jpeg;base64,${image.data}`} />
        </li>
      ))}
    </ul>
  </div>
</div>

  );
};

export default App;
