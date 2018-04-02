const {Router} = require('express')
const router = Router()

router.get('/api/test', (req, res) => {
  res.send('testing success')
})

module.exports = router
