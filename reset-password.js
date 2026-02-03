
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const USERS_FILE = path.join(__dirname, 'server/data/users.json');

const resetPassword = async () => {
    const password = 'douro2024';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log(`Resetting admin password to: ${password}`);
    console.log(`New Hash: ${hashedPassword}`);

    const users = [
        {
            "id": "1",
            "username": "admin",
            "password": hashedPassword
        }
    ];

    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    console.log('Password reset successful. users.json updated.');
};

resetPassword();
