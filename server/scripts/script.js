const axios = require('axios');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomObject() {
    return {
        room_id: getRandomInt(100, 999).toString(),
        usage: [
            { time: "00:00:00", value: getRandomInt(30, 90) },
            { time: "06:00:00", value: getRandomInt(30, 90) },
            { time: "12:00:00", value: getRandomInt(30, 90) },
            { time: "18:00:00", value: getRandomInt(30, 90) },
        ],
        threshold: getRandomInt(100, 400),
    };
}

async function postObject(object) {
    try {
        const response = await axios.post('http://localhost:3000/api/v1/object', object);
        console.log('Object posted successfully:', response.data);
    } catch (error) {
        console.error('Error posting object:', error.message);
    }
}

for (let i = 0; i < 6; i++) {
    const randomObject = generateRandomObject();
    postObject(randomObject);
}