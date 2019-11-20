const Product = require('../models/player.model');

exports.product_create = function (req, res) {
    let product = new Product(
        {
            //
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Player Created successfully')
    })
};
