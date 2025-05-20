import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext"; // ✅ Use AuthContext


export default function PharmacyRegisterPage() {
  const { setRole } = useAuth(); // ✅ Get setRole from context
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    domain: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
    domain: Yup.string().required("Domain is required"),
  });

  const handleSubmit = async (values: typeof initialValues, { setSubmitting, setStatus }: any) => {
    try {
      await axiosInstance.post("/register/pharmacy", values);
      setStatus({ success: "Pharmacy registered. Await admin approval." });
       setRole(null);
       navigate("/");
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const flatErrors = Object.values(error.response.data.errors).flat().join(" ");
        setStatus({ error: flatErrors });
      } else {
        setStatus({ error: "Registration failed." });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Register Pharmacy</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, status }) => (
          <Form>
            {["name", "email", "domain", "password", "password_confirmation"].map((field) => (
              <div key={field} style={{ marginBottom: 16 }}>
                <label htmlFor={field} style={{ display: "block", fontWeight: "bold", marginBottom: 6 }}>
                  {field.replace("_", " ").toUpperCase()}
                </label>
                <Field
                  id={field}
                  name={field}
                  type={field.includes("password") ? "password" : "text"}
                  style={{
                    width: "100%",
                    padding: 8,
                    fontSize: 16,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                  }}
                />
                <ErrorMessage name={field} component="div" style={{ color: "red", fontSize: 14, marginTop: 4 }} />
              </div>
            ))}

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
              }}
            >
              {isSubmitting ? "Submitting..." : "Register"}
            </button>

            {status?.error && (
              <p style={{ marginTop: 20, color: "red", textAlign: "center" }}>{status.error}</p>
            )}
            {status?.success && (
              <p style={{ marginTop: 20, color: "green", textAlign: "center" }}>{status.success}</p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
