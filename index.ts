const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

type Contact {
    id: number;
    fullName: string;
    phoneNumber: string;
    email: string
};


app.listen(port, () => console.log(`This server is running at port ${port}`));