// app.js
const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware for parsing JSON and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

// Generate PDF document on POST request
app.post('/generate-document', (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        console.log('Missing title or content');
        return res.status(400).send('Missing title or content');
    }

    console.log('Generating document:', title);

    // Create a new PDF document
    const doc = new PDFDocument();

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${title}.pdf`);

    // Pipe the PDF to the response
    doc.pipe(res);

    // Add content to the PDF
    doc.fontSize(18).text(title, { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(content);

    // Finalize the PDF and end the response
    doc.end();

    console.log('PDF generated and sent');
});

// Home route to render the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

