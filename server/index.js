const  express = require('express')
const {graphqlHTTP} = require('express-graphql')
const app = express()
app.listen(3001,()=>{console.log("listening on 3001");})
const schema = require('./schema/schema')

const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/graphqlDB")
mongoose.connection.once('open',()=>{
    console.log("connected to database");
})

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))

