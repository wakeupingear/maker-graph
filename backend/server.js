const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

//open the file 'password.txt' for reading
const fs = require('fs');
const password = fs.readFileSync('password.txt').toString();
mongoose.connect('mongodb+srv://admin:'+password+'@makergraph.y2h84.mongodb.net/MakerGraph?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
    console.log('Connected to database');
});

app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema: require('./schema/schema'),
    graphiql: true
}));
app.listen(4000,()=>{
    console.log('Server is running on port 4000');
});