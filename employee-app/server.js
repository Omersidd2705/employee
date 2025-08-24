const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://mohdomer2705:mc8S8cefAy2kafms@cluster0.hym8mit.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Employee Schema (only two fields)
const employeeSchema = new mongoose.Schema({
  empId: { type: String, required: true },
  name: { type: String, required: true },
  salary: { type: Number, required: true },
  role: { type: String, required: true },
  age: { type: Number, required: true },
  height: { type: String, required: true },
});

// Force collection name = "shoaib"
const Employee = mongoose.model("Employee", employeeSchema, "shoaib");

// Search API (only check, not add)
app.post("/api/employees/search", async (req, res) => {
  try {
    const { empId, name } = req.body;

    let query = {};
    if (empId) query.empId = empId;
    if (name) query.name = name;

    const employee = await Employee.findOne(query);

    if (!employee) {
      return res.status(404).json({ message: "Not Available" });
    }

    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
