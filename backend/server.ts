import express from "express";
import cors from "cors";
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "DevPilot backend is running",
    });
});
app.post("/api/analyze", (req, res) => {
    const { repositoryUrl } = req.body;
    res.json({
        success: true,
        message: "Repository received",
        repositoryUrl: repositoryUrl,
    });
});

app.listen(PORT, () => {
    console.log(`DevPilot backend running on http://localhost:${PORT}`);
});