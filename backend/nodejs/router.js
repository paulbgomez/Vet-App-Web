const resources = require('./resources');
const mascotsHandler = require('./paths/path-mascots');
const doctorsHandler = require('./paths/path-doctors');
const ownersHandler = require('./paths/path-owners');
const consultsHandler = require('./paths/path-consults');

module.exports = {
  mascots: mascotsHandler(resources.mascots),
  doctors: doctorsHandler(resources.doctors),
  owners: ownersHandler(resources.owners),
  consults: consultsHandler(resources),
  notFound: (_data, cb) => {
    cb(404, { message: 'Not Found' });
  },
};
