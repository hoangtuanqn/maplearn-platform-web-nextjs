import publicApi from "~/libs/apis/publicApi";
import { DocumentListResponse } from "~/schemaValidate/document.schema";
import { CategoryDocumentListResponse, CategoryDocumentResponse } from "../schemaValidate/categoryDocument";
export const DOCUMENTS_PER_PAGE = 20;
export const CATEGORIES_DOCUMENT_PER_PAGE = 10;
export const documentApi = {
    getDocuments: async (page: number = 1, limit: number = DOCUMENTS_PER_PAGE, search: string = "") => {
        let query = `/documents?page=${page}&limit=${limit}`;
        if (search) {
            query += `&filter[title]=${search}`;
        }
        return publicApi.get<DocumentListResponse>(query);
    },
    getDocumentsInCategory: async (
        page: number = 1,
        limit: number = DOCUMENTS_PER_PAGE,
        categoryId: number = 1,
        search: string = "",
    ) => {
        let query = `/documents?page=${page}&limit=${limit}&filter[category_id]=${categoryId}`;
        if (search) {
            query += `&filter[title]=${search}`;
        }
        return publicApi.get<DocumentListResponse>(query);
    },
    incrementDownload: async (documentId: string) => {
        const response = await publicApi.post(`/documents/${documentId}/download`);
        return response.data.data.data || [];
    },

    getCategories: async (page: number = 1, limit: number = CATEGORIES_DOCUMENT_PER_PAGE, search: string = "") => {
        let query = `/category_documents?page=${page}&limit=${limit}`;
        if (search) {
            query += `&search=${search}`;
        }
        return publicApi.get<CategoryDocumentListResponse>(query);
    },
    getCategory: (categoryId: string) => publicApi.get<CategoryDocumentResponse>(`/category_documents/${categoryId}`),
};
