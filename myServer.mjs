import express from 'express';

const PORT = 3000;
const app = express();
app.use(express.json());

const users = [
  { id: 1, name: 'Hassaan', email: '1234hassaan@gmail.com' },
  { id: 2, name: 'Ali', email: 'ali@gmail.com' },
];

// GET all users
app.get('/api/users', (req, res) => {
  res.status(200).json({ message: 'Get Request - Get all users', users });
});

// POST (Create) a new user
app.post('/api/users', (req, res) => {
  const newUser = { id: users.length + 1, ...req.body }; // Assign an ID
  users.push(newUser); // Add the new user to the list
  res.status(201).json({ message: 'Post Request - User created', newUser });
});

// PUT (Update) an existing user by ID
app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    const updatedUser = { ...users[userIndex], ...req.body }; // Merge existing data with new data
    users[userIndex] = updatedUser; // Update the user
    res.status(200).json({
      message: `Update Request - User with ID ${userId} updated`,
      updatedUser,
    });
  } else {
    res.status(404).json({ message: `User with ID ${userId} not found` });
  }
});

// DELETE a user by ID
app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    users.splice(userIndex, 1); // Remove the user from the array
    res.status(200).json({ message: `Delete Request - User with ID ${userId} deleted` });
  } else {
    res.status(404).json({ message: `User with ID ${userId} not found` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
