module.exports = class UserDto {
  email;
  id;
  municipality;
  isActivated;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.municipality = model.municipality;
    this.isActivated = model.isActivated;
  }
};
