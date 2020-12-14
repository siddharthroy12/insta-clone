const express = require('express')
const request = require('request')

const router = express.Router()

router.post('/', (req, res) => {
    const forwardReqConfig = {
        url: `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_KEY}`,
    }
    req.pipe(request.post(forwardReqConfig)).pipe(res)
})

module.exports = router