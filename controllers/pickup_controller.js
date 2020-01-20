const Pickup = require('../models/pickup_model');
const nowGMT = require('../public/javascripts/dateTime');

/**** pickup Home ****/

exports.get_pickup = (req, res, next) => {
    Pickup.find((err, items) => {
        if(err) return next(err);
        res.render('pickup/showPickups', {
            title: 'Pick Up',
            items: items,
            user: req.user,
        });
    });  
};

/**** pickup Deatils ****/

exports.get_detail = (req, res, next) => {
    Pickup.findById(req.params.id, (err, items) => {
        if(err) return next(err);
        res.render('pickup/detail', {
            title: 'Show Detail',
            items: items,
            user: req.user,
        });
    });
};

/**** Create New pickup ****/

exports.get_new = (req, res, next) => {
    res.render('pickup/create', {
        title: 'Create pickup',
        user: req.user,
    });
};

exports.post_create = (req, res, next) => {
    let myDate = nowGMT.GMTdateTime();
    let pickup = new Pickup(
        {
            pickup_location: req.body.pickup_location,
            pickup_details: req.body.pickup_details,
            pickup_po: req.body.pickup_po,
            pickup_paid: req.body.pickup_paid,
            pickup_for: req.body.pickup_for,
            pickup_date: myDate,
        }
    );
    pickup.save(function (err) {
        if (err) {
            console.log('Error');
            return next(err);
        }
        res.redirect('/pickup')
    });
};

/**** Show pickup details ****/

exports.get_edit = (req, res, next) => {
    Pickup.findById(req.params.id, (err, pickup) => {
        if(err) return next(err);
        res.render('pickup/pickupItem', {
            title: 'Pickup Item Detail',
            pickup: pickup,
            user: req.user,
        });
    })
};

/**** Update Exsiting pickup ****/

exports.post_update = (req, res, next) => {
    let myDate = nowGMT.GMTdateTime();
    Pickup.findByIdAndUpdate(req.params.id, {$set: req.body, pickup_update_date: myDate}, (err, pickup) => {
        {
            if (err) return next(err);
            res.redirect('/pickup');
        }
    });
};

/**** Delete Exsiting pickup ****/

exports.delete_remove = (req, res, next) => {
    Pickup.findByIdAndRemove(req.params.id, (err) => {
        if(err) return next(err);
        console.log('Deleted Sucsessfully');
        res.redirect('/pickup');
    })
};