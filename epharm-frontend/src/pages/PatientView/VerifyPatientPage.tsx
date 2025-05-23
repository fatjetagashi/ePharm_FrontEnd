import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "@/lib/axios";
import { useState } from "react";

export default function VerifyPatientPage() {
    const [message, setMessage] = useState("");
    const params = useParams();
    const navigate = useNavigate();

//   console.log(params?.id)
    const validationSchema = Yup.object({
        otp: Yup.string().required("OTP is required"),
    });

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        try {
            const response = await axiosInstance.post(`/patients/${params?.id}/verify-patient-otp`, values);
            const { token, user } = response.data;

            localStorage.setItem("auth_token", token);
            localStorage.setItem("role", user.role);

            navigate("/");
        } catch (error: any) {
            console.log(Object.values(error.response?.data.errors).flat().join(" "))
            if (error.response?.data?.errors) {
                setMessage(Object.values(error.response.data.errors).flat().join(" "));
            } else {
                setMessage("Incorrect OTP!");
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
                Verify Patient OTP to login
            </h2>
            <Formik
                initialValues={{
                    otp: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        {["otp"].map(
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