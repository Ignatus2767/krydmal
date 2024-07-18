import express from 'express';
import path from 'path';
import userRoutes from './routes/userRoutes';
import reviewRoutes from './routes/reviewRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes); // Ensure this is correct

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/kojo.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
