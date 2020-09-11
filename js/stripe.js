// Set your publishable key: remember to change this to your live publishable key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
var stripe = Stripe(process.env.STRIPE_TEST_KEY);
var elements = stripe.elements();
