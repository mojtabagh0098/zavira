// cjs
const express = require('express');
const app = express();
app.use(express.json());
const neon = require('@neondatabase/serverless');
require('dotenv').config();

const authMiddleware = require('../middleware/auth');

const { swaggerUi, swaggerSpec } = require('./swagger.js');
// const swaggerDocument = require('../swagger.js');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// app.use(express.urlencoded({ extended: true }));
// app.use(express.bodyParser());

// api/index.js
app.get('/', authMiddleware, (req, res) => {
    res.json({
        "hello": "my dear"
    });
})
/**
 * @swagger
 * /contact-us:
 *   post:
 *     summary: Submit contact form and save User's data to the database
 *     tags:
 *       - Contact Form
 *     parameters:
 *       - name: name
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: phone
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: email
 *         in: path
 *         required: false
 *         schema:
 *           type: string
 *       - name: subject
 *         in: path
 *         required: false
 *         schema:
 *           type: string
 *       - name: description
 *         in: path
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Invalid request data
 */
app.post('/contact-us', authMiddleware, (req, res) => {
    const db = neon.neon(`${process.env.DATABASE_URL}`)
    const query = db.query('INSERT INTO public.forms (name, phone) VALUES ($1, $2)', [req.body.name, req.body.phone])
    query.then((data) => {
        // console.log(data);
        res.status(200).json({ "status": "success" });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ "error": "Your data is not valid. Please try again." });
    })
});
/**
 * @swagger
 * /all-forms:
 *   get:
 *     summary: Retrieve all contact forms from the database
 *     tags:
 *       - Contact Form
 *     responses:
 *       200:
 *         description: Contact forms data
 *       500:
 *         description: Not authorized to access this resource
 */
app.get('/all-forms', authMiddleware, (req, res) => {
    const db = neon.neon(`${process.env.DATABASE_URL}`)
    const query = db.query('SELECT * FROM public.forms')
    query.then((data) => {
        // console.log(data);
        res.status(200).json(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ "error": "You do not have access to this resource." });
    })
});

app.listen(process.env.PORT || 3000);
// api/index.js
module.exports = app