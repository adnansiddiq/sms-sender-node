var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });

  const global = req.app.get('global');
  console.log({ global })

  res.json("I AM HEALTHY")
});

router.post('/send-sms', (req, res, next) => {

  try {

    const { isOnline } = req.app.get('global');

    if (isOnline) {
      const io = req.app.get('socketio');
      const {to, message, reference} = req.body
      io.emit('send-sms', {to, message, reference})
  
      res.json({
        message: "Sent"
      })
    } else {
      res.status(402).json({
        message: "Offline"
      })
    }
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
})

module.exports = router;
