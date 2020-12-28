module.exports = function mascotsHandler(mascots) {
  return {
    get: (data, cb) => {
      if (data.index) {
        if (mascots[data.index]) {
          return cb(200, mascots[data.index]);
        }
        return cb(404, {
          message: `Mascot with the index ${data.index} not found`,
        });
      }
      cb(200, mascots);
    },
    put: (data, cb) => {
      if (data.index) {
        if (mascots[data.index]) {
          mascots[data.index] = data.payload;
          return cb(200, mascots[data.index]);
        }
        return cb(404, {
          message: `Mascot with the index ${data.index} not found`,
        });
      }
      cb(400, { message: `${index} not found` });
    },
    delete: (data, cb) => {
      if (data.index) {
        if (mascots[data.index]) {
          mascots = mascots.filter((_mascot, index) => index != data.index);
          return cb(204, { message: `Mascot deleted` });
        }
        return cb(404, {
          message: `Mascot with the index ${data.index} not found`,
        });
      }
      cb(400, { message: `${index} not found` });
    },
    post: (data, cb) => {
      mascots.push(data.payload);
      cb(201, data.payload);
    },
  };
};
