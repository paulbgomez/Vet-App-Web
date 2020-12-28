module.exports = {
  mascots: {
    get: (data, cb) => {
      if (data.index) {
        if (global.resources.mascots[data.index]) {
          return cb(200, global.resources.mascots[data.index]);
        }
        return cb(404, {
          message: `Mascot with the index ${data.index} not found`,
        });
      }
      cb(200, global.resources.mascots);
    },
    put: (data, cb) => {
      if (data.index) {
        if (global.resources.mascots[data.index]) {
          global.resources.mascots[data.index] = data.payload;
          return cb(200, global.resources.mascots[data.index]);
        }
        return cb(404, {
          message: `Mascot with the index ${data.index} not found`,
        });
      }
      cb(400, { message: `${index} not found` });
    },
    delete: (data, cb) => {
      if (data.index) {
        if (global.resources.mascots[data.index]) {
          global.resources.mascots = global.resources.mascots.filter(
            (_mascot, index) => index != data.index
          );
          return cb(204, { message: `Mascot deleted` });
        }
        return cb(404, {
          message: `Mascot with the index ${data.index} not found`,
        });
      }
      cb(400, { message: `${index} not found` });
    },
    post: (data, cb) => {
      global.resources.mascots.push(data.payload);
      cb(201, data.payload);
    },
  },
  notFound: (data, cb) => {
    cb(404, { message: 'Not Found' });
  },
};
