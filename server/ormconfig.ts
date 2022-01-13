require('dotenv').config();
module.exports = {
    "type": "mysql",
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT,
    "username": process.env.MYSQL_USERNAME,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "entities": [
        "/dist/src/**/*.entity.js",
        "src/**/*.entity.ts"
    ],
    "synchronize": process.env.MYSQL_SYNC || true,
    "logging": true,
    'timezone ': "+08:00"
}
