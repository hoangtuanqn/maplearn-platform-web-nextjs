// Interface Form login
export interface FormLoginValues {
    username: string;
    password: string;
}
// Interface Form Register
export interface FormRegisterValues extends FormLoginValues {
    full_name: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}

export interface OTPType {
    "2fa_required": boolean;
    user_id: number;
}
