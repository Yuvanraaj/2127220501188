const fs = require('fs');
const path = require('path');

// Ensure the logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Create a writable stream for appending logs
const accessLogStream = fs.createWriteStream(
  path.join(logsDir, 'access.log'),
  { flags: 'a' } // Append mode
);

// Logging middleware to track incoming requests
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${req.method} ${req.originalUrl}\n`;
  accessLogStream.write(logEntry);
  next();
};

module.exports = logger;
