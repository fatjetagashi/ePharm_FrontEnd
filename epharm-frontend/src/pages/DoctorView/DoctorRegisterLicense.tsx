import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "@/lib/axios";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext"; // ✅ Use AuthContext


export default function DoctorRegisterLicense() {
  const [message, setMessage] = useState("");
    const { setRole } = useAuth(); // ✅ Get setRole from context
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    license_file: Yup.mixed()
      .required("A license file is required")
      .test("fileSize", "File too large", (value) => {
        return value && value.size <= 2 * 1024 * 1024; // 2MB
      })
      .test("fileFormat", "Unsupported format", (value) => {
        return value && ["application/pdf", "image/jpeg", "image/png"].includes(value.type);
      }),
  });

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    const formData = new FormData();
    formData.append("license_file", values.license_file);

    try {
      await axiosInstance.post("/register/doctor/license", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("License uploaded. Await admin approval.");
      // Update React context role
      setRole(null);
      navigate("/");
    } catch (err) {
      setMessage("Upload failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Upload License</h2>
      <Formik
        initialValues={{ license_file: null }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <div style={{ marginBottom: 16 }}>
              <label
                htmlFor="license_file"
                style={{ display: "block", fontWeight: "bold", marginBottom: 6 }}
              >
                License File
              </label>
              <input
                id="license_file"
                name="license_file"
                type="file"
                onChange={(event) =>
                  setFieldValue("license_file", event.currentTarget.files?.[0])
                }
                style={{
                  width: "100%",
                  padding: 8,
                  fontSize: 16,
                  borderRadius: 4,
                  border: "1px solid #ccc",
                }}
              />
              <ErrorMessage
                name="license_file"
                component="div"
                style={{ color: "red", fontSize: 14, marginTop: 4 }}
              />
            </div>

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
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>

            {message && (
              <p
                style={{
                  marginTop: 20,
                  color: message.toLowerCase().includes("failed") ? "red" : "green",
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
