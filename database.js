const Pool = require('pg').Pool
const pool = new Pool({
  user: 'wrkeijplxrgbwt',
  host: 'ec2-35-171-31-33.compute-1.amazonaws.com',
  database: 'dfnv93lt2g908f',
  password: 'ceadf1280b80380f812ec8de93d1cf6bc236f315c5e07f68b8f32188bb2d02e2',
  port: 5432,
  ssl:true
})
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0" // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs

const getUsersList = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const insertUser = (request, response) => {
    const { username,name, password } = request.body
  
    pool.query('INSERT INTO users (username, name, password) VALUES ($1, $2, $3)', [username,name, password], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User add successfully `)
    })
}
const updateUserById = (request, response) => {
    const id = parseInt(request.params.id)
    const { username,name, password } = request.body
  
    pool.query(
      'UPDATE users SET username = $1, name = $2 , password = $3 WHERE id = $3',
      [username,name, password, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`update user with ID: ${id} sucessfully`)
      }
    )
  }
  
  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`user deleted with ID: ${id}`)
    })
  }

module.exports = {
    getUsersList,
    getUserById,
    insertUser,
    updateUserById,
    deleteUser,
  }