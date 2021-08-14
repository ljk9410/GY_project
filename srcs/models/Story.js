import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    fileUrl: [{ type:String, required:true }],
    title: { type:String, required:true, trim:true },
    desc: { type:String, required:true, trim:true },
    createdAt: { type:Date, required:true, default:Date.now },
    views: { type:Number, default: 0, required:true }
});

storySchema.static('filePath', function(files) {
    let paths = [];

    for (let i = 0; i < files.length; i++) {
        paths.push(files[i].path);
    }
    
    return paths;
})

const Story = mongoose.model("Story", storySchema);

export default Story;