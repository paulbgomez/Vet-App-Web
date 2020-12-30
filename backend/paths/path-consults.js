module.exports = function consultsHandler({ consults, doctors, mascots }) {
  return {
    get: (data, callback) => {
      if (data.index) {
        console.log('handler consultas', { data });
        if (consults[data.index]) {
          return callback(200, consults[data.index]);
        }
        return callback(404, {
          message: `consult with index ${data.index} not found`,
        });
      }
      const crossedConsults = consults.map((consult) => ({
        ...consult,
        doctor: {
          ...doctors[consult.doctor],
          id: consult.doctor,
        },
        mascot: { ...mascots[consult.mascot], id: consult.mascot },
      }));
      callback(200, crossedConsults);
    },
    post: (data, callback) => {
      let newConsult = data.payload;
      newConsult.creationDate = new Date();
      newConsult.editionDate = null;
      consults = [...consults, newConsult];
      callback(201, newConsult);
    },
    put: (data, callback) => {
      if (typeof data.index !== 'undefined') {
        if (consults[data.index]) {
          const { creationDate } = consults[data.index];
          consults[data.index] = {
            ...data.payload,
            creationDate,
            editionDate: new Date(),
          };
          return callback(200, consults[data.index]);
        }
        return callback(404, {
          message: `consult with index ${data.index} not found`,
        });
      }
      callback(400, { message: 'index not sent' });
    },
    delete: (data, callback) => {
      if (typeof data.index !== 'undefined') {
        if (consults[data.index]) {
          consults = consults.filter((_consult, index) => index != data.index);
          return callback(204, {
            message: `element with index ${data.index} erased`,
          });
        }
        return callback(404, {
          message: `consult with index ${data.index} not found`,
        });
      }
      callback(400, { message: 'index not sent' });
    },
  };
};
