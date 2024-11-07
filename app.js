const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");

const apiKey = "4ea9716c26d1ab76dc3bd7b2acc132af";

// Set EJS as the template engine
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.json({ error: "Cityname is required" });
  }
  try {
    const resonse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${apiKey}&units=metric`
    );
    res.json(resonse.data);
  } catch (error) {
    res.json({ error: "City not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
