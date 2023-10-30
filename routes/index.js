var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/send-sms', (req, res, next) => {

  try {
    const io = req.app.get('socketio');
    const { to, message } = req.body

    const payload = { to, message }

    io.emit('send-sms', payload)

    res.json({
      message: "Sent"
    })
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
})

module.exports = router;
