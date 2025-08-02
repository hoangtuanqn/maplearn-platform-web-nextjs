import publicApi from "~/libs/apis/publicApi";
import { DocumentListResponse, DocumentResponse, DocumentSameCategoryResponse } from "~/schemaValidate/document.schema";
import { CategoryDocumentListResponse, CategoryDocumentResponse } from "../schemaValidate/categoryDocument";
export const DOCUMENTS_PER_PAGE = 20;
export const CATEGORIES_DOCUMENT_PER_PAGE = 10;
const documentApi = {
    getDocuments: async (
        page: number = 1,
        limit: number = DOCUMENTS_PER_PAGE,
        search: string = "",
        querySortOther: string = "",
        queryOther: string = "",
    ) => {
        let query = `/documents?page=${page}&limit=${limit}`;
        if (search) {
            query += `&filter[title]=${search}`;
        }
        if (querySortOther) {
            query += `&sort=${querySortOther}`; // Các value cần sort: -created_at, download_count, ...
        }
        if (queryOther) {
            query += `&${queryOther}`; // Các value khác nếu cần
        }
        return publicApi.get<DocumentListResponse>(query);
    },
    getDetailDocument: (slug: string) => publicApi.get<DocumentResponse>(`/documents/${slug}`),
    getDocumentSameCategory: (slug: string) =>
        publicApi.get<DocumentSameCategoryResponse>(`/documents/same-category/${slug}?limit=10`),
    getDocumentsInCategory: async (
        page: number = 1,
        limit: number = DOCUMENTS_PER_PAGE,
        categoryId: number = 1,
        search: string = "",
        querySortOther: string = "",
    ) => {
        let query = `/documents?page=${page}&limit=${limit}&filter[category_id]=${categoryId}`;
        if (search) {
            query += `&filter[title]=${search}`;
        }
        if (querySortOther) {
            query += `&sort=${querySortOther}`; // Các value cần sort: -created_at, download_count, ...
        }
        return publicApi.get<DocumentListResponse>(query);
    },
    incrementDownload: async (documentId: string) => {
        const response = await publicApi.post(`/documents/${documentId}/download`);
        return response.data.data.data || [];
    },

    getCategories: async (page: number = 1, limit: number = CATEGORIES_DOCUMENT_PER_PAGE, search: string = "") => {
        let query = `/category-documents?page=${page}&limit=${limit}`;
        if (search) {
            query += `&search=${search}`;
        }
        return publicApi.get<CategoryDocumentListResponse>(query);
    },
    getCategory: (categoryId: string) => publicApi.get<CategoryDocumentResponse>(`/category-documents/${categoryId}`),
};
export default documentApi;
