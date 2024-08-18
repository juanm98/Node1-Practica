import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

interface Contact {
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

// Obtener contacto especifico
app.get('/api/contacts/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if(isNaN(id)) {
        return res.status(400).json({error: "El id debe ser un numero"});
    };
    const contact = contacts.find((contact) => contact.id === id);

    if(!contact) {
        return res.status(404).json({error: "No se encontro el contacto"})
    };
    res.json(contact);
});

app.listen(port, () => console.log(`This server is running at port ${port}`));