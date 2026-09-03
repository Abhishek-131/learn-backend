const dotenv = require('dotenv')
dotenv.config();

const app = require('./src/app');
const connectDB = require('./src/config/db')

const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    connectDB();
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();