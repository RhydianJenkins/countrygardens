// eslint-disable-next-line no-undef
const imageDomain = process.env.POCKETBASE_API_DOMAIN || '127.0.0.1';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [imageDomain],
    },
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
