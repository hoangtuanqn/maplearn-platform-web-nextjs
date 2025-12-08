export const getEnvServer = (key: string, defaultValue?: string) => {
    return process.env[`${key}`] ?? defaultValue ?? "";
};
