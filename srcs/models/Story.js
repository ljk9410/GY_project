import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    fileUrl: [{ type:String, required:true }],
    title: { type:String, required:true, trim:true },
    desc: { type:String, required:true, trim:true },
    createdAt: { type:Date, required:true, default:Date.now },
});

storySchema.static('fileLocation', function(files) {
    let locations = [];

    for (let i = 0; i < files.length; i++) {
        locations.push(files[i].location);
    }
    
    return locations;
})

const Story = mongoose.model("Story", storySchema);

export default Story;