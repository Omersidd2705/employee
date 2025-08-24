import React, { useState } from "react";

function App() {
  const [empId, setEmpId] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/api/employees/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ empId, name }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ message: "Server Error. Try again later." });
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: "50px", fontFamily: "Arial" }}>
      <h2>Employee Search</h2>

      <input
        type="text"
        placeholder="Enter Employee ID"
        value={empId}
        onChange={(e) => setEmpId(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>

      <div style={{ marginTop: "20px" }}>
        {result && result.message ? (
          <p>{result.message}</p>
        ) : result ? (
          <div>
            <p><b>Employee ID:</b> {result.empId}</p>
            <p><b>Name:</b> {result.name}</p>
            <p><b>salary</b> {result.salary}</p>
            <p><b>role:</b> {result.role}</p>
            <p><b>age</b> {result.age}</p>
            <p><b>height:</b> {result.height}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
