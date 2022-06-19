const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull} = require("graphql");
const Category = require("../models/Category");
const CategoryType = require("./Category");
const Product = require("../models/Product");

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    slug: {type: GraphQLString},
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

const ProductQueries = {
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
};

const ProductMutation = {
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
}

module.exports = {
  ProductType,
  ProductMutation,
  ProductQueries
}