/**
 * Firebase Environment Configuration Script
 *
 * This script copies the appropriate Firebase configuration files
 * for either development or production environments to the correct
 * locations in your Android and iOS project folders.
 *
 * Usage:
 *   node prepare-firebase.js [env]
 *
 * Where [env] is either 'dev' or 'prod'
 */

const fs = require("fs");
const path = require("path");

// Get environment from command line args (default to 'dev')
const env = process.argv[2] || "dev";

if (env !== "dev" && env !== "prod") {
  console.error('Error: Environment must be either "dev" or "prod"');
  process.exit(1);
}

console.log(
  `Preparing Firebase configuration for ${env.toUpperCase()} environment...`
);

// Define paths
const rootDir = path.resolve(__dirname, "..");
const sourcePath = path.join(rootDir, "firebase", env);
const androidDestPath = path.join(rootDir, "android", "app");
const iosDestPath = path.join(rootDir, "ios", "App", "App");

// Check if source directory exists
if (!fs.existsSync(sourcePath)) {
  console.error(`Error: Source directory not found: ${sourcePath}`);
  console.error(
    "Please create this directory and add your Firebase configuration files."
  );
  process.exit(1);
}

// Check for required files
const androidSourceFile = path.join(sourcePath, "google-services.json");
const iosSourceFile = path.join(sourcePath, "GoogleService-Info.plist");

if (!fs.existsSync(androidSourceFile)) {
  console.error(`Error: Android config file not found: ${androidSourceFile}`);
  process.exit(1);
}

if (!fs.existsSync(iosSourceFile)) {
  console.error(`Error: iOS config file not found: ${iosSourceFile}`);
  process.exit(1);
}

// Check if destination directories exist
if (!fs.existsSync(androidDestPath)) {
  console.error(
    `Error: Android destination directory not found: ${androidDestPath}`
  );
  console.error("Please ensure the Android project directory exists.");
  process.exit(1);
}

if (!fs.existsSync(iosDestPath)) {
  console.error(`Error: iOS destination directory not found: ${iosDestPath}`);
  console.error("Please ensure the iOS project directory exists.");
  process.exit(1);
}

// Copy Android configuration file
try {
  fs.copyFileSync(
    androidSourceFile,
    path.join(androidDestPath, "google-services.json")
  );
  console.log("✓ Android configuration file copied successfully");
} catch (error) {
  console.error("Error copying Android configuration file:", error.message);
  process.exit(1);
}

// Copy iOS configuration file
try {
  fs.copyFileSync(
    iosSourceFile,
    path.join(iosDestPath, "GoogleService-Info.plist")
  );
  console.log("✓ iOS configuration file copied successfully");
} catch (error) {
  console.error("Error copying iOS configuration file:", error.message);
  process.exit(1);
}

console.log(`Firebase ${env.toUpperCase()} environment setup complete! 🚀`);
