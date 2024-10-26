const { Router } = require("express");
const adminRoutes = require("./routerAdmin");
const AdminController = require('../controller/AdminController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = Router();

 //api/admin/
router.use('/admin', adminRoutes);


router.post('/login', (req, res) => {
    AdminController.login(req, res)
});


module.exports = router;
