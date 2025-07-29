import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

 
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

 
const fullName = "drishti_monga_04112003";
const email = "drishti1550.be22@chitkara.edu.in";
const rollNumber = "2210991550";

 
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    let concat_alpha = [];

    data.forEach((item) => {
      if (/^\d+$/.test(item)) {
        const num = parseInt(item);
        if (num % 2 === 0) even_numbers.push(item.toString());
        else odd_numbers.push(item.toString());
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        concat_alpha.push(item);
      } else {
        special_characters.push(item);
      }
    });

    const reversedConcat = concat_alpha.join("").split("").reverse();
    const alternatingCaps = reversedConcat
      .map((char, idx) =>
        idx % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
      )
      .join("");

    res.status(200).json({
      is_success: true,
      user_id: fullName,
      email: email,
      roll_number: rollNumber,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string: alternatingCaps,
    });
  } catch (err) {
    res.status(500).json({ is_success: false, error: err.message });
  }
});

 
app.get("/", (req, res) => {
  res.send("API is working. Use POST /bfhl or open /public/index.html.");
});

 
app.use((req, res) => {
  res.status(404).send("Route not found");
});

 
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
