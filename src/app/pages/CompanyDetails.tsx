import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import NavBar from "../../../components/NavBar";

interface CompanyData {
    companyName: string;
    industry: string;
    companySize: string;
    website: string;
    country: string;
    phoneNumber: string;
    address: string;
    description: string;
}

export default function CompanyDetails() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState<CompanyData>({
        companyName: "",
        industry: "",
        companySize: "",
        website: "",
        country: "",
        phoneNumber: "",
        address: "",
        description: "",
    });

    useEffect(() => {
        // Redirect if not logged in
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            // Use VITE_AUTH_API and remove /auth suffix to get base API URL
            const AUTH_API = import.meta.env.VITE_AUTH_API || "http://localhost:5000/api/auth";
            const API_URL = AUTH_API.replace(/\/auth$/, "");
            const token = localStorage.getItem("auth_token"); // Changed from "token" to "auth_token"

            if (!token) {
                setError("You must be logged in to submit company details");
                setLoading(false);
                return;
            }

            console.log("Submitting to:", `${API_URL}/company-details`);
            console.log("Token:", token ? "Present" : "Missing");
            console.log("Form data:", formData);

            const response = await fetch(`${API_URL}/company-details`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            console.log("Response status:", response.status);
            console.log("Response ok:", response.ok);

            // Check if response has content
            const contentType = response.headers.get("content-type");
            let data;

            if (contentType && contentType.includes("application/json")) {
                const text = await response.text();
                console.log("Response text:", text);
                data = text ? JSON.parse(text) : {};
            } else {
                const text = await response.text();
                console.log("Non-JSON response:", text);
                data = { error: "Server returned non-JSON response: " + text };
            }

            console.log("Parsed data:", data);

            if (!response.ok) {
                const errorMsg = data.error || data.message || `Server error: ${response.status} - ${JSON.stringify(data)}`;
                console.error("Request failed:", errorMsg);
                console.error("Full response data:", data);
                throw new Error(errorMsg);
            }

            setSuccess("Company details saved successfully!");
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (err: any) {
            console.error("Error submitting form:", err);
            console.error("Error details:", {
                message: err.message,
                stack: err.stack,
                name: err.name
            });
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] via-[#1a1f3a] to-[#0f1629] text-white">
            {/* Navbar */}
            <NavBar />

            <div className="container mx-auto px-4 py-12 pt-24">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Get Started with Autonomiq
                        </h1>
                        <p className="text-gray-400">
                            Tell us about your business to help us serve you better
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Company Name */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Company Name <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                                    placeholder="Enter your company name"
                                />
                            </div>

                            {/* Industry */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Industry <span className="text-red-400">*</span>
                                </label>
                                <select
                                    name="industry"
                                    value={formData.industry}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                >
                                    <option value="" className="bg-gray-800">Select industry</option>
                                    <option value="Technology" className="bg-gray-800">Technology</option>
                                    <option value="Healthcare" className="bg-gray-800">Healthcare</option>
                                    <option value="Finance" className="bg-gray-800">Finance</option>
                                    <option value="Retail" className="bg-gray-800">Retail</option>
                                    <option value="Education" className="bg-gray-800">Education</option>
                                    <option value="Real Estate" className="bg-gray-800">Real Estate</option>
                                    <option value="Manufacturing" className="bg-gray-800">Manufacturing</option>
                                    <option value="Hospitality" className="bg-gray-800">Hospitality</option>
                                    <option value="Other" className="bg-gray-800">Other</option>
                                </select>
                            </div>

                            {/* Company Size */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Company Size <span className="text-red-400">*</span>
                                </label>
                                <select
                                    name="companySize"
                                    value={formData.companySize}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                >
                                    <option value="" className="bg-gray-800">Select company size</option>
                                    <option value="1-10" className="bg-gray-800">1-10 employees</option>
                                    <option value="11-50" className="bg-gray-800">11-50 employees</option>
                                    <option value="51-200" className="bg-gray-800">51-200 employees</option>
                                    <option value="201-500" className="bg-gray-800">201-500 employees</option>
                                    <option value="501+" className="bg-gray-800">501+ employees</option>
                                </select>
                            </div>

                            {/* Website */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Website</label>
                                <input
                                    type="url"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                                    placeholder="https://www.example.com"
                                />
                            </div>

                            {/* Country */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Country <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                                    placeholder="Enter your country"
                                />
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Phone Number <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                                    placeholder="+1 234 567 8900"
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                                    placeholder="Enter your business address"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Business Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 resize-none"
                                    placeholder="Tell us about your business..."
                                />
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
                                    {error}
                                </div>
                            )}

                            {/* Success Message */}
                            {success && (
                                <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg">
                                    {success}
                                </div>
                            )}

                            {/* Buttons */}
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => navigate("/")}
                                    className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg font-medium transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Saving..." : "Save Details"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
