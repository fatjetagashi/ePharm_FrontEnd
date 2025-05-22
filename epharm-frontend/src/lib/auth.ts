export const getCurrentUserRole = (): "admin" | "doctor" | "patient" => {
    // Just a mock for now – replace with real logic
    return localStorage.getItem("role") as "admin" | "doctor" | "patient" || "doctor";
};
