import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
    title: { type:String, required:true, trim: true },
    desc: { type:String, required:true, trim:true },
    createdAt: { type:Date, required:true, default:Date.now },
    views: { type:Number, default: 0, required:true }
    // hashtag는 고민
})

const Notice = mongoose.model("Notice", noticeSchema);
export default Notice;