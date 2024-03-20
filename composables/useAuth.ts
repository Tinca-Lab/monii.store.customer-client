export default function () {
    interface ILogin {
        email: string;
        password: string;
    }

    // composable
    const router = useRouter();
    const config = useRuntimeConfig();
    const toast = useToast();

    // store
    const store = useAuthStore();
    const {company} = useCompanyStore();

    // computed
    const loggedIn = computed(() => store.loggedIn);
    const user: any = computed(() => store.user);


    const login = async ({email, password}: ILogin, redirect?: string) => {
        const {data, error} = await useFetch<any>('/api/v2/auth/login', {
            params: {
                scope: true,
                companyId: company._id
            },
            method: 'POST',
            body: JSON.stringify({email, password}),
            baseURL: config.public.baseURL
        });
        if (error.value && !data.value) {
            toast.add({
                type: 'error',
                title: 'Oops! Algo salió mal',
                description: error.value.data.message,
            });
            return;
        }
        const accessToken = useCookie('access_token');
        accessToken.value = data?.value?.access_token;
        if (!redirect) {
            await router.push('/');
            return;
        }
        await router.push(redirect);

    };

    const me = async () => {
        const accessToken = useCookie('access_token');
        const {data, error, pending} = await useFetch<any>('/api/v2/auth/user', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken.value}`
            },
            baseURL: config.public.baseURL
        })
        if (error.value) {
            await logout();
        }
        store.setUser(data?.value?.user);
        store.setLoggedIn(true);
    };

    const logout = async (redirect: string = '/') => {
        const accessToken = useCookie('access_token');
        accessToken.value = null;
        store.setLoggedIn(false);
        store.setUser(null);
        await router.push(redirect ?? '/login');
        if (process.client) window.location.reload();
        return;
    };

    const setLoggedIn = (loggedIn: boolean) => {
        store.setLoggedIn(loggedIn);
    };


    return {
        user,
        loggedIn,
        login,
        me,
        logout,
        setLoggedIn
    };
}
