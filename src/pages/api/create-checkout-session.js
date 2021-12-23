//everything underneath "/api/" folder is BACKEND code !
//here we are on a Node.js backend



const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    const { items, email } = req.body;

    const transformedItems = items.map((item) => ({
        price_data: {
            currency: 'gbp',
            product_data: {
                name: item.title,
                images: [item.image],
            },
            unit_amount: item.price * 100,
        },
        quantity: 1,
        description: item.description,
    }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_rates: ["shr_1K9RcCSFtymklGIXREOyfwUh"],
        shipping_address_collection: {
            allowed_countries: ["GB", "US", "CA"],
        },
        line_items: transformedItems,
        mode: "payment",
        success_url: `${process.env.HOST}/success`,//stripe takes us to success page if payment is successfull
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map((item) => item.image)),
        },
    })

    console.log("session created! ", session.id)
    res.status(200).json({
        id: session.id
    })

}

//the reason we use async is so that loading
//stripe doesn't block the UI and ruin the UX of the website