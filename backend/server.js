require("dotenv").config();
const app = require("./src/app");
const connectToDatabase = require("./src/config/database");

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await connectToDatabase();
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

start();
