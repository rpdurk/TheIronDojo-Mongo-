const router = require('express').Router();

const accountController = require('../../../controllers/accountController');

const authMiddleware = require('../../../middlewares/authorizationMiddleware');
router.use(authMiddleware);

// at api/account/:id
router
  .route('/:id')
  // creates an account
  // .post(accountController.createAccounts)
  // Gets all accounts by user Id
  .get(accountController.getUserData);
// Updates a account by account Id
// .patch(accountController.updateaccountsByaccountId)
// Deletes a account by account Id
// .delete(accountController.deleteaccount)

module.exports = router;
