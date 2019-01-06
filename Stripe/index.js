require("dotenv").config()

const { STRIPE_SECRET_KEY } = process.env

const stripe = require("stripe")(STRIPE_SECRET_KEY)

const setupJobHustlerProduct = async () => {
  const product = await stripe.products.create({
    name: "Job Hustler Subscription",
    type: "service",
  })

  console.log("Product created from Stripe is ", product)

  const { id } = product

  return id
}

const createJobHustlerSubscriptions = async productID => {
  const result = await stripe.plans.create({
    product: productID,
    nickname: "9.99 Monthly Subscription",
    currency: "usd",
    interval: "month",
    amount: 999,
  })

  console.log("Stripe Plan Creation result ", result)

  return result
}

const setupStripe = async () => {
  const StripeProductID = await setupJobHustlerProduct()

  await createJobHustlerSubscriptions(StripeProductID)
}

setupStripe()
