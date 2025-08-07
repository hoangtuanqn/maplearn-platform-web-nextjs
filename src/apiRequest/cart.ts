import privateApi from "~/libs/apis/privateApi";
import { CartsResponse, CheckoutResponse, SummaryResponse } from "~/schemaValidate/cart.schema";

const cartApi = {
    getCarts: () => privateApi.get<CartsResponse>("/carts"),

    // Xóa từng item
    removeCartItem: (cardIds: number[]) => privateApi.delete(`/carts/cleanup`, { data: { cart_id: cardIds } }),
    toggleCartAll: (isActive: boolean) => privateApi.patch(`/cart-items/toggle-all`, { is_active: isActive }),
    toggleCartItem: (id: number, isActive: boolean) =>
        privateApi.patch(`/cart-items/${id}/toggle`, { is_active: isActive }),

    // Xóa tất cả các item
    removeCartItems: () => privateApi.delete(`/carts`),
    addCartItem: (courseId: number) => privateApi.post(`/carts/${courseId}`),

    // Get summary of cart
    getCartSummary: (numberIds: number[]) =>
        privateApi.post<SummaryResponse>(`/cart-items/summary`, { cart_id: numberIds }),

    checkout: (data: { payment_method: string }) => privateApi.post<CheckoutResponse>(`/carts/checkout`, data),
};
export default cartApi;
