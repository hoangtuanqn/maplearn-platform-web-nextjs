import serverApi from "~/libs/apis/serverApi";
import { provinceSchema } from "~/schemaValidate/other.schama";

const otherApi = {
    getProvinces: async () => {
        try {
            const res = await serverApi.get("/data/provinces.json");
            const provinces = provinceSchema.parse(res.data);
            return provinces;
        } catch (error) {
            console.log("Bug when call api get provinces: >> ", error);
        }
    },
};
export default otherApi;
