import mongoose from "mongoose";
import env from "dotenv";


env.config()

const url = process.env.MONGOOSE_DB

if (!url) {
    console.error("MONGOOSE_DB environ variable is not defined");
    process.exit(1)
};

const dbConfig = async (): Promise<void> => {
    try {
        const connectDB = await mongoose.connect(url);
        console.log(`connected to database on port ${connectDB.connection.host}`);
    } catch (error) {
        console.log(`failed to connect to database`, error);
    }
}

export default dbConfig;