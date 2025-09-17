"use client";

import { User } from "lucide-react";
import React from "react";
import { useAuth } from "~/hooks/useAuth";

const StudentInfomation = () => {
    const { user } = useAuth();
    return (
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-orange-100 p-2">
                    <User className="h-5 w-5 text-orange-600" />
                </div>
                <h3 className="font-bold text-gray-900">Thông tin học viên</h3>
            </div>

            <div className="space-y-2">
                <div>
                    <label className="text-xs tracking-wide text-gray-500 uppercase">Họ và tên</label>
                    <p className="font-semibold text-gray-900">{user?.full_name}</p>
                </div>
                <div>
                    <label className="text-xs tracking-wide text-gray-500 uppercase">Email</label>
                    <p className="text-gray-700">{user?.email}</p>
                </div>
            </div>
        </div>
    );
};

export default StudentInfomation;
