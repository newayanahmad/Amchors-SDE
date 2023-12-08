const express = require('express');
const cors = require('cors');
const app = express();
const Video = require('./Model/Video')
const connectToDatabase = require("./connect")

const { google } = require('googleapis');
const sendCallbackRequestEmail = require('./sendMail');
const port = 3000;

require('dotenv').config({ path: __dirname + '/.env.local' });
require("dotenv").config()
// Enable CORS
app.use(cors());

console.log(process.env.MONGODB_CONNECTION_URI)

// Parse JSON bodies
app.use(express.json());

connectToDatabase();

const youtube = google.youtube("v3")

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

function calculateEarnings(subscriberCount, views, comments, likes) {
    let earnings = Math.min(subscriberCount, views) + 10 * comments + 5 * likes;
    return earnings;
}

const getVideoID = (url) => {
    let regex = /(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([^&=%\?]{11})/;
    let matches = url.match(regex);
    if (matches && matches[5]) {
        return matches[5];
    } else {
        return null;
    }
}



app.post('/api/video', async (req, res) => {
    const { link } = req.body
    console.log(link)
    if (!link) return res.json({ success: false, message: "No link found" })
    const videoId = getVideoID(link)
    if (!videoId) return res.json({ success: false, message: "Invalid video URL" })
    // const videoId = 'dQw4w9WgXcQ'
    const videoDetails = await youtube.videos.list({
        key: process.env.GC_API_KEY,
        id: videoId, // Replace with your video ID.
        part: 'snippet,statistics',
        type: 'video'
    });

    const channelId = videoDetails.data.items[0].snippet.channelId;
    if (!channelId) return res.json({ success: false, message: "No channel found" })

    const channelDetails = await youtube.channels.list({
        key: process.env.GC_API_KEY,
        id: channelId,
        part: "snippet,statistics"
    })

    // Fetching details
    const channelName = channelDetails.data.items[0].snippet.title;
    const subscriberCount = channelDetails.data.items[0].statistics.subscriberCount;
    const videoViews = channelDetails.data.items[0].statistics.viewCount;

    const videoTitle = videoDetails.data.items[0].snippet.title;
    const likeCount = videoDetails.data.items[0].statistics.likeCount;
    const commentCount = videoDetails.data.items[0].statistics.commentCount;
    const publishedAt = videoDetails.data.items[0].snippet.publishedAt;

    const earnings = calculateEarnings(subscriberCount, videoViews, commentCount, likeCount);

    const details = {
        channelId,
        channelName,
        subscriberCount: parseInt(subscriberCount), // Convert to integer if necessary
        videoId,
        videoTitle,
        videoViews: parseInt(videoViews), // Convert to integer if necessary
        likeCount: parseInt(likeCount), // Convert to integer if necessary
        commentCount: parseInt(commentCount), // Convert to integer if necessary
        publishedAt,
        earnings: parseInt(earnings) // Convert to integer if necessary
    };

    const v = await Video.findOne({ videoId: videoId })
    if (v) {
        const vi = Video.updateOne({ videoId: videoId }, { $set: details })
        return res.json({ details, id: v._id.toString(), success: true })
    }

    const video = Video(details)
    const d = await video.save()
    console.log(details)
    res.json({ details, id: d._id.toString(), success: true })
});

app.get('/api/get-videos', async (req, res) => {
    const videos = await Video.find({}).sort("-earnings")
    if (!videos) return res.json({ success: false, message: "No video found" })
    res.json({ success: true, videos })
})


app.post('/api/callback', async (req, res) => {
    const { name, number, preferredCallbackTime, additionalComments } = req.body;
    console.log(req.body)
    if (!name || !number) return res.json({ success: false, message: "Please provide name and contact number" })
    res.json({ success: true, message: "Callback request sent successfully" })
    await sendCallbackRequestEmail({ name, number, preferredCallbackTime, additionalComments });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
