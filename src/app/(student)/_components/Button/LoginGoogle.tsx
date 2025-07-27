"use client";
import Image from "next/image";
import { APP } from "~/config/env";

const LoginGoogle = () => {
    return (
        <button
            onClick={() => (window.location.href = `${APP.API_ROOT}/api/v1/auth/google`)}
            className="flex cursor-pointer items-center gap-4 rounded-xl bg-white px-4 py-2 font-bold text-black shadow"
        >
            <div className="t1-flex-center h-7 w-7 rounded-xl bg-white">
                <Image src="/assets/icons/google.png" alt="Google" className="object-cover" width={24} height={24} />
            </div>
        </button>
    );
};

export default LoginGoogle;
