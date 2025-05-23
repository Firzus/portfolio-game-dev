import { config } from 'dotenv'
import { Pool } from 'pg'
import { readFileSync } from 'fs'
import { join } from 'path'

// Charger les variables d'environnement
config({ path: '.env.local' })

async function setupDatabase() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
    ssl: {
      rejectUnauthorized: false
    }
  })

  try {
    console.log('🔧 Configuration de la base de données...')
    
    // Lire le fichier SQL
    const sqlPath = join(__dirname, 'create-tables.sql')
    const sql = readFileSync(sqlPath, 'utf8')
    
    // Exécuter le SQL
    const client = await pool.connect()
    await client.query(sql)
    console.log('✅ Tables créées avec succès !')
    
    // Vérifier les tables créées
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `)
    
    console.log('📋 Tables créées:')
    result.rows.forEach(row => {
      console.log(`  - ${row.table_name}`)
    })
    
    client.release()
    await pool.end()
    
  } catch (error) {
    console.error('❌ Erreur lors de la configuration:', error)
    throw error
  }
}

// Exécuter si appelé directement
if (require.main === module) {
  setupDatabase()
    .then(() => {
      console.log('🎉 Base de données configurée avec succès !')
      process.exit(0)
    })
    .catch((error) => {
      console.error('💥 Erreur:', error)
      process.exit(1)
    })
}

export { setupDatabase }
