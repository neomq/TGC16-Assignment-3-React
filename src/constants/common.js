// Pages
const pages = {
    home: '/',
    login: '/login',
    register: '/register',
    profile: '/profile',
    products: '/products',
    cart: '/cart'
}

// timer interval for renewing token
const tokenInterval = 870000 // 14.5 mins in ms

// Navigation
const leftNavMenu = [
    { name: "Shop", link: pages.products },
    { name: "About us", link: pages.home },
]

const rightNavMenu = [
    { name: "Cart", link: pages.cart },
]

const mobileMenu = [
    { name: "Home", link: pages.home },
    { name: "Shop", link: pages.products },
    { name: "About us", link: pages.home },
    { name: "Cart", link: pages.cart },
]

// Featured Section 
const featuredContent = [
    {
        label: "Beauty Range",
        title: "Youthful Skin",
        image: "https://res.cloudinary.com/dnxbnmoyc/image/upload/v1699989340/kndov52cdc40iebnpocc.jpg",
        description: "Unveil the secret to timeless beauty. Each drop is a whisper of nature's elegance, meticulously curated to nourish and rejuvenate your skin. Immerse yourself in the luxury of youthfulness, embracing a vibrant and radiant complexion.",
        button: "Shop Range"
    },
    {
        label: "Body Range",
        title: "Immunity Boost",
        image: "https://res.cloudinary.com/dnxbnmoyc/image/upload/v1700065249/eo_collection1_mtbd7s.webp",
        description: "Empower your body's fortress. Specially formulated blends that go beyond fragrance, delivering a powerful shield of nature's immunity boosters. Fortify your well-being daily, embracing a robust and resilient vitality.",
        button: "Shop Range"
    },
    {
        label: "Senses Range",
        title: "Emotional Healing",
        image: "https://res.cloudinary.com/dnxbnmoyc/image/upload/v1700065249/eo_collection3_r0heua.webp",
        description: "Step into a realm of emotional wellness. Crafted to elevate your senses, each essence is a symphony of tranquility and joy. Immerse yourself in a world where emotional balance and positivity converge, enhancing your daily journey with a renewed sense of well-being.",
        button: "Shop Range"
    }
]

// Footer links
const footerLinks = {
    shop: [
        { title: "Our Products", link: pages.products },
        { title: "Our Locations", link: pages.home },
        { title: "Blog", link: pages.blog },
        { title: "About Us", link: pages.home },
    ],
    services: [
        { title: "Login", link: pages.login },
        { title: "Register", link: pages.register },
        { title: "Shipping Policy", link: pages.home },
        { title: "Returns Policy", link: pages.home },
    ]
}

// Text input placeholders
const placeholder = {
    name: "Your Name",
    password: "Your Password",
    email: "Your Email",
    address: "Your Address",
    create_pw: "Create Password",
    confirm_pw: "Confirm Password"
}

// Breakpoints from bootstrap
const breakpoint = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400
}

// Empty state messages
const emptyCartMessage = {
    notFound: {
        message: "Please login to view or add items to your shopping cart.",
        buttonLabel: "Go to login",
        buttonLink: pages.login
    },
    noItems: {
        message: "Seems like there is nothing in your shopping cart.",
        buttonLabel: "Start shopping",
        buttonLink: pages.products
    }
}

export {
    pages,
    tokenInterval,
    leftNavMenu,
    rightNavMenu,
    mobileMenu,
    featuredContent,
    footerLinks,
    placeholder,
    emptyCartMessage,
    breakpoint,
}