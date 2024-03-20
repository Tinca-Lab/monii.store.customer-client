export const useCompanyStore = defineStore('company', {
    state: () => ({
        company: {
            config: {
                socialNetworks: [],
            } as any,
        } as any,
    }),

    getters: {
        getCompany: (state) => state.company,
    },

    actions: {
        setCompany(config: any): void {
            this.company = config;
        }
    },

});
