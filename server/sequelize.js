const fs = require('fs');
const path = require('path');

const dotenv = require('dotenv');
// from root directory
dotenv.config({ path: path.join(__dirname, '../.env') });
const config = {
    development: {
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        dialect: process.env.DB_DIALECT,
        dialectOptions: {
            connectTimeout: 3000,
        },
    },
};

if (
    !config.development.host ||
    !config.development.username ||
    !config.development.password ||
    !config.development.database ||
    !config.development.dialect
) {
    console.error('Please provide the database configuration in the .env file');
    console.log(JSON.stringify(config, null, 2));
} else {
    // Convert the object to a JSON string
    const jsonContent = JSON.stringify(config, null, 2); // null and 2 are for pretty-printing

    // Define the file path
    const filePath = path.join(__dirname, './config/config.json');

    // Write the JSON content to the file overwriting the existing file
    fs.writeFile(filePath, jsonContent, (err) => {
        if (err) {
            console.error(
                'An error occurred while writing the JSON file:',
                err
            );
            return;
        }
        console.log('config.json has been saved successfully!');
    });
}
