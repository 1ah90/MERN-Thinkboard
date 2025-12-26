import mongoose from "mongoose"

// connection with data base 
const connectDB = async () =>{
  try {
    await mongoose.connect(process.env.MONGOOSE_URI)
    console.log("successefully connect to database")
  } catch(error){
    console.log(`Somthing wronge happend with connecttion ${error}`)
    process.exit(1)
  }
}

export default connectDB