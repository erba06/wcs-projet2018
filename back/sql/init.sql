DROP DATABASE IF EXISTS mytoolbox;
CREATE DATABASE mytoolbox CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mytoolbox;

CREATE TABLE translationrequests ( 
    id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    requestType VARCHAR(90), 
    deadline VARCHAR(90), 
    clientName TEXT(90),
    domain VARCHAR(90),  
    sourceLanguage VARCHAR(90),
    targetLanguage VARCHAR(90),
    qualification VARCHAR(90),
    orderNumber VARCHAR(90),
    pathName VARCHAR(90),
    comments TEXT
);