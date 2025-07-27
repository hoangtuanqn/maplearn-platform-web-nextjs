export const getEnv = (key: string, defaultValue?: string) => {
    return process.env[`NEXT_PUBLIC_${key}`] ?? defaultValue ?? "";
};
