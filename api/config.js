module.exports = (req, res) => {
  let config = null;

  function parseConfigString(str) {
    if (!str) return null;
    if (typeof str === "object") return str;
    try {
      return JSON.parse(str);
    } catch (e) {
      const apiKey = (str.match(/apiKey\s*:\s*["']([^"']+)["']/) || [])[1];
      const authDomain = (str.match(/authDomain\s*:\s*["']([^"']+)["']/) || [])[1];
      const projectId = (str.match(/projectId\s*:\s*["']([^"']+)["']/) || [])[1];
      const storageBucket = (str.match(/storageBucket\s*:\s*["']([^"']+)["']/) || [])[1];
      const messagingSenderId = (str.match(/messagingSenderId\s*:\s*["']([^"']+)["']/) || [])[1];
      const appId = (str.match(/appId\s*:\s*["']([^"']+)["']/) || [])[1];
      const databaseURL = (str.match(/databaseURL\s*:\s*["']([^"']+)["']/) || [])[1];

      if (apiKey && projectId) {
        return { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, databaseURL };
      }
    }
    return null;
  }

  // 1. Kiểm tra biến môi trường FIREBASE_CONFIG trên Vercel
  if (process.env.FIREBASE_CONFIG) {
    config = parseConfigString(process.env.FIREBASE_CONFIG);
  }

  // 2. Kiểm tra các biến môi trường riêng lẻ
  if (!config || !config.apiKey) {
    if (process.env.FIREBASE_API_KEY && process.env.FIREBASE_PROJECT_ID) {
      config = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN || `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || `${process.env.FIREBASE_PROJECT_ID}.firebasestorage.app`,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "",
        appId: process.env.FIREBASE_APP_ID || "",
        databaseURL: process.env.FIREBASE_DATABASE_URL || ""
      };
    }
  }

  // 3. Dự phòng mặc định dự án xulyhoso-5ff7d (nếu Vercel chưa đặt biến môi trường)
  if (!config || !config.apiKey) {
    config = {
      apiKey: "AIzaSyAheRZfnHiAuoUy83qJ71ZkIkDUIAhlaZU",
      authDomain: "xulyhoso-5ff7d.firebaseapp.com",
      databaseURL: "https://xulyhoso-5ff7d-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "xulyhoso-5ff7d",
      storageBucket: "xulyhoso-5ff7d.firebasestorage.app",
      messagingSenderId: "956992807846",
      appId: "1:956992807846:web:6c520182f2380726242567"
    };
  }

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

  // Đóng gói Base64 để bảo mật, không để lộ cấu trúc plain-text trong Network tab
  const encoded = Buffer.from(JSON.stringify(config)).toString("base64");
  return res.status(200).json({ d: encoded });
};
