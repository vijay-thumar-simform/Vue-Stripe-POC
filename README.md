# Vue-Stripe-POC

## Creating an stripe account
**Step 1:** Go to stripe dashboard and create acoount [Stripe Dashboard login](https://dashboard.stripe.com/login) ||
[Stripe Dashboard SignUp](https://dashboard.stripe.com/register)

**Step 2:**  Click Get Started and go to next page and click Api keys for developer and save both api keys in your env file

---
#### .env
```
VITE_STRIPE_PUBLISHABLE_KEY = "public key"
VITE_STRIPE_PRIVATE_KEY = "private Key" 
```

---


**Step 3:** Now activate client side integration from dashboard
[Dashboard checkout integration](https://dashboard.stripe.com/settings/checkout)

Add account name as per image suggest

Allow in prompt for enable client integration

**Step 4:** Create Product Search for product like shown in images and create new one [Create Product](https://dashboard.stripe.com/products/create)

Make sure to include meta data into product **key: price value: 20**

**Step 5:** For testing refund you have to clone another repo code that is node js [node-stripe-poc](https://github.com/vijay-thumar-simform/Node-Stripe-POC)