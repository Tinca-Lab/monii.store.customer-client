import type {Config} from 'tailwindcss'

export default <Partial<Config>>{
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./node_modules/flowbite/**/*.{js,ts}"
    ],
    theme: {
        extend: {
            colors: {
                primary: 'rgb(var(--primary-color) / <alpha-value>)',
            },
            fontFamily: {
                'body': ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
                'display': ['Inter', 'Poppins', 'ui-serif', 'Georgia, Cambria', "Times New Roman", 'Times', 'serif'],
            }
        }
    },
    plugins: [
        require('flowbite/plugin')
    ],
}
