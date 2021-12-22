import Product from "./Product"

function ProductFeed({ products }) {
    return (


        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">

            {products.slice(0, 4).map(({ id, title, price, description, category, image }) => (
                <Product
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    description={description}
                    category={category}
                    image={image}
                />
            ))}


            <img className="md:col-span-full mx-auto"
                src="/assets/images/mini-banner.jpg" alt="mini-banner" />

            <div className='md:col-span-2 h-20'>
                {products.slice(4, 5).map(({ id, title, price, description, category, image, }) => (
                    <Product
                        key={id}
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        image={image}
                    />
                ))}
            </div>

            {products.slice(5, 11).map(({ id, title, price, description, category, image }) => (
                <Product
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    description={description}
                    category={category}
                    image={image}
                />
            ))}

            <img className="md:col-span-full mx-auto"
                src="/assets/images/mini-banner2.jpg" alt="mini-banner" />

            {products.slice(11, products.length - 1).map(({ id, title, price, description, category, image }) => (
                <Product
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    description={description}
                    category={category}
                    image={image}
                />
            ))}

        </div>


    )
}

export default ProductFeed
