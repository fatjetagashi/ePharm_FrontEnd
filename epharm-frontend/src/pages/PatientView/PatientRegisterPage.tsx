import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "@/lib/axios";
import { useState } from "react";

export default function PatientRegisterPage() {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters")
            .matches(/[a-z]/, "Must contain at least one lowercase letter")
            .matches(/[A-Z]/, "Must contain at least one uppercase letter")
            .matches(/\d/, "Must contain at least one number")
            .matches(
                /[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]/,
                "Must contain at least one special character"
            ),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm your password"),
    });

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        try {
            const response = await axiosInstance.post("/register/patient", values);
            const { token, user } = response.data;

            navigate(`/verify-patient-otp/${user.id}`);
        } catch (error: any) {
            if (error.response?.data?.errors) {
                setMessage(Object.values(error.response.data.errors).flat().join(" "));
            } else {
                setMessage("Registration failed.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div
            style={{
                maxWidth: 400,
                margin: "auto",
                padding: 20,
                fontFamily: "Arial, sans-serif",
            }}
        >
            <h2 style={{ textAlign: "center", marginBottom: 20 }}>
                Register as Patient
            </h2>
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    password_confirmation: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        {["name", "email", "password", "password_confirmation"].map(
                            (field) => (
                                <div key={field} style={{ marginBottom: 16 }}>
                                    <label
                                        htmlFor={field}
                                        style={{
                                            display: "block",
                                            fontWeight: "bold",
                                            marginBottom: 6,
                                        }}
                                    >
                                        {field.replace("_", " ").toUpperCase()}
                                    </label>
                                    <Field
                                        id={field}
                                        name={field}
                                        type={
                                            field.includes("password")
                                                ? "password"
                                                : field === "email"
                                                    ? "email"
                                                    : "text"
                                        }
                                        placeholder={field.replace("_", " ")}
                                        style={{
                                            width: "100%",
                                            padding: 8,
                                            fontSize: 16,
                                            borderRadius: 4,
                                            border: "1px solid #ccc",
                                        }}
                                    />
                                    <ErrorMessage
                                        name={field}
                                        component="div"
                                        style={{ color: "red", fontSize: 14 }}
                                    />
                                </div>
                            )
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
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
                            {isSubmitting ? "Registering..." : "Register"}
                        </button>

                        {message && (
                            <p
                                style={{
                                    marginTop: 20,
                                    color: message.toLowerCase().includes("failed")
                                        ? "red"
                                        : "green",
                                    textAlign: "center",
                                }}
                            >
                                {message}
                            </p>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
}