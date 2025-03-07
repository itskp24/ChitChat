import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Enable CORS for client
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true
}));

// Remove CSP in development to allow styles
if (process.env.NODE_ENV === 'development') {
  app.use((_req, res, next) => {
    res.removeHeader('Content-Security-Policy');
    next();
  });
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup routes with API prefix
app.use(process.env.API_PREFIX || '/api', registerRoutes());

// Serve static files from the client build directory
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../dist/public');
  app.use(express.static(clientBuildPath));

  // Serve index.html for all routes (except /api) in production
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(clientBuildPath, 'index.html'));
    }
  });
}

// Error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default server;