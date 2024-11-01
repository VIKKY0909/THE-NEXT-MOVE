                    slidesToScroll: 1,
                    arrows: false,
                },
            },
            { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 }},
            { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1, dots: true }},
            { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false }},
        ],
    };


@@ -71,8 +41,16 @@ const Pslider = () => {
            </header>
            <div className="w-11/12 mx-auto">
                <Slider {...settings}>
                    {product.map((product, index) => (
                        <Pcard key={index} product={product} />
                    {products.map((product) => (
                        <Pcard 
                            key={product._id} 
                            product={{
                                image: product.image,
                                name: product.name,
                                price: product.price,
                                intro: product.shortDescription
                            }} 
                        />
                    ))}
                </Slider>
            </div>
