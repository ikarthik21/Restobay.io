let mix = require('laravel-mix');

mix.js('resources/js/odbt.js', 'public/js/odbt.js').js('resources/js/app.js', 'public/js/app.js').js('resources/js/login.js', 'public/js/login.js').js('resources/js/orders.js', 'public/js/orders.js').js('resources/js/orderAdmin.js', 'public/js/orderAdmin.js').js('resources/js/admin.js', 'public/js/admin.js').js('resources/js/customer/orderstat.js', 'public/js/orderstat.js').js('resources/js/feedback.js', 'public/js/feedback.js')
.js('resources/js/bookings.js', 'public/js/bookings.js').js('resources/js/subscribers.js', 'public/js/subscribers.js')

.sass('resources/scss/app.scss', 'public/css/app.css').sass('resources/scss/signfrm.scss', 'public/css/signfrm.css').sass('resources/scss/order.scss', 'public/css/order.css').sass('resources/scss/cart.scss', 'public/css/cart.css').sass('resources/scss/allorder.scss', 'public/css/allorder.css').sass('resources/scss/admin/adminorder.scss', 'public/css/adminorder.css').sass('resources/scss/customer/singleOrder.scss', 'public/css/singleOrder.css').sass('resources/scss/payments/checkout.scss', 'public/css/payments/checkout.css').sass('resources/scss/book/book.scss', 'public/css/book/book.css');;




// mix.sass('resources/scss/app.scss', 'public/css/app.css').setPublicPath('public/css/app.css');