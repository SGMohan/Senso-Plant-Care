const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Suppress development warnings
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

module.exports = config;