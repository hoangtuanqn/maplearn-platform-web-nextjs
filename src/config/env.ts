import { getEnvServer } from "~/libs/env";

const API_VERSION_PATH = "/api/v1";

const URL_API = process.env.NEXT_PUBLIC_API_URL;
export const APP = {
    API_VERSION_PATH,
    API_ROOT: URL_API,
    API_URL: URL_API + API_VERSION_PATH,
    APP_URL: getEnvServer("APP_URL", "http://localhost:3000"), // url front end
};
export const ENVIRONMENT = {
    isDEV: process.env.APP_ENV === "development",
    isProd: process.env.APP_ENV === "production",
};
