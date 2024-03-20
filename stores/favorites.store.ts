export const useFavoritesStore = defineStore('favorites', {
    state: () => ({
        items: [] as any[],
    }),
    actions: {
        add(item: any) {
            this.items.push(item)
        },
        remove(item: any) {
            const index = this.items.findIndex((i: any) => i._id === item._id);
            this.items.splice(index, 1);
        },
    }
})
