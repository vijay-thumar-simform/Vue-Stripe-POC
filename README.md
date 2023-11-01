# Vue-Stripe-POC

## Creating an stripe account
**Step 1:** Go to stripe dashboard and create acoount [Stripe Dashboard login](https://dashboard.stripe.com/login) ||
[Stripe Dashboard SignUp](https://dashboard.stripe.com/register)

![0 1](https://github.com/vijay-thumar-simform/Vue-Stripe-POC/assets/134591697/55b05d76-8614-4db4-ba8e-ef8b14d7acad)

**Step 2:**  Click Get Started and go to next page and click Api keys for developer and save both api keys in your env file
![0 2](https://github.com/vijay-thumar-simform/Vue-Stripe-POC/assets/134591697/155e91ea-a86a-494d-ad7c-45cd5b5d3f02)

---
#### .env
```
VITE_STRIPE_PUBLISHABLE_KEY = "public key"
VITE_STRIPE_PRIVATE_KEY = "private Key" 
```
---


**Step 3:** Now activate client side integration from dashboard
[Dashboard checkout integration](https://dashboard.stripe.com/settings/checkout)
![1  enable client side integration from dashboard](https://github.com/vijay-thumar-simform/Vue-Stripe-POC/assets/134591697/95be7b3a-7db3-4dbc-b97c-94c397db0a09)

Add account name as per image suggest
![1](https://github.com/vijay-thumar-simform/Vue-Stripe-POC/assets/134591697/d7762d11-bf1c-4fdb-82e7-421ef16a241d)

Allow in prompt for enable client integration
![1 1 allow](https://github.com/vijay-thumar-simform/Vue-Stripe-POC/assets/134591697/9eeac319-60a3-4392-ab65-1037a58201e1)

**Step 4:** Create Product Search for product like shown in images and create new one [Create Product](https://dashboard.stripe.com/products/create)

Make sure to include meta data into product **key: price value: 20**

**Step 5:** For testing refund you have to clone another repo code that is node js [node-stripe-poc](https://github.com/vijay-thumar-simform/Node-Stripe-POC)
