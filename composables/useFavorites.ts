export const useFavorites = () => {
    // composable
    const toast = useToast();
    // store
    const favoritesStore = useFavoritesStore();
    // data
    const favoritesItems = computed(() => favoritesStore.items);

    // methods
    const sync = () => {
        const items = localStorage.getItem('favorites');
        if (items) {
            favoritesStore.items = JSON.parse(items);
        }
    };

    const add = (product: any) => {
        const exists = favoritesStore.items.find((item: any) => item._id === product._id);
        if (exists) {
            toast.add({
                title: 'Error',
                description: 'El producto ya está en favoritos.',
                type: 'warning'
            });
            return;
        }
        favoritesStore.add(product);
        localStorage.setItem('favorites', JSON.stringify(favoritesItems.value));
        toast.add({
            title: 'Producto agregado',
            description: 'Hemos agregado el producto a favoritos!',
            type: 'success'
        });
    }

    const remove = (product: any) => {
        favoritesStore.remove(product);
        localStorage.setItem('favorites', JSON.stringify(favoritesItems.value));
        toast.add({
            title: 'Producto eliminado',
            description: 'Hemos eliminado el producto de favoritos!',
            type: 'success'
        });
    }

    return {
        favoritesItems,
        sync,
        add,
        remove,
    }
}
