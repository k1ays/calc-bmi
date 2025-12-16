const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Route: GET /
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/calculate-bmi", (req, res) => {
  const weight = Number(req.body.weight);
  let height = Number(req.body.height);

   if (height > 10) {
    height = height / 100; // см → м
  }

  console.log(req.body); 

  if (!weight || !height || weight <= 0 || height <= 0) {
    return res.send("Invalid input. <a href='/'>Go back</a>");
  }

  const bmi = weight / (height * height);

  let category = "";
  let color = "";

  if (bmi < 18.5) {
    category = "Underweight";
    color = "blue";
  } else if (bmi < 24.9) {
    category = "Normal weight";
    color = "green";
  } else if (bmi < 29.9) {
    category = "Overweight";
    color = "orange";
  } else {
    category = "Obese";
    color = "red";
  }

  res.send(`
    <h1>BMI Result</h1>
    <h2 style="color:${color}">
      Your BMI: ${bmi.toFixed(2)} <br>
      Category: ${category}
    </h2>
    <a href="/">Calculate Again</a>
  `);
});

// Server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
