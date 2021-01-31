const express = require('express'); //import express
const Joi = require ('joi'); //import joi
const app = express(); //create Express Application on the app variable
app.use(express.json());//used the json file

//Give data to the server
const customers = [
    {title: 'George', id:1},
    {title: 'Josh', id:2},
    {title: 'Tyler', id:3},
    {title: 'Alice', id:4},
    {title: 'Candice', id:5}
]

//Read Request Handlers
//Display the Message when the URL consist of '/'
app.get('/',(req, res) => {
    res.send('Welcome to Mochamas REST API!');
});
//Display the List of Customers when URL consists of api customers
app.get('/api/customers',(req,res) => {
    res.send(customers);
});
//Display the info of specific customer when you mention the id
app.get('/api/customers/:id', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    //if there is no valid customer ID, then display an error with the following
    if (!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Oooops... Cant find what you are looking for!</h2>');
    res.send(customer);
});
//CREATE Request Handler
//CREATE New Customer Information
app.post('/api/customers', (req, res)=> {

    const { error } = validateCustomer(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    //increment the customer id
    const customer ={
        id: customers.length+1,
        title: req.body.title
    };
    customers.push(customer);
    res.send(customer);
});

//Update Request Handler
//Update Existing Customer Information
app.put('/api/customer/:id', (req, res) => {
    const customer = customers.find(c=> c.id === parseInt(req.params.id));
    if (!customer) res.status(404) .send('<h2 style="font-family: Malgun Gothic; color: darkred;">Oooops... Cant find what you are looking for!</h2>');

    const { error } = validateCustomer(req.body);
    if (error){
        res.status(400) .send(error.details[0].message);
        return;
    }
    customer.title= req.body.title;
    res.send(customer);
});

//Delete Request Handler
//Delete Customer Details
app.delete('/api/customers/:id', (req, res) => {

    const customer = customers.find( c=> c.id === parseInt(req.params.id));
    if(!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Oooops... Cant find what you are looking for!</h2>');

    const index=customers.indexof(customer);
    customers.splice(index,1);

    res.send(customer);
});
//Validate Information
function validateCustomer(customer) {
    const schema =Joi.object({
        title: Joi.string().min(3).required() });
    return
    const validation = schema.validate(req.body);
    res.send(validation);
}

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port,() => console.log('Listening on port ${port}..'));