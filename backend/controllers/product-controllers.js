const mongoose = require("mongoose");
const Product = require("../models/product");
const Review = require("../models/review");
const User = require("../models/user");
const Category = require("../models/category");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const { s3Upload, emptyBucket } = require("../utils/s3");

const url = process.env.DB_URL;
mongoose.connect(url).then(() => console.log("Connected!"));

const addProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs passed!", 422);
    return next(error);
  }
  try {
    const result = await s3Upload(req.files);
    const links = [];
    result.forEach((element) => {
      links.push(element.Location);
    });
    const { categoryName, title, quantity, price } = req.body;

    let category;
    category = await Category.findOne({ name: categoryName.toLowerCase() });
    if (!category) {
      category = new Category({
        name: categoryName.toLowerCase(),
        products: [],
      });
    }
    const newProduct = new Product({
      title,
      price,
      stock: {
        quantity,
      },
      images: {
        links: links,
        imageFolder: result[0].key.split("/")[0],
      },
      category: mongoose.Types.ObjectId(category),
    });
    try {
      category.products.push(newProduct);
      await newProduct.save();
      await category.save();
    } catch (err) {
      const error = new HttpError("Could not add Product, try again", 500);
      return next(error);
    }
    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    const error = new HttpError("Could not add Product, try again", 500);
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const pid = req.params.pid;
  const { uid } = req.body;
  const hasProduct = await Product.findOne({
    _id: mongoose.Types.ObjectId(pid),
  }).populate("category", "name");
  if (!hasProduct) {
    const error = new HttpError(
      "Could not find a product for provided id.",
      404
    );
    return next(error);
  }
  const category = await Category.findOne({ name: hasProduct.category.name });
  try {
    category.products.pull(hasProduct);
    await category.save();
    if (hasProduct.reviews.length > 0) {
      const user = await User.findOne({ _id: uid });
      const reviews = await Review.find({ product: pid });
      reviews.map((review) => user.reviews.pull(review._id));
      await user.save();
      await Review.deleteMany({ product: pid });
    }
    await Product.deleteOne({ _id: pid });
  } catch (err) {
    console.log(err);
    const error = new HttpError("Could not delete Product, try again", 500);
    return next(error);
  }

  emptyBucket(process.env.BUCKET_NAME, hasProduct, res, false);
};

const getProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.find({}).populate("category", "name");
  } catch (err) {
    const error = new HttpError("Can't get products", 500);
    return next(error);
  }
  res.status(200).json({ products });
};

const searchProducts = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs passed!", 422);
    return next(error);
  }
  const { searchString } = req.body;
  let searchResult;
  try {
    searchResult = await Product.find(
      {
        title: { $regex: searchString, $options: "i" },
      },
      "title"
    ).limit(10);
  } catch (err) {
    const error = new HttpError("Can't get product", 500);
    return next(error);
  }
  res.status(200).json({ searchResult });
};

const getProduct = async (req, res, next) => {
  const { pid } = req.params;
  let hasProduct;
  try {
    hasProduct = await Product.findOne({
      _id: mongoose.Types.ObjectId(pid),
    });
  } catch (err) {
    const error = new HttpError("Invalid id", 404);
    return next(error);
  }
  if (!hasProduct) {
    const error = new HttpError(
      "Could not find a product for provided id.",
      404
      );
      return next(error);
    }
    if (hasProduct.reviews.length === 0) {
      return res.status(200).json({ product: hasProduct });
    }
  let product;
  try {
    product = await Product.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(pid),
        },
      },
      {
        $project: {
          imageFolder: false,
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "product",
          as: "reviews",
        },
      },
      {
        $unwind: "$reviews",
      },
      {
        $sort: {
          "reviews.reviewDate": -1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "reviews.creator",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $addFields: {
          "reviews.creator.name": {
            $arrayElemAt: ["$user.name", 0],
          },
          "reviews.creator.id": {
            $arrayElemAt: ["$user._id", 0],
          },
        },
      },
      {
        $project: {
          user: 0,
        },
      },
      {
        $group: {
          _id: "$_id",
          reviews: {
            $push: "$reviews",
          },
          doc: {
            $first: "$$ROOT",
          },
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              "$doc",
              {
                reviews: "$reviews",
              },
            ],
          },
        },
      },
    ]);
  } catch (err) {
    const error = new HttpError("Can't get product", 500);
    return next(error);
  }
  res.status(200).json({ product: product[0] });
};
const editProduct = async (req, res, next) => {
  const { pid } = req.params;
  const hasProduct = await Product.findOne({
    _id: mongoose.Types.ObjectId(pid),
  });
  if (!hasProduct) {
    const error = new HttpError(
      "Could not find a product for provided id.",
      404
    );
    return next(error);
  }
  const { title, quantity, price } = req.body;
  hasProduct.title = title;
  hasProduct.quantity = quantity;
  hasProduct.price = price;
  if (req.files.length > 0) {
    emptyBucket(process.env.BUCKET_NAME, hasProduct, res, true);
    const result = await s3Upload(req.files);
    const links = [];
    result.forEach((element) => {
      links.push(element.Location);
    });
    hasProduct.images = {
      links: links,
      imageFolder: result[0].key.split("/")[0],
    };
  }
  try {
    await hasProduct.save();
    res.status(200).json({ message: "Product updated succssfully" });
  } catch (err) {
    const error = new HttpError(
      "Could not update a product for provided id.",
      500
    );
    return next(error);
  }
};

exports.addProduct = addProduct;
exports.editProduct = editProduct;
exports.getProducts = getProducts;
exports.getProduct = getProduct;
exports.searchProducts = searchProducts;
exports.deleteProduct = deleteProduct;
