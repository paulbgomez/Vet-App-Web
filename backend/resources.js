module.exports = {
  mascots: [
    {
      type: 'Dog',
      name: 'Rana',
      owner: 'Natalia',
      treatment: 'Vaccination',
    },
    {
      type: 'Cat',
      name: 'Celeste',
      owner: 'Paul',
      treatment: 'Surgery',
    },
  ],
  doctors: [
    {
      name: 'Paul',
      id: '123456',
      specialty: 'Dentistry',
    },
  ],
  owners: [
    {
      name: '',
      email: '',
      phone: '',
    },
  ],
  consults: [
    {
      mascot: 0,
      doctor: 0,
      creationDate: new Date(),
      editionDate: new Date(),
      diagnostic: '',
    },
  ],
};
