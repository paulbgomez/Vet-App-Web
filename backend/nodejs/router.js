const resources = require('./resources');
const mascotsHandler = require('./paths/path-mascots');
const doctorsHandler = require('./paths/path-doctors');
const ownersHandler = require('./paths/path-owners');

module.exports = {
  mascots: mascotsHandler(resources.mascots),
  doctors: doctorsHandler(resources.doctors),
  owners: ownersHandler(resources.owners),
  notFound: (data, cb) => {
    cb(404, { message: 'Not Found' });
  },
};
