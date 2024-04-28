// สร้างฟังก์ชันสำหรับดึงข้อมูลผู้ใช้
async function fetchUserData() {
  try {
    const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1aiXWRejpJnIoVsaUYpOExphBiVbTI1_7-s2_YXYqWK8/values/log?alt=json&key=AIzaSyBByjB5Nr3CTV4iR6sAcFXwW8M3Q_f0qO8');
    const data = await response.json();

    // ตรวจสอบว่ามีข้อมูลหรือไม่
    if (!data || !data.values || data.values.length === 0) {
      console.log('ไม่พบข้อมูลผู้ใช้');
      return [];
    }

    // สร้างอาร์เรย์ของข้อมูลผู้ใช้
    const userData = data.values.map(row => {
      return {
        username: row[0], // คอลัมน์ A
        password: row[1], // คอลัมน์ B
        name: row[2], // คอลัมน์ C
        email: row[3] // คอลัมน์ D
      };
    });

    return userData;
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
    return [];
  }
}

