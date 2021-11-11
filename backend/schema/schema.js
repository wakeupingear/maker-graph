const graphql = require('graphql');

const Tutorial = require('../models/tutorial');
const Author = require('../models/author');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt, GraphQLFloat, GraphQLBoolean, GraphQLSchema, GraphQLNonNull } = graphql;

const TutorialType = new GraphQLObjectType({
    name: 'Tutorial',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        type: { type: GraphQLInt },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                //return authorData.find(author => author.id === parent.id);
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        tutorials: {
            type: new GraphQLList(TutorialType),
            resolve(parent, args) {
                //return contentData.filter(content => content.authorId === parent.id);
                return Tutorial.findById(parent.id);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        tutorial: {
            type: TutorialType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //return contentData.find(tutorial => tutorial.id === args.id);
                return Tutorial.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //return authorData.find(author => author.id === args.id);
                return Author.findById(args.id);
            }
        },
        tutorials: {
            type: new GraphQLList(TutorialType),
            resolve(parent, args) {
                //return contentData;
                return Tutorial.find({});
            }
        },
    }
});

const Mutations = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTutorial: {
            type: TutorialType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                type: { type: new GraphQLNonNull(GraphQLInt) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let tutorial = new Tutorial({
                    title: args.title,
                    type: args.type,
                    authorId: args.authorId
                });
                return tutorial.save();
            }
        },
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name
                });
                return author.save();
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
});