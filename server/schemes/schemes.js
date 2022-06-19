const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLEnumType,
  GraphQLNonNull,
} = require('graphql');
const Product = require('../models/Product')
const Category = require('../models/Category')
const User = require('../models/User')

// GenerateToken
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    slug: {type: GraphQLString},
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
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
    sku: {type: GraphQLString},
    price: {type: GraphQLInt},
    description: {type: GraphQLString},
    categories: {
      type: new GraphQLList(CategoryType),
      resolve(parent) {
        return parent.categories.map(cat => Category.findById(cat))
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
    shopping_history: {type: GraphQLList(ProductType)},
    token: {type: GraphQLString},
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    allProducts: {
      type: new GraphQLList(ProductType),
      resolve() {
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
    allCategories: {
      type: new GraphQLList(CategoryType),
      resolve() {
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
    allUsers: {
      type: new GraphQLList(UserType),
      resolve() {
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
  })
});

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add Product
    addProduct: {
      type: ProductType,
      args: {
        name: {type: GraphQLNonNull(GraphQLString)},
        slug: {type: GraphQLNonNull(GraphQLString)},
        price: {type: GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLString},
        categories: {type: GraphQLList(GraphQLString)}
      },
      resolve(parent, args) {
        const product = new Product({
          name: args.name,
          slug: args.slug,
          price: args.price,
          description: args.description,
          categories: args.categories
        });

        return product.save();
      }
    },

    // Update Product
    updateProduct: {
      type: ProductType,
      args: {
        id: {type: GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLString},
        slug: {type: GraphQLString},
        price: {type: GraphQLString},
        description: {type: GraphQLString},
        categories: {type: GraphQLList(GraphQLString)}
      },
      resolve(parent, args) {
        return Product.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              slug: args.slug,
              price: args.price,
              description: args.description,
              categories: args.categories
            }
          },
          {new: true}
        )
      }
    },

    // Remove Product
    removeProduct: {
      type: ProductType,
      args: {
        id: {type: GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args) {
        return Product.findByIdAndDelete(args.id)
      }
    },

    // Add Category
    addCategory: {
      type: CategoryType,
      args: {
        name: {type: GraphQLNonNull(GraphQLString)},
        slug: {type: GraphQLNonNull(GraphQLString)},
      },
      resolve(parent, args) {
        const category = new Category({
          name: args.name,
          slug: args.slug,
        });

        return category.save();
      }
    },

    // Update Category
    updateCategory: {
      type: CategoryType,
      args: {
        id: {type: GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLString},
        slug: {type: GraphQLString},
      },
      resolve(parent, args) {
        return Category.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              slug: args.slug,
            }
          },
          {new: true}
        )
      }
    },

    // Remove Category
    removeCategory: {
      type: CategoryType,
      args: {
        id: {type: GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args) {
        return Category.findByIdAndDelete(args.id)
      }
    },

    // User Registration
    register: {
      type: UserType,
      args: {
        name: {type: GraphQLNonNull(GraphQLString)},
        email: {type: GraphQLNonNull(GraphQLString)},
        password: {type: GraphQLNonNull(GraphQLString)},
        confirmPassword: {type: GraphQLNonNull(GraphQLString)},
      },
      async resolve(parent, args) {
        const {password, confirmPassword, email} = args;

        // Check if passwords are the same
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match')
        }

        // Check if user exist
        const userExists = await User.findOne({email});

        if (userExists) {
          throw new Error('User already exists.')
        }

        // Hash password
        const salt = await bcrypt.genSalt(5)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({
          name: args.name,
          email: args.email,
          password: hashedPassword,
        });

        const res = await user.save();

        const token = generateToken(res.id);

        return {
          id: res._id,
          ...res._doc,
          token
        }
      }
    },

    login: {
      type: UserType,
      args: {
        email: {type: GraphQLNonNull(GraphQLString)},
        password: {type: GraphQLNonNull(GraphQLString)},
      },
      async resolve(parent, args) {
        const {email, password} = args;

        // Check user email
        const user = await User.findOne({email})

        if (!user) {
          throw new Error('User not found')
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          throw new Error('Invalid credentials')
        }

        const token = generateToken(user._id);

        return {
          ...user._doc,
          id: user._id,
          token
        }
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
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
})