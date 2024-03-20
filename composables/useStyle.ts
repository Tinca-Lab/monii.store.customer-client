export const useStyle = () => {
    // store
    const styleStore = useStyleStore();

    watch(() => styleStore.primaryColor, (primaryColor) => {
        if (primaryColor) {
            document.documentElement.style.setProperty('--primary-color', primaryColor);
        }

    }, {immediate: true});

    watch(() => styleStore.secondaryColor, (secondaryColor) => {
        if (secondaryColor) {
            document.documentElement.style.setProperty('--secondary-color', secondaryColor);
        }
    }, {immediate: true});

    watch(() => styleStore.tertiaryColor, (tertiaryColor) => {
        if (tertiaryColor) {
            document.documentElement.style.setProperty('--tertiary-color', tertiaryColor);
        }
    }, {immediate: true});


    function setPrimaryColor(primaryColor: string) {
        styleStore.setPrimaryColor(primaryColor);
    }

    function setSecondaryColor(secondaryColor: string) {
        styleStore.setSecondaryColor(secondaryColor);
    }

    function setTertiaryColor(tertiaryColor: string) {
        styleStore.setTertiaryColor(tertiaryColor);
    }

    return {
        setPrimaryColor,
        setSecondaryColor,
        setTertiaryColor
    }
};
