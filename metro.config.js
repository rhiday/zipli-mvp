// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// Force Metro to resolve React to the same version for the project
const nodeModulesPaths = [path.resolve(__dirname, 'node_modules')];

config.resolver.nodeModulesPaths = nodeModulesPaths;
config.resolver.disableHierarchicalLookup = false; // Allow hierarchical lookup
config.resolver.extraNodeModules = {
  'react': path.resolve(__dirname, 'node_modules/react'),
  'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
};

module.exports = config; 