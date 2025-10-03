import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const checkoutSession = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const userId = req.user.id;
    console.log(cartItems);
    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.courseId.title,
          images: [`${process.env.BACKEND_URL}/${item.courseId.imgUrl}`],
        },
        unit_amount: item.courseId.discountedPrice * 100,
      },
      quantity: item.qty,
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: {
        userId: userId,
        cart: JSON.stringify(
          cartItems.map((i) => ({
            courseId: i.courseId._id,
            qty: i.qty,
          }))
        ),
      },
    });
    res.json({ success: true, message: "Payment Success", url: session.url });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
