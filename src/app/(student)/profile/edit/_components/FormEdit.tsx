"use client";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userSchema, UserType } from "~/schemaValidate/user.schema";
import { useAuth } from "~/hooks/useAuth";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import otherApi from "~/apiRequest/others";
import { ProvinceType } from "~/schemaValidate/other.schama";
import profileApi from "~/apiRequest/profile";
import Loading from "~/app/(student)/_components/Loading";
import { useRouter } from "next/navigation";

const FormEdit = () => {
    const { user, updateProfile } = useAuth();
    const [provinces, setProvinces] = useState<ProvinceType>([]);
    const form = useForm<UserType>({
        resolver: zodResolver(userSchema),
        mode: "onBlur",
        defaultValues: {
            full_name: user?.full_name ?? "",
            birth_year: user?.birth_year,
            gender: user?.gender ?? "male",
            school: user?.school ?? "male",
            city: user?.city ?? "",
            facebook_link: user?.facebook_link ?? "",
            phone_number: user?.phone_number ?? "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: UserType) => profileApi.update(data),
        onSuccess: (_, data) => {
            updateProfile(data);
            toast.success("Cập nhật thông tin thành công!");
        },
        onError: () => {
            toast.error("Cập nhật thông tin thất bại!");
        },
    });

    const onSubmit = (data: UserType) => {
        if (isPending) {
            toast.warning("Thao tác quá nhanh!");
            return;
        }
        mutate(data);
    };

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const res = await otherApi.getProvinces(); // gọi API
                setProvinces(res ?? []);
            } catch (err) {
                console.error("Lỗi lấy tỉnh:", err);
            }
        };

        fetchProvinces();
    }, []);
    return (
        <>
            {isPending && <Loading />}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-md max-w-full space-y-6">
                    <FormField
                        control={form.control}
                        name="full_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-normal">Họ và tên *</FormLabel>
                                <FormControl>
                                    <Input placeholder="Họ và tên của bạn" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone_number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-normal">Số điện thoại</FormLabel>
                                <FormControl>
                                    <Input placeholder="Số điện thoại của bạn" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-normal">Giới tính</FormLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Giới tính của bạn" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="male">Nam</SelectItem>
                                            <SelectItem value="female">Nữ</SelectItem>
                                            <SelectItem value="other">Khác</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="birth_year"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-normal">Năm sinh</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Năm sinh của bạn"
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        value={form.watch("birth_year") ?? ""}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-normal">Tỉnh thành</FormLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Tỉnh thành của bạn" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {provinces.map((province) => (
                                                <SelectItem key={province.province_code} value={province.name}>
                                                    {province.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="school"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-normal">Trường học</FormLabel>
                                <FormControl>
                                    <Input placeholder="Trường THPT hiện tại của bạn" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="facebook_link"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-normal">Liên kết Facebook</FormLabel>
                                <FormControl>
                                    <Input placeholder="Địa chỉ liên kết Facebook của bạn" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="text-white">
                        Cập nhật
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default FormEdit;
