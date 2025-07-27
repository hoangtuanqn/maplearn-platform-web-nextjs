import { ReactNode } from "react";

export interface LabelType {
    id?: string | undefined;
    required?: boolean;
    className?: string;
    children: ReactNode;
    [key: string]: unknown;
}
