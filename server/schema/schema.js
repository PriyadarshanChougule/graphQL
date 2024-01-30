const graphql = require('graphql')
const {GraphQLObjectType, GraphQLString, GraphQLSchema,GraphQLID,
        GraphQLInt, GraphQLList}
    = graphql
const Book = require('../models/book')
const Author = require('../models/author')

const _ = require('lodash')
// var books=[
//     {name:'Name of the wind',genre:'Fantasy',id:"1",authorId:'1'},
//     {name:'The final empire',genre:'Fantasy',id:"2",authorId:'2'},
//     {name:'The Long Earth',genre:'Sci-Fi',id:"3",authorId:'3'},
// ]

// var authors=[
//     {name:'Ashish',age:30,id:"1"},
//     {name:'Darshan',age:35,id:"2"},
//     {name:'Rakesh',age:40,id:"3"},
// ]

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:() => ({
        id : { type:GraphQLID },
        name : { type:GraphQLString },
        genre : { type:GraphQLString },
        author : {
            type:AuthorType,
            resolve(parent,args){
                console.log("parent-->",parent);
                // return _.find(authors,{id:parent.authorId})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:() => ({
        id : { type:GraphQLID }, 
        name : { type:GraphQLString },
        age : { type:GraphQLInt },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                // return _.filter(books,{authorId:parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields:{
        book : {
            type: BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //code to get data from db
                // return _.find(books,{id:args.id})
            }
        },

        author : {
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                // return _.find(authors,{id:args.id})
            }
        },

        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                // return books
            }
        },

        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                // return authors
            }
        }
    }
})

const Mutations = new GraphQLObjectType({
    name:'mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args: {
                name:{type:GraphQLString},
                age : {type:GraphQLInt}
            },
            resolve(parent,args){
                let author = new Author({
                    name:args.name,
                    age: args.age
                })

                return author.save()
            },
        },

        addBook:{
            type:BookType,
            args:{
                name:{type:GraphQLString},
                genre:{type:GraphQLString},
                authorId:{type:GraphQLID}
            },
            resolve(parent,args){
                let book = new Book({
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorId
                })
                return book.save()
            }
        }
    }
}) 

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutations
})