// Set your publishable key: remember to change this to your live publishable key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
// var stripe = Stripe(process.env.STRIPE_TEST_KEY);
// var elements = stripe.elements();

const stripe = Stripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
// const stripe = Stripe(process.env.STRIPE_TEST_KEY);
const checkoutButton = document.getElementById("checkout-button");

checkoutButton.addEventListener("click", () => {
  stripe.redirectToCheckout({
    // Make the id field from the Checkout Session creation API response
    // available to this file, so you can provide it as argument here
    // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
    sessionId: "{{CHECKOUT_SESSION_ID}}",
  });
  // If `redirectToCheckout` fails due to a browser or network
  // error, display the localized error message to your customer
  // using `error.message`.
});
