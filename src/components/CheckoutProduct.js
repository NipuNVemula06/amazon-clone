import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid'
import Currency from 'react-currency-formatter'
import { useDispatch } from 'react-redux'
import { addToBasket, removeFromBasket } from '../slices/basketSlice'


function CheckoutProduct({ id, title, price, description, category, image, hasPrime, rating }) {

    const dispatch = useDispatch();

    const addItemToBasket = () => {
        const product = {
            id, title, price, description, category, image, hasPrime, rating
        }

        //push item into redux
        dispatch(addToBasket(product))
    }

    const removeItemFromBasket = () => {

        //remove item from basket
        dispatch(removeFromBasket({ id }))
    }

    return (
        <>
            <div className="grid grid-cols-5 shadow p-3 ">
                <Image
                    src={image} height={200} width={200} objectFit='contain' />

                {/* Middle */}
                <div className="col-span-3 mx-5">
                    <p>{title}</p>
                    <div className="flex">
                        {Array(rating)
                            .fill()
                            .map((_, i) => (
                                <StarIcon key={id} className='h-5 text-yellow-500' />
                            ))
                        }
                    </div>
                    <p className='text-xs my-2 line-clamp-3'>{description}</p>
                    <Currency quantity={price} />

                    {hasPrime && (
                        <div className='flex items-center space-x-2 -mt-5'>
                            <img
                                className='w-12 mt-10'
                                loading='lazy'
                                src='/assets/images/prime.png'
                                alt='prime logo'
                            />
                            <p className='mt-10 text-xs text-gray-500'>FREE Next-day Delivery</p>
                        </div>
                    )}
                </div>

                {/* right add and remove buttons */}
                <div className='flex flex-col space-y-2 my-auto justify-self-end mr-4'>
                    <button className='button' onClick={addItemToBasket}>
                        Add One More
                    </button>
                    <button className='button' onClick={removeItemFromBasket}>
                        Remove from Basket
                    </button>
                </div>
            </div>
        </>
    )
}

export default CheckoutProduct
