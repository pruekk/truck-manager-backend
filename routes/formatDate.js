const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

const formatDate = (stringDate) => {
    return dayjs(stringDate).subtract(7, 'hour').utcOffset(0, true).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
};

module.exports = { formatDate }
