import { config } from 'dotenv'
import { Pool } from 'pg'

// Charger les variables d'environnement
config({ path: '.env.local' })

async function testConnection() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
    ssl: {
      rejectUnauthorized: false
    }
  })

  try {
    console.log('🔗 Test de connexion à la base de données...')
    
    // Test de connexion
    const client = await pool.connect()
    console.log('✅ Connexion réussie !')
    
    // Lister les tables existantes
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `)
    
    console.log('📋 Tables existantes:')
    result.rows.forEach(row => {
      console.log(`  - ${row.table_name}`)
    })
    
    client.release()
    await pool.end()
    
  } catch (error) {
    console.error('❌ Erreur de connexion:', error)
  }
}

testConnection()
