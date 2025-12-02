const fs = require('fs');
const path = require('path');

// البورت اللي الباك إند عايز يشتغل عليه
const backendPort = 5000;

// المسار لملف .env في الفرونت إند
const envFilePath = path.join(__dirname, 'frontend', '.env');

// المحتوى اللي هيتكتب في .env
const envContent = `REACT_APP_BASE_URL=http://localhost:${backendPort}\n`;

// اكتب الملف
fs.writeFileSync(envFilePath, envContent);

console.log(`✅ frontend/.env تم تحديثه بالـ BASE_URL = http://localhost:${backendPort}`);
