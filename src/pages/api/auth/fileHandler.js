import fs from 'fs';
import path from 'path';

// user.jsonの絶対パス
const usersFilePath = path.resolve(process.cwd(), 'users.json')

// ユーザー情報を読み込む、JSON.parseはJavaScriptのオブジェクト、または配列に変換
export const getUsers = () => {
    const UserData = fs.readFileSync(usersFilePath);
    return JSON.parse(UserData);
};

// ユーザー情報を書き込む、最新の状態にするため、JSON.stringifyはJSON文字列に変換
export const saveUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

}