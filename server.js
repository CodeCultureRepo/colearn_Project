const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// MongoDB connection string
const uri = 'mongodb+srv://abigailsampson203:CqhBC8UAPUWXeoih@colearn.tedxzft.mongodb.net/?retryWrites=true&w=majority&appName=CoLearn';

// Create a MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
client.connect(err => {
  if (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
  console.log('Connected to MongoDB');

  // Example: Get a reference to the database and collection
  const db = client.db('yourDatabaseName'); // replace 'yourDatabaseName' with the actual database name
  const collection = db.collection('yourCollectionName'); // replace 'yourCollectionName' with the actual collection name

  // GET endpoint to retrieve user credentials
  app.get('/credentials', (req, res) => {
    res.json({
      username: 'sampleUser',
      password: 'samplePassword'
    });
  });

  // POST endpoint to collect information
  app.post('/collect', (req, res) => {
    res.json({
      message: 'Information has been collected'
    });
  });

  // Add a route for the root URL
  app.get('/', (req, res) => {
    res.send('Welcome to the Simple API. Navigate to /api-docs for API documentation.');
  });

  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
