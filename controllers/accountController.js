const db = require('../model');

module.exports = {
  getUserData: async (req, res) => {
    const id = req.user._id;
    try {
      res.json(await db.User.findOne({ _id: id }));
    } catch (e) {
      console.log('accountController getUserData', e);
      res.status(500).json(e);
    }
  },
  updateByUserId: async (req, res) => {
    const id = req.user._id;
    console.log(req.user);
    try {
      res.json(
        await db.User.findOneAndUpdate(
          { _id: id },
          {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
          }
        )
      );
    } catch (e) {
      console.log('accountController updateByUserId', e);
      res.status(500).json(e);
    }
  },
};
