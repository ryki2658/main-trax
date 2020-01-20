const Walk = require('../models/walkThrough_model');
const nowGMT = require('../public/javascripts/dateTime');

/**** Walkthrough item created by scaned QR ****/

exports.get_walkReport = (req, res, next) => {
    let myDate = nowGMT.GMTdateTime();
    let walk = new Walk (
        {
            walk_location: req.params.school.toUpperCase()+' '+req.params.item.toUpperCase()+' '+req.params.number,
            walk_scan_date: myDate,
            walk_user: ((req.user)?req.user._id : ''),
        }
    );
    walk.save(function (err){
        if (err) {
            return next(err);
        };
        res.render('walkthrough/newScan', {
            title: 'Scan registered',
            item: walk.walk_location,
            walkID: walk._id,
            user: req.user,
        });
    });
};

/**** Walkthrough Manual Entry ****/

exports.post_create = (req, res, next) => {
    let myDate = nowGMT.GMTdateTime();
    let walk = new Walk (
        {
            walk_location: req.body.walk_location +' '+ req.body.walk_equipType + ' ' + req.body.walk_equipNum,
            walk_motor_lubed: req.body.walk_motor_lubed,
            walk_filter_change: req.body.walk_filter_change,
            walk_details: req.body.walk_details,
            walk_user: ((req.user)?req.user._id : ''),
            walk_scan_date: myDate,
        }
    );
    walk.save(function (err){
        if (err) {
            return next(err);
        };
        res.render('walkthrough/newScan', {
            title: 'Scan registered',
            item: walk.walk_location,
            walkID: walk._id,
            user: req.user,
        });
    });
};

/**** Walkthrough Manual Entry ****/

exports.get_manualEntry = (req, res, next) => {
    res.render('walkthrough/manualEntry', {
        title: 'Manual Entry',
        user: req.user,
    });
};

/**** Walkthrough navigation ****/

exports.get_navigation = (req, res, next) => {
    res.render('walkthrough/walkthroughNav', {
        title: 'Walkthrough',
        admin: 'Show Walkthrough Reports',
        manual: 'Manually Enter Report',
        user: req.user,
    });
};

/**** Walkthrough my Report ****/
exports.get_myReport = (req, res, next) => {
    Walk.find({ walk_user : req.user._id },(err, items) => {
        if(err) return next(err);
        res.render('walkthrough/showReport', {
            title: 'My Scans',
            items: items,
            user: req.user,
        });
    });
};

/**** Walkthrough report ****/

exports.get_report = (req, res, next) => {
    Walk.find((err, items) => {
        if(err) return next(err);
        res.render('walkthrough/showReport', {
            title: 'Report',
            items: items,
            user: req.user,
        });
    });
};


/**** Walkthrough add details page ****/

exports.get_showDeatails = (req, res, next) => {
    Walk.findById(req.params.id, (err, scan) => {
        if (err) return next(err);
        res.render('walkthrough/showDetails', {
            title: 'View Details',
            scan: scan,
            user: req.user,
        });
    });
};

/**** Walkthrough add details page ****/

exports.get_walkDeatails = (req, res, next) => {
    Walk.findById(req.params.id, (err, scan) => {
        if (err) return next(err);
        res.render('walkthrough/walkDetails', {
            title: 'Add Details',
            scan: scan,
            user: req.user,
        });
    });
};

/**** Walkthrough add details ****/

exports.post_addDetails = (req, res, next) => {
    Walk.findByIdAndUpdate(req.params.id, {$set: req.body,}, (err, scan) => {
        if (err) return next(err);
        res.redirect('/')
    });
};
