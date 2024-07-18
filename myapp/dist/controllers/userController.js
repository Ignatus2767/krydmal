"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSignIn = exports.handleSignUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../db"));
const handleSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, email, username, password, country } = req.body;
    // Hashing the password
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    // Check if user with the same email or username already exists
    const checkQuery = 'SELECT * FROM users WHERE email = ? OR username = ?';
    const insertQuery = 'INSERT INTO users (fullname, email, username, password, country) VALUES (?, ?, ?, ?, ?)';
    try {
        const [existingUsers] = yield db_1.default.query(checkQuery, [email, username]);
        if (existingUsers.length > 0) {
            res.status(400).send('User with the same email or username already exists');
            return;
        }
        const [results] = yield db_1.default.query(insertQuery, [fullname, email, username, hashedPassword, country]);
        console.log('Sign up successful:', results);
        res.redirect('/signin');
    }
    catch (error) {
        console.error('Error signing up:', error);
        res.status(500).send('Error signing up');
    }
});
exports.handleSignUp = handleSignUp;
const handleSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    try {
        const [results] = yield db_1.default.query(query, [email]);
        if (results.length === 0) {
            res.status(401).send('Invalid email or password');
            return;
        }
        const user = results[0];
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).send('Invalid email or password');
            return;
        }
        console.log('Sign in successful:', user);
        res.redirect('/dashboard');
    }
    catch (error) {
        console.error('Error signing in:', error);
        res.status(500).send('Error signing in');
    }
});
exports.handleSignIn = handleSignIn;
