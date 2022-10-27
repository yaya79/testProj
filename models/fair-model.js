const { Schema, model } = require("mongoose");

const FairSchema = new Schema({
  municipality: { type: String },
  adress: { type: String },
  dateStart: { type: String },
  dateEnd: { type: String },
  organizer: { type: String },
  contact: { type: String },
  type: { type: String },
  timeStart: { type: String },
  timeEnd: { type: String },
  location: { type: String },
  tradingPlaces: { type: String },
});

module.exports = model("Fair", FairSchema);
