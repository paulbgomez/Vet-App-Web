module.exports = function doctorsHandler(doctors) {
  return {
    get: (data, cb) => {
      if (data.index) {
        if (doctors[data.index]) {
          return cb(200, doctors[data.index]);
        }
        return cb(404, {
          message: `doctor with the index ${data.index} not found`,
        });
      }
      cb(200, doctors);
    },
    put: (data, cb) => {
      if (data.index) {
        if (doctors[data.index]) {
          doctors[data.index] = data.payload;
          return cb(200, doctors[data.index]);
        }
        return cb(404, {
          message: `doctor with the index ${data.index} not found`,
        });
      }
      cb(400, { message: `${index} not found` });
    },
    delete: (data, cb) => {
      if (data.index) {
        if (doctors[data.index]) {
          doctors = doctors.filter((_doctor, index) => index != data.index);
          return cb(204, { message: `doctor deleted` });
        }
        return cb(404, {
          message: `doctor with the index ${data.index} not found`,
        });
      }
      cb(400, { message: `${index} not found` });
    },
    post: (data, cb) => {
      doctors = [...doctors, data.payload];
      cb(201, data.payload);
    },
  };
};
