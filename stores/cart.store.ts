export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as any[],
        subtotal: 0,
    }),
    actions: {
        add(item: any) {
            this.items.push(item)
        },
        clear() {
            this.items = [];
            this.subtotal = 0;
        },
        remove(item: any) {
            const index = this.items.findIndex((i: any) => i._id === item._id);
            this.items.splice(index, 1);
        },
        setSubtotal(subtotal: number) {
            this.subtotal = subtotal;
        }
    }
})
