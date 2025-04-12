const { default: mongoose } = require("mongoose");

const BoundsSchema = new mongoose.Schema({
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  }
});

const PointSchema = new mongoose.Schema({
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  }
});

const ContoursSchema = new mongoose.Schema({
  FACE: {
    type: [PointSchema],
    required: true
  },
  LEFT_EYEBROW_TOP: {
    type: [PointSchema],
    required: true
  },
  LEFT_EYEBROW_BOTTOM: {
    type: [PointSchema],
    required: true
  },
  RIGHT_EYEBROW_TOP: {
    type: [PointSchema],
    required: true
  },
  RIGHT_EYEBROW_BOTTOM: {
    type: [PointSchema],
    required: true
  },
  LEFT_EYE: {
    type: [PointSchema],
    required: true
  },
  RIGHT_EYE: {
    type: [PointSchema],
    required: true
  },
  UPPER_LIP_TOP: {
    type: [PointSchema],
    required: true
  },
  UPPER_LIP_BOTTOM: {
    type: [PointSchema],
    required: true
  },
  LOWER_LIP_TOP: {
    type: [PointSchema],
    required: true
  },
  LOWER_LIP_BOTTOM: {
    type: [PointSchema],
    required: true
  },
  NOSE_BRIDGE: {
    type: [PointSchema],
    required: true
  },
  NOSE_BOTTOM: {
    type: [PointSchema],
    required: true
  },
  LEFT_CHEEK: {
    type: [PointSchema],
    required: true
  },
  RIGHT_CHEEK: {
    type: [PointSchema],
    required: true
  },
});
const LandmarksSchema = new mongoose.Schema({
  LEFT_CHEEK: {
    type: PointSchema,
    required: true
  },
  LEFT_EAR: {
    type: PointSchema,
    required: true
  },
  LEFT_EYE: {
    type: PointSchema,
    required: true
  },
  MOUTH_BOTTOM: {
    type: PointSchema,
    required: true
  },
  MOUTH_LEFT: {
    type: PointSchema,
    required: true
  },
  MOUTH_RIGHT: {
    type: PointSchema,
    required: true
  },
  NOSE_BASE: {
    type: PointSchema,
    required: true
  },
  RIGHT_CHEEK: {
    type: PointSchema,
    required: true
  },
  RIGHT_EAR: {
    type: PointSchema,
    required: true
  },
  RIGHT_EYE: {
    type: PointSchema,
    required: true
  },
});

const FaceSchema = new mongoose.Schema({
  pitchAngle: {
    type: Number,
    required: true
  },
  rollAngle: {
    type: Number,
    required: true
  },
  yawAngle: {
    type: Number,
    required: true
  },
  bounds: {
    type: BoundsSchema,
    required: true
  },
  leftEyeOpenProbability: {
    type: Number,
    required: true
  },
  rightEyeOpenProbability: {
    type: Number,
    required: true
  },
  smilingProbability: {
    type: Number,
    required: true
  },
  landmarks: {
    type: LandmarksSchema,
    required: false
  },
  contours: {
    type: ContoursSchema,
    required: false
  },
  image: {
    type: String,
    required: true
  },
  imageWidth: {
    type: Number,
    required: true
  },
  imageHeight: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model("Face", FaceSchema);
