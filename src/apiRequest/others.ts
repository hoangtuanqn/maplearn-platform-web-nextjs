import axios from "axios";
import { provinceSchema } from "~/schemaValidate/other.schama";

const otherApi = {
    getProvinces: async () => {
        try {
            const res = await axios.get("https://open.oapi.vn/location/provinces");
            const provinces = provinceSchema.parse(res.data);
            return provinces.data;
        } catch (error) {
            console.log("Bug when call api get provinces: >> ", error);
        }
    },
};
export default otherApi;
