"use client";

import React, { useState, useEffect } from "react";

const DogImageFetcher = () => {
  const [dogImage, setDogImage] = useState();
  const [loading, setLoading] = useState(true);

  const fetchDogImage = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    if (data.status === "success") {
      setDogImage(data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDogImage();
  }, []);

  return (
    <div>
      <h1>Random Dog Image</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <img
          src={dogImage}
          alt="Random Dog"
          style={{ maxWidth: "400px", height: "auto" }}
        />
      )}
      <br />
      <button onClick={fetchDogImage} disabled={loading}>
        Fetch Another Dog
      </button>
    </div>
  );
};

export default DogImageFetcher;
