import Image from 'next/image'
import Header from "../components/Header"
import { useSelector } from 'react-redux'
import { selectItems, selectTotal } from '../slices/basketSlice'
import CheckoutProduct from '../components/CheckoutProduct'
import { useSession } from 'next-auth/client'
import Currency from 'react-currency-formatter'
import Footer from '../components/Footer'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'


const publishableKey = process.env.stripe_public_key.toString();

const stripePromise = loadStripe(publishableKey);

function Checkout() {
    const items = useSelector(selectItems);
    const [session] = useSession();
    const total = useSelector(selectTotal)

    const createCheckoutSession = async () => {
        const stripe = await stripePromise;

        //call the backend to create a checkout session...
        const checkoutSession = await axios.post(
            "/api/create-checkout-session",
            {
                items,
                email: session.user.email,
            });

        //After have created a session , redirect user/client to stripe checkout

        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
        });

        if (result.error) {
            alert(result.error.message);
        }
    };

    return (
        <div className='bg-gray-100'>
            <Header />

            <main className='lg:flex max-w-screen-2xl mx auto'>
                {/* Left */}
                <div className='flex-grow m-5 shadow-sm'>
                    <Image
                        loading='lazy'
                        src='/assets/images/mini-banner1.jpg'
                        width={1020}
                        height={250}
                        objectFit='contain'
                    />

                    <div className='flex flex-col p-5 space-y-10 bg-white'>
                        <h1 className='text-2xl border-b pb-4'>
                            {items.length === 0 ? "Your Cart is empty"
                                : "Shopping Cart"
                            }
                        </h1>

                        {items.map((item, i) => (
                            <CheckoutProduct
                                key={i}
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                description={item.description}
                                category={item.category}
                                image={item.image}
                                hasPrime={item.hasPrime}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>

                {/* Right */}
                <div className="flex flex-col bg-white p-10 shadow-md">
                    {items.length > 0 && (
                        <>
                            <h2 className='whitespace-nowrap'>
                                Subtotal ({items.length}) items:{" "}
                                <span className='font-bold'>
                                    <Currency quantity={total} currency='GBP' />
                                </span>
                            </h2>

                            <button
                                role="link"
                                onClick={createCheckoutSession}
                                disabled={!session}
                                className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}
                            >
                                {!session ? "Sign In to Checkout" : "Proceed to Checkout"}
                            </button>
                        </>
                    )}
                </div>
            </main >
            <Footer />
        </div >
    )
}

export default Checkout
