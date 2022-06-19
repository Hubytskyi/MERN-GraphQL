const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLEnumType, GraphQLList} = require("graphql");
const User = require('../models/User')
const Category = require("../models/Category");

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    password: {type: GraphQLInt},
  })
});

const UserQueries = {
  users: {
    type: new GraphQLList(UserType),
    resolve(parent, args) {
      return User.find();
    }
  },
  user: {
    type: UserType,
    args: {id: {type: GraphQLID}},
    resolve(parent, args) {
      return User.findById(args.id)
    }
  },
};

const UserMutation = {
  // Add User
  addUser: {
    type: UserType,
    args: {
      name: {type: GraphQLNonNull(GraphQLString)},
      email: {type: GraphQLNonNull(GraphQLString)},
      password: {type: GraphQLNonNull(GraphQLString)},
    },
    resolve(parent, args) {
      const user = new User({
        name: args.name,
        email: args.email,
        password: args.password,
        role: args.role
      });

      return user.save();
    }
  },

  // Update User
  updateUser: {
    type: UserType,
    args: {
      id: {type: GraphQLNonNull(GraphQLID)},
      name: {type: GraphQLString},
      email: {type: GraphQLString},
      password: {type: GraphQLString},
      role: {
        type: new GraphQLEnumType({
          name: 'UserRoleUpdate',
          values: {
            'user': {value: 'user'},
            'editor': {value: 'editor'},
            'admin': {value: 'admin'}
          }
        }),
        defaultValue: 'user',
      },
    },
    resolve(parent, args) {
      return Category.findByIdAndUpdate(
        args.id,
        {
          $set: {
            name: args.name,
            email: args.email,
            password: args.password,
            role: args.role
          }
        },
        {new: true}
      )
    }
  },

  // Remove User
  removeUser: {
    type: UserType,
    args: {
      id: {type: GraphQLNonNull(GraphQLID)}
    },
    resolve(parent, args) {
      return User.findByIdAndDelete(args.id)
    }
  },
}

module.exports = {
  UserType,
  UserMutation,
  UserQueries
}