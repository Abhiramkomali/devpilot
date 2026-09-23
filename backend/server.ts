import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "DevPilot backend is runnnig",
    });
});

app.post("/api/analyze", async (req, res) => {
    try {
        const { repositoryUrl } = req.body;

        if (!repositoryUrl) {
            return res.status(400).json({
                success: false,
                message: "Repository URL is required",
            });
        }
        
//validate GitHub URL
let githubUrl: URL;

try {
    githubUrl = new URL(repositoryUrl);
} catch {
    return res.status(400).json({
        success: false,
        message: "Invalid repository URL",
    });
}

if (githubUrl.hostname !== "github.com") {
    return res.status(400).json({
        success: false,
        message: "Please provide a GitHub repository URL",
    });
}

// Extract owner and repository name
const pathParts = githubUrl.pathname
    .split("/")
    .filter((part) => part.length > 0);

if (pathParts.length < 2) {
    return res.status(400).json({
        success: false,
        message: "Invalid GitHUb repository URL",
    });
}

const owner = pathParts[0];
const repo = pathParts[1].replace(".git", "");

console.log(`Analyzing repository: ${owner}/${repo}`);

// 
//Step 1: Get repository information
//

const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}`;

console.log("GitHub API URL:", githubApiUrl);
const githubResponse = await fetch(githubApiUrl, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "DevPilot/1.0",
        Authorization: `Beare ${process.env.GITHUB_TOKEN}`, 
      },
    });

    if (!githubResponse.ok) {
      const errorData = await githubResponse.json();

      console.log("GitHub API error:", errorData);

      return res.status(githubResponse.status).json({
        success: false,
        message: errorData.message || "GitHub API request failed",
        status: githubResponse.status,
      });
    }

    const repositoryData = await githubResponse.json();

    // --------------------------------------------------
    // STEP 2: Get repository file tree
    // --------------------------------------------------

    const defaultBranch = repositoryData.default_branch;

    console.log(`Default branch: ${defaultBranch}`);

    const treeUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/${encodeURIComponent(
      defaultBranch
    )}?recursive=1`;

    console.log("Fetching repository file tree...");

    const treeResponse = await fetch(treeUrl, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "DevPilot/1.0",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });

    if (!treeResponse.ok) {
      const treeError = await treeResponse.json();

      console.log("GitHub tree API error:", treeError);

      return res.status(treeResponse.status).json({
        success: false,
        message: treeError.message || "Could not fetch repository files",
      });
    }

    const treeData = await treeResponse.json();

    // --------------------------------------------------
    // STEP 3: Select source-code files
    // --------------------------------------------------

    const sourceExtensions = [
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
      ".py",
      ".java",
      ".cpp",
      ".c",
      ".h",
      ".hpp",
      ".cs",
      ".go",
      ".rs",
      ".php",
      ".html",
      ".css",
      ".scss",
    ];

    const sourceFiles = treeData.tree
      .filter((item: any) => item.type === "blob")
      .filter((item: any) =>
        sourceExtensions.some((extension) =>
          item.path.toLowerCase().endsWith(extension)
        )
      )
      .map((item: any) => item.path);

    console.log(`Found ${sourceFiles.length} source files`);

    // --------------------------------------------------
    // STEP 4: Return repository analysis information
    // --------------------------------------------------

    res.json({
      success: true,
      message: "Repository analyzed successfully",

      repository: {
        name: repositoryData.name,
        fullName: repositoryData.full_name,
        description: repositoryData.description,
        language: repositoryData.language,
        stars: repositoryData.stargazers_count,
        forks: repositoryData.forks_count,
        defaultBranch: repositoryData.default_branch,
        url: repositoryData.html_url,
      },

      analysis: {
        totalFiles: treeData.tree.length,
        sourceFiles: sourceFiles.length,
        files: sourceFiles,
      },
    });
  } catch (error) {
    console.error("Error analyzing repository:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong while analyzing the repository",
    });
  }
});

app.listen(PORT, () => {
  console.log(`DevPilot backend running on http://localhost:${PORT}`);
});