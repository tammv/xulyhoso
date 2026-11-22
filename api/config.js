module.exports = (req, res) => {
  let config = null;

  // Cách 1: Người dùng đặt 1 biến duy nhất FIREBASE_CONFIG chứa JSON
  if (process.env.FIREBASE_CONFIG) {
    try {
      config = typeof process.env.FIREBASE_CONFIG === "string"
        ? JSON.parse(process.env.FIREBASE_CONFIG)
        : process.env.FIREBASE_CONFIG;
    } catch (e) {
      console.warn("Lỗi parse biến môi trường FIREBASE_CONFIG:", e);
    }
  }

  // Cách 2: Người dùng đặt từng biến riêng biệt trên Vercel
  if (!config || !config.apiKey) {
    config = {
      apiKey: process.env.FIREBASE_API_KEY || "",
      authDomain: process.env.FIREBASE_AUTH_DOMAIN || "",
      projectId: process.env.FIREBASE_PROJECT_ID || "",
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "",
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "",
      appId: process.env.FIREBASE_APP_ID || ""
    };
  }

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

  if (config.apiKey && config.projectId) {
    return res.status(200).json(config);
  }

  return res.status(200).json({ configured: false });
};
