function BasketPage() {
    const basket = [
        {
            id: 1,
            name: 'Product 1',
            price: 'Lots!',
        },
    ];

    return (
        <div>
            <h1>Basket</h1>
            <ul>
                {basket.map((item) => (
                    <li key={item.id}>
                        {item.name} - {item.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BasketPage;
