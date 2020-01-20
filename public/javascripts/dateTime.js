const date = require('date-and-time');

exports.GMTdateTime = () => {
    const now = new Date();
    const GMT = date.addHours(now, -6);
    return myDate = date.format(GMT, 'MM/DD/YYYY HH:mm:ss',true);
  };

  exports.GMTdate = () => {
    const now = new Date();
    const GMT = date.addHours(now, -6);
    return myDate = date.format(GMT, 'MM/DD/YYYY',true);
  };
  