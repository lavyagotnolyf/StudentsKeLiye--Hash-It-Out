const db = require('./db');

async function testConnection() {
  try {
    const [rows] = await db.execute('SELECT 1');
    console.log('✅ Database test successful!', rows);
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
  }
}

testConnection();
