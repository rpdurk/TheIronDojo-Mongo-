const db = require('../model');

module.exports = {
  getUserData: async (req, res) => {
    const id = req.params.id;
    try {
      res.json(await db.User.findOne({ _id: id }));
      console.log(res);
    } catch (e) {
      console.log('accountController getUserData', e);
      res.status(401).json(e);
    }
  },
};
