const { Client } = require('pg');

async function checkDatabase() {
  const client = new Client({
    connectionString: "postgres://neondb_owner:npg_yefiD7Zl1WON@ep-delicate-shape-a4h9nxed-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
  });

  try {
    await client.connect();
    console.log('✅ Connected to database successfully!');

    // Check if chat_metadata table exists and get its structure
    const tableInfo = await client.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'chat_metadata'
      ORDER BY ordinal_position;
    `);
    
    console.log('\n📋 Table Structure:');
    console.table(tableInfo.rows);

    // Check current data count
    const countResult = await client.query('SELECT COUNT(*) FROM chat_metadata');
    console.log(`\n📊 Current records in chat_metadata: ${countResult.rows[0].count}`);

    // Show sample of existing data
    const sampleData = await client.query('SELECT * FROM chat_metadata LIMIT 5');
    console.log('\n🔍 Sample existing data:');
    console.table(sampleData.rows);

  } catch (error) {
    console.error('❌ Database error:', error.message);
  } finally {
    await client.end();
  }
}

checkDatabase(); 