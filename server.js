const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const connection = mysql.createConnection({
    host: 'mydb.crffexjvw2c8.us-east-1.rds.amazonaws.com',
    user: 'root',
    password: '1342441g',
    database: 'portfolio'
});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the database');
});

const app = express();
const port = 5000;
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Create a project
app.post('/projects', (req, res) => {
  const { project_name, project_description, github_link, project_url } = req.body;
  const query = 'INSERT INTO projects (project_name, project_description, github_link, project_url) VALUES (?, ?, ?, ?)';
  connection.query(query, [project_name, project_description, github_link, project_url], (err, results) => {
    if (err) {
      console.error('Error creating project: ', err);
      res.status(500).send('Error creating project');
    } else {
      res.status(201).send('Project created successfully');
    }
  });
});

// Get all projects
app.get('/projects', (req, res) => {
  const query = 'SELECT * FROM projects';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving projects: ', err);
      res.status(500).send('Error retrieving projects');
    } else {
      res.status(200).json(results);
    }
  });
});

// Delete a project
app.delete('/projects/:id', (req, res) => {
  const projectId = req.params.id;
  const query = 'DELETE FROM projects WHERE id = ?';
  connection.query(query, [projectId], (err, results) => {
    if (err) {
      console.error('Error deleting project: ', err);
      res.status(500).send('Error deleting project');
    } else if (results.affectedRows === 0) {
      res.status(404).send('Project not found');
    } else {
      res.status(200).send('Project deleted successfully');
    }
  });
});





app.post('/education-background', (req, res) => {
  const { Year, SchoolOrCollege, EducationDetails, Percentage } = req.body;
  const query = 'INSERT INTO EducationBackground (Year, SchoolOrCollege, EducationDetails, Percentage) VALUES (?, ?, ?, ?)';
  connection.query(query, [Year, SchoolOrCollege, EducationDetails, Percentage], (err, result) => {
    if (err) {
      console.error('Error creating education background: ', err);
      res.status(500).json({ error: 'Error creating education background' });
    } else {
      res.status(201).json({ message: 'Education background created successfully' });
    }
  });
});

// DELETE endpoint to delete an education background by ID
app.delete('/education-background/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM EducationBackground WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting education background: ', err);
      res.status(500).json({ error: 'Error deleting education background' });
    } else {
      res.json({ message: 'Education background deleted successfully' });
    }
  });
});

// GET endpoint to retrieve all education backgrounds
app.get('/education-background', (req, res) => {
  const query = 'SELECT * FROM EducationBackground';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving education backgrounds: ', err);
      res.status(500).json({ error: 'Error retrieving education backgrounds' });
    } else {
      res.json(results);
    }
  });
});





app.post('/skills', (req, res) => {
  const { svg, skillname } = req.body;
  const query = 'INSERT INTO skill (svg, skillname) VALUES (?, ?)';
  connection.query(query, [svg, skillname], (err, result) => {
    if (err) {
      console.error('Error creating skill: ', err);
      res.status(500).json({ error: 'Error creating skill' });
    } else {
      res.status(201).json({ message: 'Skill created successfully' });
    }
  });
});

// DELETE endpoint to delete a skill by ID
app.delete('/skills/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM skill WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting skill: ', err);
      res.status(500).json({ error: 'Error deleting skill' });
    } else {
      res.json({ message: 'Skill deleted successfully' });
    }
  });
});

// GET endpoint to retrieve all skills
app.get('/skills', (req, res) => {
  const query = 'SELECT * FROM skill';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving skills: ', err);
      res.status(500).json({ error: 'Error retrieving skills' });
    } else {
      res.json(results);
    }
  });
});





// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
