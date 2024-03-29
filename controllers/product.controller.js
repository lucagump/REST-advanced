const Product = require('../models/product.model');

//Simple version, without validation or sanitation
exports.test = function(req, res) {
    res.send('Greetings from the Test controller!');
};

exports.createProduct = function(req, res) {
    let product = new Product({
        name: req.body.name,
        price: req.body.price
    });

    console.log(product.name)

    product.save(function(err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};

exports.getProduct = function(req, res) {
    Product.findById(req.params.id, function(err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

exports.updateProduct = function(req, res) {
    Product.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

exports.deleteProduct = function(req, res) {
    Product.findByIdAndRemove(req.params.id, function(err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};