const News = require('../models/news_model');

/**** Show News ****/

exports.get_editNews = (req, res, next) => {
    News.find((err, news) => {
        if(err) return next(err);
        res.render('news/showNews', {
            title: 'Edit News',
            user: req.user,
            news: news,
        });
    });
};

/**** news Deatils ****/

exports.get_edit = (req, res, next) => {
    News.findById(req.params.id, (err, news) => {
        if(err) return next(err);
        res.render('news/newsEdit', {
            title: 'Edit News Item',
            news: news,
            user: req.user,
        });
    });
};


/**** Update Exsiting news ****/

exports.post_update = (req, res, next) => {
    News.findByIdAndUpdate(req.params.id, {$set: req.body, news_date: new Date().toLocaleString("en-US", {timeZone: "America/Denver"})}, (err, news) => {
        {
            if (err) return next(err);
            res.redirect('/news');
        }
    });
};

/**** Create new news ****/
/**** Not accessible used to create inital item  ****/

exports.post_create = (req, res, next) => {
    let news = new News(
        {
            news_headline1: req.body.news_headline1,
            news_headline2: req.body.news_headline2,
            news_body1: req.body.news_body1,
            news_body2: req.body.news_body2,
            news_body3: req.body.news_body3,
            news_date: new Date().toLocaleString("en-US", {timeZone: "America/Denver"})
        }
    );
    news.save(function (err) {
        if (err) {
            console.log('Error');
            return next(err);
        }
        res.redirect('/')
    });
};
