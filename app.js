const express = require("express");
const xlsx = require("xlsx");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, "host")));

const excelFilePath = "./data.xlsx";

app.get("/data", (req, res) => {
  try {
    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = "Sheet1";
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    res.json(sheetData);
  } catch (error) {
    console.error("Error reading the Excel file:", error);
    res.status(500).json({ error: "Failed to read the Excel file" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
