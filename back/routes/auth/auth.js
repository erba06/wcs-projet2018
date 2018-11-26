const express = require('express')
const router = express.Router()
const connection = require('../../helpers/db.js')
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/signup', (req, result, next) => {
  const query = connection.query(
    'INSERT INTO translationrequests (requestType, deadline, clientName, domain, sourceLanguage, targetLanguage, qualification, orderNumber, pathName, comments) VALUE (?,?,?,?,?,?,?,?,?,?)',
    [
      req.body.requestType,
      req.body.deadline,
      req.body.clientName,
      req.body.domain,
      req.body.sourceLanguage,
      req.body.targetLanguage,
      req.body.qualification,
      req.body.orderNumber,
      req.body.pathName,
      req.body.comments
    ],
    (error, res, fields) => {
      if (error) {
        console.log(error)
      } else {
        console.log('The solution is: ', res)
      }
    }
  )
})

router.get('/signup', (req, res, next) => {
  const query = connection.query('SELECT * from translationrequests', function (
    err,
    res,
    fields
  ) {
    if (!err) {
      res.status(200).json({ flash: 'The request has been sent !' })
      /* console.log("The solution is: ", res); */
    } else {
      res.status(500).json({ flash: error.message })
      /* console.log("Error while performing Query."); */
    }
  })

  connection.end()
})

module.exports = router
