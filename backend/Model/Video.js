const { Schema, model } = require("mongoose")

const VideoSchema = new Schema({
    channelId: { type: String, required: true },
    channelName: { type: String },
    subscriberCount: { type: Number },
    videoId: { type: String, required: true },
    videoViews: { type: Number, required: true },
    videoTitle: { type: String, required: true },
    likeCount: { type: Number, required: true },
    commentCount: { type: Number, required: true },
    publishedAt: { type: String, required: true },
    earnings: { type: Number, required: true }
})
const Video = model('Video', VideoSchema)
module.exports = Video;
