const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const Face = require('./models/Face');

const app = express();
app.use(cors({
  origin: '*', // Cho phép tất cả các domain
}));
const port = process.env.PORT || 4000;

const uri = "mongodb+srv://kietpt2003:Kiet2003@facedetection.jgb6gwy.mongodb.net/?retryWrites=true&w=majority&appName=FaceDetection";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("FaceDetection"); // 🧠 Tên database bạn muốn dùng
    console.log("✅ Connected to MongoDB!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

app.use(express.json({ limit: '10mb' }));

app.post('/face', async (req, res) => {
  try {
    console.log("📥 Received face data:", req.body);
    const centerFaceData = req.body.centerFaceData;
    const leftFaceData = req.body.leftFaceData;
    const rightFaceData = req.body.rightFaceData;
    const upperFaceData = req.body.upperFaceData;
    const bottomFaceData = req.body.bottomFaceData;

    const centerPhoto = req.body.centerPhoto;
    const leftPhoto = req.body.leftPhoto;
    const rightPhoto = req.body.rightPhoto;
    const upperPhoto = req.body.upperPhoto;
    const bottomPhoto = req.body.bottomPhoto;

    const imageWidth = req.body.width;
    const imageHeight = req.body.height;

    if (centerFaceData && centerPhoto) {
      const face = new Face({
        bounds: centerFaceData.bounds,
        landmarks: centerFaceData.landmarks ? centerFaceData.landmarks : undefined,
        contours: centerFaceData.contours ? centerFaceData.contours : undefined,
        pitchAngle: centerFaceData.pitchAngle,
        rollAngle: centerFaceData.rollAngle,
        yawAngle: centerFaceData.yawAngle,
        leftEyeOpenProbability: centerFaceData.leftEyeOpenProbability,
        rightEyeOpenProbability: centerFaceData.rightEyeOpenProbability,
        smilingProbability: centerFaceData.smilingProbability,
        image: centerPhoto,
        imageWidth: imageWidth,
        imageHeight: imageHeight,
      })
      const result = await db.collection('face').insertOne(face);
    }
    if (leftFaceData && leftPhoto) {
      const face = new Face({
        bounds: leftFaceData.bounds,
        landmarks: leftFaceData.landmarks ? leftFaceData.landmarks : undefined,
        contours: leftFaceData.contours ? leftFaceData.contours : undefined,
        pitchAngle: leftFaceData.pitchAngle,
        rollAngle: leftFaceData.rollAngle,
        yawAngle: leftFaceData.yawAngle,
        leftEyeOpenProbability: leftFaceData.leftEyeOpenProbability,
        rightEyeOpenProbability: leftFaceData.rightEyeOpenProbability,
        smilingProbability: leftFaceData.smilingProbability,
        image: leftPhoto,
        imageWidth: imageWidth,
        imageHeight: imageHeight,
      })
      const result = await db.collection('face').insertOne(face);
    }
    if (rightFaceData && rightPhoto) {
      const face = new Face({
        bounds: rightFaceData.bounds,
        landmarks: rightFaceData.landmarks ? rightFaceData.landmarks : undefined,
        contours: rightFaceData.contours ? rightFaceData.contours : undefined,
        pitchAngle: rightFaceData.pitchAngle,
        rollAngle: rightFaceData.rollAngle,
        yawAngle: rightFaceData.yawAngle,
        leftEyeOpenProbability: rightFaceData.leftEyeOpenProbability,
        rightEyeOpenProbability: rightFaceData.rightEyeOpenProbability,
        smilingProbability: rightFaceData.smilingProbability,
        image: rightPhoto,
        imageWidth: imageWidth,
        imageHeight: imageHeight,
      })
      const result = await db.collection('face').insertOne(face);
    }
    if (upperFaceData && upperPhoto) {
      const face = new Face({
        bounds: upperFaceData.bounds,
        landmarks: upperFaceData.landmarks ? upperFaceData.landmarks : undefined,
        contours: upperFaceData.contours ? upperFaceData.contours : undefined,
        pitchAngle: upperFaceData.pitchAngle,
        rollAngle: upperFaceData.rollAngle,
        yawAngle: upperFaceData.yawAngle,
        leftEyeOpenProbability: upperFaceData.leftEyeOpenProbability,
        rightEyeOpenProbability: upperFaceData.rightEyeOpenProbability,
        smilingProbability: upperFaceData.smilingProbability,
        image: upperPhoto,
        imageWidth: imageWidth,
        imageHeight: imageHeight,
      })
      const result = await db.collection('face').insertOne(face);
    }
    if (bottomFaceData && bottomPhoto) {
      const face = new Face({
        bounds: bottomFaceData.bounds,
        landmarks: bottomFaceData.landmarks ? bottomFaceData.landmarks : undefined,
        contours: bottomFaceData.contours ? bottomFaceData.contours : undefined,
        pitchAngle: bottomFaceData.pitchAngle,
        rollAngle: bottomFaceData.rollAngle,
        yawAngle: bottomFaceData.yawAngle,
        leftEyeOpenProbability: bottomFaceData.leftEyeOpenProbability,
        rightEyeOpenProbability: bottomFaceData.rightEyeOpenProbability,
        smilingProbability: bottomFaceData.smilingProbability,
        image: bottomPhoto,
        imageWidth: imageWidth,
        imageHeight: imageHeight,
      })
      const result = await db.collection('face').insertOne(face);
    }
    res.status(201).json("doned");
  } catch (err) {
    console.error("❌ Error saving face:", err);
    res.status(400).json({ error: err.message });
  }
});

app.get('/faces', async (req, res) => {
  try {
    // Lấy page và limit từ query param, mặc định là trang 1, mỗi trang 10 face
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Tính số lượng skip
    const skip = (page - 1) * limit;

    // Lấy face từ DB theo skip và limit
    const faces = await db
      .collection('face')
      .find()
      .skip(skip)
      .limit(limit)
      .toArray();

    // Đếm tổng số face để tính totalPages
    const totalFaces = await db.collection('face').countDocuments();
    const totalPages = Math.ceil(totalFaces / limit);

    res.json({
      currentPage: page,
      totalPages,
      totalFaces,
      faces,
    });
  } catch (err) {
    console.error('❌ Error fetching faces:', err);
    res.status(500).json({ error: 'Failed to fetch faces' });
  }
});

// Test GET
app.get('/', (req, res) => {
  res.send('Hello from Node.js + MongoDB!');
});

// 🛫 Start server sau khi kết nối xong
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
});
