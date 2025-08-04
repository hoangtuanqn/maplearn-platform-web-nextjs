import publicApi from "~/libs/apis/publicApi";
import { CartsResponse } from "~/schemaValidate/cart.schema";

const cartApi = {
    getCarts: () => publicApi.get<CartsResponse>("/carts"),

    // Xóa từng item
    removeCartItem: (courseId: number) => publicApi.delete(`/carts/${courseId}`),

    // Xóa tất cả các item
    removeCartItems: () => publicApi.delete(`/carts`),
    addCartItem: (courseId: number) => publicApi.post(`/carts/${courseId}`),
};
export default cartApi;
