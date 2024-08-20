import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

type Contact = {
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

    if (isNaN(id)) {
        return res.status(400).json({error: "El id debe ser un numero"});
    };

    // Aqui se usa el arrow function con el metodo find para buscar en el array y comparar que el id que se recibe es igual a del parametro
    const contact = contacts.find((contact) => contact.id === id);

    if (!contact) {
        return res.status(404).json({error: "No se encontro el contacto"});
    };
    res.json(contact);
});

// Agregar un nuevo contacto
app.post('/api/contacts', (req: Request, res: Response) => {
    const { fullName, phoneNumber, email } = req.body;

    if (!fullName || !phoneNumber || !email) {
        return res.status(400).json({error: "Todos los campos son obligatorios"});
    };

    // El medoto some devuelve truthy si encuenta algo parecido en el array, en este caso el de los emails
    if (contacts.some(contact => contact.email === email)) {
        return res.status(400).json({error: "El email ya existe"});
    };
    const newContact: Contact ={
        id: contacts.length + 1,
        fullName,
        phoneNumber,
        email
    };
    contacts.push(newContact);
    res.status(201).json(newContact);
    });

    // Actualizar contacto
    app.put('/api/contacts/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { fullName, phoneNumber, email } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({error: "El id debe ser un numero"});
        };

        if (!fullName || !phoneNumber || !email) {
            return res.status(400).json({error: "Todos los campos son obligatorios"});
        };
        
        // Con findIndex el encuentra el id del contacto especificado del array de contacts
        const contactIndex = contacts.findIndex(contact => contact.id === id);

        if (email !== contacts[contactIndex].email && contacts.some(contact => contact.email === email)) {
            return res.status(400).json({error: "El correo ya esta en uso"});
        };
        // Reemplazo de propiedades 
        contacts[contactIndex] = {...contacts[contactIndex], fullName, phoneNumber, email};
        res.json(contacts[contactIndex]);
    });

    // Eliminar contacto
    app.delete('/api/contacts/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({error: "El id debe ser un numero"});
        };

        const contactIndex = contacts.findIndex(contact => contact.id === id);

        // Uso splice para eliminar el elemento que esta en la posicion 1 del array de contacts
        contacts.splice(contactIndex, 1);
        res.status(204).send();
    });

    // Filtrar contactos
    app.get('/api/contacs/filter', (req: Request, res: Response) => {
        const { name, email } = req.query;

        let filterContacts = contacts 
    })


app.listen(port, () => console.log(`This server is running at port ${port}`));