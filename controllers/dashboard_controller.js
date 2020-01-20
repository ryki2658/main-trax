const News = require('../models/news_model');
const Jobs = require('../models/jobs_model');
const User = require('../models/user');

exports.get_dashboard = (req, res, next) => {
    User.find((err, users) => {
        if(err) return next(err);
        Jobs.find((err, jobs) => {
            if (err) return next(err);
            News.find((err, news) => {
                if(err) return next(err);
                res.render('dashboard', {
                    title: 'Home',
                    user: req.user,
                    news: news,
                    users: users,
                    jobs: jobs,
                });
            });
        });

    });
};