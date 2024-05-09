const router = require('express').Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');

//create orders

router.post('/orders', (req, res) => {
  console.log(req.body);
  try {
    console.log(process.env.KEY_ID, process.env.KEY_SECRET);
    const instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });

    // console.log(instance);

    const options = {
      amount: req.body.amount * 100,
      currency: 'INR',
      receipt: crypto.randomBytes(10).toString('hex'),
    };

    console.log(options);

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: error.error });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
});

// payment verification

router.post('/verify', async (req, res) => {
  try {
    const { razorpay_signature, razorpay_payment_id, razorpay_order_id } =
      req.body;

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: 'Payment verified successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid Signature sent' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error!' });
  }
});

module.exports = router;
