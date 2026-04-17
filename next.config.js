const nextConfig = {
    outputFileTracingRoot: process.cwd(),
    experimental: {
        serverActions: {
            bodySizeLimit: "8mb"
        }
    }
};
export default nextConfig;
