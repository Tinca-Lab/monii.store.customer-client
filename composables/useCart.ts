export const useCart = () => {

    // composable
    const toast = useToast();

    // store
    const cartStore = useCartStore();

    // data
    const cartItems: any = computed(() => cartStore.items);

    // methods
    const sync = () => {
        const items = localStorage.getItem('cart');
        if (items) {
            cartStore.items = JSON.parse(items);
        }
    };

    const add = (product: any, quantity: number) => {
        const exists = cartStore.items.find((item: any) => item._id === product._id);
        if (exists) {
            toast.add({
                title: 'Error',
                description: 'El producto ya está en el carrito.',
                type: 'warning'
            });
            return;
        }
        cartStore.add({
            ...product,
            quantity,
        });
        localStorage.setItem('cart', JSON.stringify(cartItems.value));
        toast.add({
            title: 'Producto agregado',
            description: 'Hemos agregado el producto al carrito!',
            type: 'success'
        });
    }

    const remove = (product: any) => {
        cartStore.remove(product);
        localStorage.setItem('cart', JSON.stringify(cartItems.value));
        toast.add({
            title: 'Producto eliminado',
            description: 'Hemos eliminado el producto del carrito!',
            type: 'success'
        });
    }

    const clear = () => {
        cartStore.clear();
        localStorage.setItem('cart', JSON.stringify(cartItems.value));
    };

    const increment = (_id: string) => {
        const index = cartStore.items.findIndex((item: any) => item._id === _id);

        if (cartStore.items[index].quantity < 1) {
            return;
        }

        if (cartStore.items[index].variants[0].stock < 1) {
            toast.add({
                title: 'Error',
                description: 'No hay stock disponible.',
                type: 'error'
            });
            return;
        }

        if (cartStore.items[index].quantity >= cartStore.items[index].variants[0].stock) {
            cartStore.items[index].quantity = cartStore.items[index].variants[0].stock;
            localStorage.setItem('cart', JSON.stringify(cartItems.value));
            return;
        }

        cartStore.items[index].quantity++;
        localStorage.setItem('cart', JSON.stringify(cartItems.value));
    };

    const decrement = (_id: string) => {
        const index = cartStore.items.findIndex((item: any) => item._id === _id);

        if (cartStore.items[index].quantity < 1) {
            return;
        }

        if (cartStore.items[index].quantity === 1) {
            cartStore.remove(cartStore.items[index]);
            localStorage.setItem('cart', JSON.stringify(cartItems.value));
            return;
        }

        cartStore.items[index].quantity--;
        localStorage.setItem('cart', JSON.stringify(cartItems.value));
    };

    const getSubtotal = () => {
        let total = 0;
        cartStore.items.forEach((item) => {
            total += item.variants[0].discount ?
                (item.variants[0].price - item.variants[0].discount.value) * item.quantity :
                item.variants[0].price * item.quantity;
        });
        cartStore.setSubtotal(total);
        return total;
    };

    return {
        cartItems,
        sync,
        add,
        remove,
        clear,
        increment,
        decrement,
        getSubtotal,
    }
}
