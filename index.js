import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

 
const fullName = "Drishti Monga";
const email = "drishti1550.be22@chitkara.edu.in";
const rollNumber = "2210991550";

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    let concat_alpha = [];

    data.forEach(item => {
      if (!isNaN(item)) {
        const num = parseInt(item);
        if (num % 2 === 0) even_numbers.push(item);
        else odd_numbers.push(item);
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        concat_alpha.push(item);
      } else {
        special_characters.push(item);
      }
    });

     
    const reversedConcat = concat_alpha.join('').split('').reverse();
    const alternatingCaps = reversedConcat.map((char, idx) =>
      idx % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
    ).join('');

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
      concat_string: alternatingCaps
    });

  } catch (err) {
    res.status(500).json({ is_success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
