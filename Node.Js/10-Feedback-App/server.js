const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Create the "temp" and "feedback" directories if they don't exist
async function createDirectories() {
  const tempDir = path.join(__dirname, 'temp');
  const feedbackDir = path.join(__dirname, 'feedback');

  try {
    await fs.mkdir(tempDir, { recursive: true });
    await fs.mkdir(feedbackDir, { recursive: true });
  } catch (err) {
    console.error(err);
  }
}

createDirectories();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use('/feedback', express.static('feedback'));

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'pages', 'feedback.html');
  res.sendFile(filePath);
});

app.get('/exists', (req, res) => {
  const filePath = path.join(__dirname, 'pages', 'exists.html');
  res.sendFile(filePath);
});

app.post('/create', async (req, res) => {
  try {
    const title = req.body.title;
    const content = req.body.text;

    const adjTitle = title.toLowerCase();

    const tempFilePath = path.join(__dirname, 'temp', adjTitle + '.txt');
    const finalFilePath = path.join(__dirname, 'feedback', adjTitle + '.txt');

    await fs.writeFile(tempFilePath, content);
    try {
      await fs.access(finalFilePath);
      res.redirect('/exists');
    } catch (err) {
      await fs.rename(tempFilePath, finalFilePath);
      res.redirect('/');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(80);
