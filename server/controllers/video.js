import Video from "../models/Video.js";
import { createError } from "../error.js";

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedVideo);
    } else {
      return next(createError(403, "You can update only your video!"));
    }
  } catch (err) {
    next(err);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("The video has been deleted.");
    } else {
      return next(createError(403, "You can delete only your video!"));
    }
  } catch (err) {
    next(err);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

export const getAllVideos = async (req, res, next) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const getAllVideosUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const videos = await Video.find({ userId: id });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json("The view has been increased.");
  } catch (err) {
    next(err);
  }
};

export const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;
    const list = await Promise.all(
      subscribedChannels.map(async (channelId) => {
        return await Video.find({ userId: channelId });
      })
    );

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const latestVideo = async (req, res, next) => {
  try {
    const latestVideos = await Video.find().sort({ createdAt: -1 }).limit(10);
    const categories = [
      ...new Set(latestVideos.map((video) => video.category)),
    ];
    res.status(200).json(categories[0]);
  } catch (err) {
    next(err);
  }
};

export const getAllVideoByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const videos = await Video.find({ category: category });
    res.json(videos);
  } catch (err) {
    console.error("Error finding videos by category:", err);
    res.status(500).json({ err: "Internal server error" });
    next(err);
  }
};

export const selectEmoji = async (req, res, next) => {
  try {
    const { emoji } = req.body;
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { selectedEmoji: emoji },
      { new: true }
    );
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

export const getSelectedEmoji = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json({ selectedEmoji: video.selectedEmoji });
  } catch (err) {
    next(err);
  }
};

export const checkPurchasedUsers = async (req, res, next) => {
  const videoId = req.params.videoId;
  const userId = req.params.userId;
  try {
    const video = await Video.findById(videoId);
    if (video.usersPurchased.includes(userId)) {
      // User has bought the video
      return res.status(200).json({ bought: true });
    } else {
      // User has not bought the video
      return res.status(200).json({ bought: false });
    }
  } catch (err) {
    next(err);
  }
};

export const buyVideo = async (req, res, next) => {
  const videoId = req.params.videoId;
  const userId = req.params.userId;
  try {
    const video = await Video.findById(videoId);
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { usersPurchased: userId },
    });
    return res.status(200).json({ video });
  } catch (err) {
    next(err);
  }
};
