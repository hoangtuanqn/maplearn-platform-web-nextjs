"use client";
import { Printer } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";

const ActionPrint = () => {
    return (
        <div className="mt-6 px-2">
            <p className="mb-2 text-base font-bold text-slate-700">Thao tác</p>
            <Button className="text-primary mt-2 gap-2" onClick={() => window?.print()} variant={"outline"}>
                <Printer className="h-5 w-5" /> <span>In hóa đơn</span>
            </Button>
        </div>
    );
};

export default ActionPrint;
