require("dotenv").config()
const app=require("./src/app")
const connectToDatabase=require("./src/config/database")


try {
    await connectToDatabase();
    console.log("Database connected successfully");
} catch (error) {
    console.error("Database connection failed:", error);
}


app.listen(3000,()=>{
    console.log("Server is running")
})