import React, { useEffect, useState } from "react";
import axios from "axios";
import { SketchPicker } from "react-color";

const Settings = ({ setBackground }) => {
  const [color, setColor] = useState("#ffffff");
  const API = process.env.REACT_APP_API_URL || "http://localhost:3010";

  useEffect(() => {
    axios.get(`${API}/color`)
      .then(res => setColor(res.data.backgroundColor))
      .catch(err => console.error(err));
  }, []);

  const handleChangeComplete = (newColor) => {
    setColor(newColor.hex);
  };

  const saveColor = async () => {
    try {
      await axios.post(`${API}/color`, { backgroundColor: color });
      setBackground(color); // update App background
      alert("Color changed successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save color.");
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Pick a Background Color</h2>
      <div style={{ display: 'inline-block', margin: '1rem' }}>
        <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
      </div>
      <div>
        <button onClick={saveColor} style={styles.button}>Save Color</button>
      </div>
    </div>
  );
};

const styles = {
  button: {
    padding: '10px 20px',
    marginTop: '15px',
    backgroundColor: '#4a90e2',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default Settings;
