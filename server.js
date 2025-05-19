import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Starta servern
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// Middleware

function validateLogin(req, res, next) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(req.body.email && req.body.email != "")
  {
    if (!emailRegex.test(req.body.email))
    {
      res.status(400).send("The email address you entered is not a valid email");
    }
  }
  else
  {
    res.status(400).send("You need to enter an email");
  }

  if(req.body.password && req.body.password != "")
  {
    if(req.body.password.length <= 6)
    {
      res.status(400).send("Password is invalid (it needs to be at least 6 characters)");
    }
  }
  else
  {
    res.status(400).send("You need to enter a password");
  }

  next();
}


app.post('/login', validateLogin, (req, res) => {
  res.send("request is valid");
});