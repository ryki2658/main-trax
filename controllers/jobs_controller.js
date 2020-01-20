const Job = require('../models/jobs_model');
const User = require('../models/user');
const nowGMT = require('../public/javascripts/dateTime');

/**** Jobs Home ****/
//find({ user : req.user._id }).toArray(function(err, docs){ //Find all the jobs from the logged in user
exports.get_job = (req, res, next) => {
    let jobs;
    User.find((err, users) => {
        if(err) return next(err);
            if (req.user.local.is_admin) {
                console.log(req.user.is_admin);
                Job.find((err, jobs) => {
                    res.render('jobs/showAllJobs', {
                        title: 'All Jobs',
                        jobs: jobs,
                        user: req.user,
                        users: users,
                        selection: req.user.local.firstName + ' ' + req.user.local.lastName,
                    });
                });
            }else {
                console.log(req.user.is_admin);
                Job.find({ job_user : req.user._id },(err, jobs) => {
                    if(err) return next(err);
                        res.render('jobs/showAllJobs', {
                            title: 'All Jobs',
                            jobs: jobs,
                            user: req.user,
                            users: users,
                            selection: req.user.local.firstName + ' ' + req.user.local.lastName,
                        });
                    });
            };
    });
};


exports.get_jobForUser = (req, res, next) => {
    User.find((err, users) => {
        if(err) return next(err);
        if (req.body.sort_selection == 'ALL') {
            Job.find((err, jobs) => {
                if(err) return next(err);
                res.render('jobs/showAllJobs', {
                    title: 'All Jobs',
                    jobs: jobs,
                    user: req.user,
                    users: users,
                    selection: 'ALL USERS'
                })
            });
        } else {
            Job.find({ job_user: req.body.sort_selection },(err, jobs) => {
                if(err) return next(err);
                User.findById(req.body.sort_selection,(err, selection) => {
                    if(err) return next(err);
                    res.render('jobs/showAllJobs', {
                        title: 'All Jobs',
                        jobs: jobs,
                        user: req.user,
                        users: users,
                        selection: selection.local.firstName + ' ' + selection.local.lastName,
                    });
                });
            });
        };
    });
};



/**** Creae New Job ****/

exports.get_new = (req, res, next) => {
    User.find((err, users) => {
        if(err) return next(err);
        res.render('jobs/create', {
            title: 'Create Job',
            user: req.user,
            users: users,
        });
    });
};

exports.post_createJob = (req, res, next) => {
    let myDate = nowGMT.GMTdate();
    if(!req.body.job_user){
        let job = new Job(
            {
                
                job_ID: req.body.job_ID,
                job_location: req.body.job_location,
                job_request: req.body.job_request,
                job_details: req.body.job_details,
                job_create_date: myDate,
                job_status: req.body.job_status,
                job_priority: req.body.job_priority,
                job_user: req.user._id,
                job_userName: req.user.local.firstName + ' ' + req.user.local.lastName
            }
        );
        job.save(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/jobs')
        });
    }else {
        User.findById(req.body.job_user, (err, user) => {
            if (err) return next(err);
            let job = new Job(
                {
                    job_ID: req.body.job_ID,
                    job_location: req.body.job_location,
                    job_request: req.body.job_request,
                    job_details: req.body.job_details,
                    job_create_date: myDate,
                    job_status: req.body.job_status,
                    job_user: req.body.job_user,
                    job_userName: user.local.firstName + ' ' + user.local.lastName
                }
            );

            job.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/jobs')
            });
        });
    };
};

/**** Show Job Detail ****/

exports.get_showJob = (req, res, next) => {
    Job.findById(req.params.id, (err, job) => {
        if (err) return next(err);
        res.render('jobs/showJob', {
            title: 'Show Job',
            job: job,
            user: req.user,
        });
    });
};

/**** Update Job ****/

exports.post_updateJob = (req, res, next) => {
    let myDate = nowGMT.GMTdateTime();
    Job.findByIdAndUpdate(req.params.id, {$set: req.body, job_update_date: myDate}, (err, job) => {
        if (err) return next(err);
        res.redirect('/Jobs')
    });
};

/**** Delete Job ****/

exports.delete_deleteJob = (req, res, next) => {
    Job.findByIdAndRemove(req.params.id, (err) => {
        if (err) return next(err);
        res.redirect('/Jobs')
    });
};
