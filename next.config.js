// eslint-disable-next-line no-undef
const domains = (process.env.IMAGES_DOMAINS || '').split(',');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains,
    },
    modularizeImports: {
        "@mui/material": {
            transform: "@mui/material/{{member}}",
        },
        "@mui/icons-material": {
            transform: "@mui/icons-material/{{member}}",
        },
    },
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
