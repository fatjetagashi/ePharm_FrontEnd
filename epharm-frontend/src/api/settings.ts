import axios from "@/lib/axios";

export const getProfile = async () => {
    const response = await axios.get("/api/doctor/settings/profile");
    return response.data.data;
};