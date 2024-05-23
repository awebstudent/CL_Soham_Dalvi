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
const express_1 = __importDefault(require("express"));
const weatherService_1 = require("./weatherService");
const nodemailer_1 = __importDefault(require("nodemailer"));
const weatherModel_1 = __importDefault(require("./weatherModel"));
const genTable_1 = require("./genTable");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
//A.
app.post('/api/SaveWeatherMapping', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cities = req.body;
        console.log(cities);
        for (let i = 0; i < cities.length; i++) {
            const { city, country } = cities[i];
            yield (0, weatherService_1.saveWeather)(city, country);
        }
        res.send('Weather data saved ');
    }
    catch (error) {
        console.error('Error in /api/SaveWeatherMapping:', error);
        res.send('Failed to save');
    }
}));
//B.
app.get('/api/weatherDashboard', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { city } = req.query; // after the ?=
        if (city) {
            const cityWeatherData = yield weatherModel_1.default.findAll({ where: { city } });
            res.json(cityWeatherData);
        }
        else {
            const allWeatherData = yield weatherModel_1.default.findAll();
            res.json(allWeatherData);
        }
    }
    catch (error) {
        res.json({ error: 'Error' });
    }
}));
// C. Mailing API
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'sohum3001@gmail.com',
        pass: 'Sohum5986',
    },
});
app.get('/api/mail', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body; // Assuming data is received from the request body
        const table = (0, genTable_1.generateTable)(data);
        const mailOptions = {
            from: 'sohum3001@gmail.com',
            to: 'yifopi3406@neixos.com', //temporary emails for testing purposes
            subject: 'Weather Data',
            html: table,
        };
        yield transporter.sendMail(mailOptions);
        res.send('Weather data sent successfully via email.');
    }
    catch (error) {
        console.log(error);
        res.send('Failed');
    }
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=app.js.map