export const useStyleStore = defineStore({
    id: 'style',
    state: () => ({
        primaryColor: null as string | null,
        secondaryColor: null as string | null,
        tertiaryColor: null as string | null,
    }),

    actions: {
        setPrimaryColor(primaryColor: string) {
            this.primaryColor = primaryColor;
        },

        setSecondaryColor(secondaryColor: string) {
            this.secondaryColor = secondaryColor;
        },

        setTertiaryColor(tertiaryColor: string) {
            this.tertiaryColor = tertiaryColor;
        }
    }

});
