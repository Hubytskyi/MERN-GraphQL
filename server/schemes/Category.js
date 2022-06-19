const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLNonNull} = require("graphql");
const Product = require("../models/Product");
const ProductType = require("./Product");
const Category = require("../models/Category");

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

const CategoryQueries = {
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
};

const CategoryMutation = {
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
}

module.exports = {
  CategoryType,
  CategoryMutation,
  CategoryQueries
}