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
exports.saveWeather = exports.getWeather = void 0;
const axios_1 = __importDefault(require("axios"));
const weatherModel_1 = __importDefault(require("./weatherModel"));
const rapidApiKey = 'b7d7cb7916msh9dafbdfdab675a2p11fec6jsn75446ac15178';
const weatherURL = 'https://weatherapi-com.p.rapidapi.com/current.json';
function getCoords(city, country) {
    return __awaiter(this, void 0, void 0, function* () {
        const coordKey = 'syF7epMSCTsIuKRtzHbfvuEFREF3D89EhXsAxzN6';
        const coordUrl = `https://api.api-ninjas.com/v1/geocoding?city=${city}&country=${country}&X-Api-Key=${coordKey}`;
        try {
            const response = yield axios_1.default.get(coordUrl);
            if (response.status === 200) {
                console.log(response);
                console.log(response.data);
                const { latitude, longitude } = response.data[0];
                return { latitude, longitude };
            }
            else {
                throw new Error(`Failed to fetch coordinates. Status code: ${response.status}`);
            }
        }
        catch (error) {
            console.error('Error fetching coordinates:', error);
            throw new Error('Failed to fetch coordinates');
        }
    });
}
function getWeather(latitude, longitude) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: 'GET',
            url: weatherURL,
            params: { q: `${latitude},${longitude}` },
            headers: {
                'X-RapidAPI-Key': rapidApiKey,
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };
        try {
            const response = yield axios_1.default.request(options);
            return response.data;
        }
        catch (error) {
            console.error('Error fetching weather:', error);
            throw new Error('Failed to fetch weather data');
        }
    });
}
exports.getWeather = getWeather;
function saveWeather(city, country) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(city, country);
        try {
            const obj1 = yield getCoords(city, country);
            console.log("\n\n\n\n\nresponse obj: ", obj1);
            // const { latitude, longitude } = await getCoords(city, country);
            const weather = yield getWeather(obj1.latitude, obj1.longitude);
            const weatherData = {
                city,
                country,
                weather: weather.current.condition.text,
                longitude: obj1.longitude,
                latitude: obj1.latitude,
                time: new Date(),
            };
            yield weatherModel_1.default.create(weatherData);
        }
        catch (error) {
            console.error('Error saving weather data:', error);
            throw new Error('Failed to save weather data');
        }
    });
}
exports.saveWeather = saveWeather;
//# sourceMappingURL=weatherService.js.map