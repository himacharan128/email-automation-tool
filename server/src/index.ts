import app from './app';

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('*******************************');
  console.log('Server running on port ${PORT}');
  console.log('*******************************');
});
