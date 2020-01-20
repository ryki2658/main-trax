const Equipment = require('../models/equipment_model');

/**** Equipment Home ****/

exports.get_equipment = (req, res, next) => {
    Equipment.find((err, equip) => {
        if(err) return next(err);
        res.render('equipment/equipmentList', {
            title: 'Equipment',
            equip: equip,
            user: req.user,
        });
    });  
};

/**** Equipment Deatils ****/

exports.get_detail = (req, res, next) => {
    Equipment.findById(req.params.id, (err, equip) => {
        if(err) return next(err);
        res.render('equipment/detail', {
            title: 'Show Detail',
            equip: equip,
            user: req.user,
        });
    });
};

/**** Create New Equipment ****/

exports.get_new = (req, res, next) => {
    res.render('equipment/create', {
        title: 'Create Equipment',
        user: req.user,
    });
};

exports.post_create = (req, res, next) => {
    let equipment = new Equipment(
        {
            equipment_name: req.body.equipment_name,
            equipment_location: req.body.equipment_location,
            equipment_details: req.body.equipment_details,
            equipment_date: new Date().toLocaleString("en-US", {timeZone: "America/Denver"}),
        }
    );
    equipment.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/equipment')
    });
};

/**** Update Exsiting Equipment ****/

exports.get_edit = (req, res, next) => {
    Equipment.findById(req.params.id, (err, equip) => {
        if(err) return next(err);
        console.log('Update/EDIT');
        res.render('equipment/update', {
            title: 'Edit',
            equip: equip,
            user: req.user,
        });
    })
};

exports.post_update = (req, res, next) => {
    Equipment.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, equip) => {
        {
            if (err) return next(err);
            res.redirect('/equipment');
        }
    });
};

/**** Delete Exsiting Equipment ****/

exports.delete_remove = (req, res, next) => {
    Equipment.findByIdAndRemove(req.params.id, (err) => {
        if(err) return next(err);
        console.log('Deleted Sucsessfully');
        res.redirect('/equipment');
    })
};