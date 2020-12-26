const homeController = require("../app/http/controllers/homeController");
const cartController = require("../app/http/controllers/customers/cartController");
const authController = require("../app/http/controllers/authController");
const orderController = require("../app/http/controllers/customers/orderController");
const adminOrderController  = require("../app/http/controllers/admin/orderController");
const statusController  = require("../app/http/controllers/admin/statusController");

// MiddleWares
const guest = require("../app/http/middleware/guest");
const auth = require("../app/http/middleware/auth");
const admin = require("../app/http/middleware/admin");


function initRoutes(app) {

    
    app.get("/", homeController().index);

    app.get("/login", guest, authController().login);
    app.post("/login", authController().postLogin);

    app.get("/register", guest, authController().register);
    app.post("/register", authController().postRegister);

    app.get("/cart", cartController().index);

    app.post("/update-cart", cartController().update);

    app.post("/logout", authController().logout);

    

    // Customer routes
    app.post("/orders", auth, orderController().store);
    app.get("/customer/orders", auth, orderController().index);
    app.get("/customer/orders/:id", auth, orderController().show);


    // Admin routes
     app.get("/admin/orders", admin, adminOrderController().index);
     app.post("/admin/orders/status", admin, statusController().update);

}


module.exports = initRoutes;