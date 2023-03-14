// eslint-disable-next-line no-undef
const imageDomain = '127.0.0.1'; // TODO setup image domain for stripe

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [imageDomain],
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
