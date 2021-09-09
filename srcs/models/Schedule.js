import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
    count: { type:Number, required:true },
    date: { type:String, required:true },
    text: { type:String, required:true, trim:true },
})

const Schedule = mongoose.model("Schedule", scheduleSchema);
export default Schedule;