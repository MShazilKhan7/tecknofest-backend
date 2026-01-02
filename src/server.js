const app = require('./app');
const env = require('./config/env');
const prisma = require('./utils/prisma');

const PORT = env.PORT || 5000;

async function startServer() {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('Successfully connected to PostgreSQL database');

    app.listen(PORT, () => {
      console.log(`Server running in ${env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
}

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
