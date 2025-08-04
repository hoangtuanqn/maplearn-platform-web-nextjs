import publicApi from "~/libs/apis/publicApi";
import { CartsResponse } from "~/schemaValidate/cart.schema";

const cartApi = {
    getCarts: () => publicApi.get<CartsResponse>("/carts"),

    // Xóa từng item
    removeCartItem: (cardIds: number[]) => publicApi.delete(`/carts/cleanup`, { data: { cart_id: cardIds } }),
    toggleCartAll: (isActive: boolean) => publicApi.patch(`/cart-items/toggle-all`, { is_active: isActive }),
    toggleCartItem: (id: number, isActive: boolean) =>
        publicApi.patch(`/cart-items/${id}/toggle`, { is_active: isActive }),

    // Xóa tất cả các item
    removeCartItems: () => publicApi.delete(`/carts`),
    addCartItem: (courseId: number) => publicApi.post(`/carts/${courseId}`),
};
export default cartApi;
