const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");
const Category = require("../models/category");
const User = require("../models/user");
const Podcast = require("../models/podcast");
const router = require("express").Router();



router.post("/add-podcast", authMiddleware, upload, async (req, res) => {
    try {
      const { title, description, category } = req.body;
      const frontImage = req.files["frontImage"] ? req.files["frontImage"][0].path : null;
      const audioFile = req.files["audioFile"] ? req.files["audioFile"][0].path : null;
  
      if (!title || !description || !category || !frontImage || !audioFile) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const { user } = req;
      const cat = await Category.findOne({ categoryName: category });
      if (!cat) {
        return res.status(400).json({ message: "Category not found" });
      }
  
      const newPodcast = new Podcast({
        title,
        description,
        category: cat._id,
        frontImage,
        audioFile,
        user: user._id,
      });
  
      await newPodcast.save();
      await Category.findByIdAndUpdate(cat._id, { $push: { podcasts: newPodcast._id } });
      await User.findByIdAndUpdate(user._id, { $push: { podcasts: newPodcast._id } });
  
      res.status(201).json({ message: "Podcast added successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to add podcast" });
    }
  });


router.post("/get-podcasts", async (req, res) => {
    try {
        const podcasts = await Podcast.find().populate("category").sort({ createdAt: -1 });
        res.status(200).json({ data: podcasts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.post("/get-user-podcasts", authMiddleware, async (req, res) => {
    try {
        const { user } = req;
        const userData = await User.findById(user._id)
            .populate({
                path: "podcasts",
                populate: { path: "category" },
            })
            .select("-password");

        if (userData && userData.podcasts) {
            userData.podcasts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        res.status(200).json({ data: userData.podcasts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/get-podcast/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const podcast = await Podcast.findById(id).populate("category");

        if (!podcast) {
            return res.status(404).json({ message: "Podcast not found" });
        }

        res.status(200).json({ data: podcast });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to get podcasts by category
router.post("/category/:cat", async (req, res) => {
    try {
        const { cat } = req.params;

        if (!cat) {
            return res.status(400).json({ message: "Category parameter is required." });
        }

        const categories = await Category.find({ categoryName: cat })
            .populate({ path: "podcasts", populate: { path: "category" } });

        if (!categories.length) {
            return res.status(404).json({ message: "No podcasts found for this category." });
        }

        const podcasts = categories.flatMap(category => category.podcasts);

        res.status(200).json({ data: podcasts });
    } catch (error) {
        console.error("Error fetching category data:", error);
        res.status(500).json({ message: "Failed to fetch category data." });
    }
});

module.exports = router;
