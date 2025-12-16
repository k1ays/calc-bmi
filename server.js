const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Route: GET /
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Route: POST /calculate-bmi
app.post("/calculate-bmi", (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  if (weight <= 0 || height <= 0 || isNaN(weight) || isNaN(height)) {
    return res.send("<h2>Invalid input. Please enter positive numbers.</h2><a href='/'>Go back</a>");
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
    <html>
      <head>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <div class="container">
          <h1>BMI Result</h1>
          <h2 style="color:${color}">
            Your BMI: ${bmi.toFixed(2)} <br>
            Category: ${category}
          </h2>
          <a href="/">Calculate Again</a>
        </div>
      </body>
    </html>
  `);
});

// Server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
