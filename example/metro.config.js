const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const libraryRoot = path.resolve(projectRoot, "..");

const config = getDefaultConfig(projectRoot);

// Enable symlink support
config.resolver.unstable_enableSymlinks = true;

// Watch the library root for changes
config.watchFolders = [libraryRoot];

// Block only the library's node_modules (not the example's)
const libraryNodeModules = path.resolve(libraryRoot, "node_modules");
config.resolver.blockList = [
  new RegExp(`^${escapeRegex(libraryNodeModules)}/.*$`),
];

// Helper to escape regex special characters
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

module.exports = config;
