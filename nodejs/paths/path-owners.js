module.exports = function ownersHandler(owners) {
  return {
    get: (data, cb) => {
      if (data.index) {
        if (owners[data.index]) {
          return cb(200, owners[data.index]);
        }
        return cb(404, {
          message: `owner with the index ${data.index} not found`,
        });
      }
      cb(200, owners);
    },
    put: (data, cb) => {
      if (data.index) {
        if (owners[data.index]) {
          owners[data.index] = data.payload;
          return cb(200, owners[data.index]);
        }
        return cb(404, {
          message: `owner with the index ${data.index} not found`,
        });
      }
      cb(400, { message: `${index} not found` });
    },
    delete: (data, cb) => {
      if (data.index) {
        if (owners[data.index]) {
          owners = owners.filter((_owner, index) => index != data.index);
          return cb(204, { message: `owner deleted` });
        }
        return cb(404, {
          message: `owner with the index ${data.index} not found`,
        });
      }
      cb(400, { message: `${index} not found` });
    },
    post: (data, cb) => {
      owners.push(data.payload);
      cb(201, data.payload);
    },
  };
};
