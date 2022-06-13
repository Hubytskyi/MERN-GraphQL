const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLEnumType,
} = require('graphql');
const {products, users, categories} = require('../sampleData');
const Product = require('../models/Product')
const Category = require('../models/Category')

const UserRole = new GraphQLEnumType({
  name: 'UserRole',
  values: {
    USER: {value: 'user'},
    EDITOR: {value: 'editor'},
    ADMIN: {value: 'admin'}
  }
});

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    slug: {type: GraphQLString},
    products: {
      type: ProductType,
      resolve(parent, args) {
        // console.log('parent: ', parent);
        // console.log('args: ', args);
        // return products.find(product => product.categories.includes(parent.id))
        return Product.find({categories: parent.id})
      }
    }
  })
});

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    slug: {type: GraphQLString},
    price: {type: GraphQLInt},
    description: {type: GraphQLString},
    categories: {
      type: CategoryType,
      resolve(parent, args) {
        // console.log('parent: ', parent);
        // console.log('args: ', args);
        return categories.find(category => {
          // console.log('category1: ', category)
          if (parent.categories.includes(category.id)) {
            // console.log('category2: ', category)
            return category
          }
        })
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    password: {type: GraphQLInt},
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return Product.find();
      }
    },
    product: {
      type: ProductType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return Product.findById(args.id)
      }
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve(parent, args) {
        return Category.find();
      }
    },
    category: {
      type: CategoryType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return Category.findById(args.id)
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return users;
      }
    },
    user: {
      type: UserType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return users.find(user => user.id === args.id);
      }
    },
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery,
})