import axios from "axios";
import { provinceSchema } from "~/schemaValidate/other.schama";

const otherApi = {
    getProvinces: async () => {
        try {
            const res = await axios.get("https://34tinhthanh.com/api/provinces");
            const provinces = provinceSchema.parse(res.data);
            return provinces;
        } catch (error) {
            console.log("Bug when call api get provinces: >> ", error);
        }
    },
};
export default otherApi;
