import { useEffect } from "react";
import { APP_CONFIG } from "~/config/app.config";
import { getEnv } from "~/libs/env";

export default function useDocumentTitle(title: string) {
    useEffect(() => {
        document.title = `${title ? `${title} | ` : " "}${getEnv("APP_NAME") || APP_CONFIG.APP_NAME}`;
    }, [title]);
}
