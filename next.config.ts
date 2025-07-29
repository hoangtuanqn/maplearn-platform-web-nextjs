import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        reactCompiler: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**.sgp1.digitaloceanspaces.com",
                port: "",
                search: "",
            },
        ],
    },
};

export default nextConfig;
