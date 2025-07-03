// const mongoose = require('mongoose');
// const connectDB = async () => {
  
//   try {
//     mongoose.set('strictQuery', false);
//     const conn = await mongoose.connect(process.env.MONGODB_URI,{
//       useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 30000 
//     });
//     console.log(`Database Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.log(error);
//   }

// }

// module.exports = connectDB;

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false); // optional but okay to keep
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000, // optional timeout for cluster connection
    });
    console.log(`✅ Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
};

module.exports = connectDB;
