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

let contacts: Contact [] = [
    {id: 1, fullName: "Juan Manuel", phoneNumber: "809-555-5555", email: "juanmanuel@hotmail.com"},
    {id: 2, fullName: "Maria Jose", phoneNumber: "809-646-5345", email: "mariajose@hotmail.com"}
];

// Obtiene los datos de contactos
app.get(`/api/contacts`, (req: Request, res: Response) => {
    res.json(contacts);
});

app.listen(port, () => console.log(`This server is running at port ${port}`));