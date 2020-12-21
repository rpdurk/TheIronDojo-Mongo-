const router = require('express').Router();

const accountController = require('../../../controllers/accountController');

const authMiddleware = require('../../../middlewares/authorizationMiddleware');
router.use(authMiddleware);

// at api/account/details
router
  .route('/details')
  // creates an account
  // .post(accountController.createAccounts)
  // Gets all accounts by user Id
  .get(accountController.getUserData)
  // Updates a account by account Id
  .patch(accountController.updateByUserId)
  // Deletes a account by account Id
  .delete(accountController.deleteAccount);

module.exports = router;
