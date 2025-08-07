"use client";
import Image from "next/image";
import { APP } from "~/config/env";

const LoginGithub = () => {
    return (
        <button
            onClick={() => (window.location.href = `${APP.API_ROOT}/api/v1/auth/github`)}
            className="cursor-pointer"
        >
            <div
                className="t1-flex-center view_tooltip overflow-hidden rounded-full"
                data-tooltip-content="Đăng nhập bằng Github"
            >
                <Image src="/assets/icons/github.webp" alt="Twitter" className="object-cover" width={35} height={35} />
            </div>
        </button>
    );
};

export default LoginGithub;
