// src/pages/LoginPage.tsx
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext"; // ✅ Use AuthContext

export default function LoginPage() {
    const navigate = useNavigate();
    const { setRole } = useAuth(); // ✅ Get setRole from context
    const [errorMessage, setErrorMessage] = useState("");

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Required"),
            password: Yup.string().required("Required"),
        }),
        onSubmit: async (values) => {
            setErrorMessage("");

            try {
                const response = await axiosInstance.post("/login", values);
                const { access_token, user } = response.data;

                // Store in localStorage
                localStorage.setItem("auth_token", access_token);
                localStorage.setItem("role", user.role);
                localStorage.setItem("user_email", user.email);
                localStorage.setItem("user", JSON.stringify(user));

                // Update React context role
                setRole(user.role);

                // Redirect based on role
                navigate("/");
            } catch (error: any) {
                if (error.response?.data?.message) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage("Login failed.");
                }
            }
        },
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            style={{ maxWidth: 400, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}
        >
            <h2 style={{ textAlign: "center", marginBottom: 20 }}>Login</h2>

            <label htmlFor="email" style={{ fontWeight: "bold" }}>
                Email
            </label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                style={{ width: "100%", padding: 8, marginBottom: 10, borderRadius: 4, border: "1px solid #ccc" }}
            />
            {formik.touched.email && formik.errors.email && (
                <div style={{ color: "red", marginBottom: 10 }}>{formik.errors.email}</div>
            )}

            <label htmlFor="password" style={{ fontWeight: "bold" }}>
                Password
            </label>
            <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                style={{ width: "100%", padding: 8, marginBottom: 10, borderRadius: 4, border: "1px solid #ccc" }}
            />
            {formik.touched.password && formik.errors.password && (
                <div style={{ color: "red", marginBottom: 10 }}>{formik.errors.password}</div>
            )}

            <button
                type="submit"
                style={{
                    width: "100%",
                    padding: 12,
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    fontSize: 16,
                    cursor: "pointer",
                }}
            >
                Login
            </button>

            {errorMessage && <p style={{ color: "red", marginTop: 10 }}>{errorMessage}</p>}
        </form>
    );
}