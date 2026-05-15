import cron from "node-cron";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const setupCronJobs = () => {
  // 1. Keep-Alive Ping (Runs every 14 minutes)
  // This prevents Render's free tier from spinning down
  cron.schedule("*/14 * * * *", async () => {
    const renderUrl = process.env.RENDER_URL;
    if (renderUrl) {
      try {
        console.log("⏳ Sending keep-alive ping...");
        const response = await axios.get(renderUrl);
        console.log(`✅ Keep-alive ping successful: ${response.status}`);
      } catch (error) {
        console.error(`❌ Keep-alive ping failed: ${error.message}`);
      }
    } else {
      console.warn("⚠️ RENDER_URL not found in .env. Skipping keep-alive ping.");
    }
  });

  // 2. Sample Daily Task (Runs at midnight)
  cron.schedule("0 0 * * *", () => {
    console.log("🌙 Running daily maintenance tasks...");
    // Add your daily logic here (e.g., database cleanup, report generation)
  });

  console.log("⏰ Cron jobs initialized!");
};

export default setupCronJobs;
