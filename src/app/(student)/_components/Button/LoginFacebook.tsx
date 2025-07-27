"use client";
import Image from "next/image";
import { APP } from "~/config/env";

const LoginFacebook = () => {
    return (
        <button
            onClick={() => (window.location.href = `${APP.API_ROOT}/api/v1/auth/facebook`)}
            className="flex cursor-pointer items-center gap-4 rounded-xl bg-[#4285F4] px-4 py-2 text-white shadow"
        >
            <div className="t1-flex-center h-7 w-7 rounded-xl">
                <Image
                    src="/assets/icons/facebook.png"
                    alt="Facebook"
                    className="object-cover"
                    width={24}
                    height={24}
                />
            </div>
        </button>
    );
};

export default LoginFacebook;
