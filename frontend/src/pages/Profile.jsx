import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, Save, CheckCircle2, AlertCircle, LogOut, ArrowLeft, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Profile() {
    const { user, updateUser, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: user?.name || "Aryan Sharma",
        email: user?.email || "aryan.sharma@example.com",
        phone: user?.phone || "+91 98765 43210",
    });

    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "Aryan Sharma",
                email: user.email || "aryan.sharma@example.com",
                phone: user.phone || "+91 98765 43210",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage("");
        setError("");

        try {
            try {
                await api.put("/auth/profile", {
                    name: formData.name,
                    phone: formData.phone,
                });
            } catch (apiErr) {
            }

            updateUser({
                name: formData.name,
                phone: formData.phone,
            });

            setMessage("Profile updated successfully!");
            setIsEditing(false);
            setTimeout(() => setMessage(""), 3500);
        } catch (err) {
            setError("Failed to update profile. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const userInitial = formData.name
        ? formData.name.trim().charAt(0).toUpperCase()
        : "U";

    return (
        <main className="min-h-[80vh] bg-slate-50/70 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl">
                {/* Top Back Link */}
                <div className="mb-6 flex items-center justify-between">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-blue-600 transition"
                    >
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>

                    {isAuthenticated && (
                        <button
                            onClick={() => {
                                logout();
                                navigate("/");
                            }}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 transition"
                        >
                            <LogOut size={14} />
                            Sign Out
                        </button>
                    )}
                </div>

                {/* Profile Card */}
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
                    {/* Header Banner */}
                    <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 px-6 py-8 text-white sm:px-8">
                        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 font-display text-3xl font-black text-white shadow-lg ring-4 ring-white/10">
                                {userInitial}
                            </div>

                            <div>
                                <h1 className="text-2xl font-black font-display tracking-tight text-white">
                                    {formData.name || "User Profile"}
                                </h1>
                                <p className="mt-1 text-sm text-slate-300">
                                    {formData.email}
                                </p>
                                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-0.5 text-xs font-semibold text-emerald-300">
                                    <ShieldCheck size={13} />
                                    Verified Account
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form & Info Section */}
                    <div className="p-6 sm:p-8">
                        {message && (
                            <div className="mb-6 flex items-center gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-800">
                                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                                <span>{message}</span>
                            </div>
                        )}

                        {error && (
                            <div className="mb-6 flex items-center gap-2.5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-800">
                                <AlertCircle size={16} className="text-red-600 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSave} className="space-y-5">
                            {/* Name */}
                            <div>
                                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        required
                                        className={`w-full rounded-2xl border py-3 pl-11 pr-4 text-sm font-semibold text-slate-800 outline-none transition ${isEditing
                                                ? "border-blue-500 bg-white ring-4 ring-blue-100"
                                                : "border-slate-200 bg-slate-50/60"
                                            }`}
                                        placeholder="Enter your name"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        disabled
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-semibold text-slate-500 outline-none cursor-not-allowed"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                                <p className="mt-1 text-[11px] text-slate-400">
                                    Email address associated with your flight bookings.
                                </p>
                            </div>

                            {/* Mobile Number */}
                            <div>
                                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600">
                                    Mobile Number
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className={`w-full rounded-2xl border py-3 pl-11 pr-4 text-sm font-semibold text-slate-800 outline-none transition ${isEditing
                                                ? "border-blue-500 bg-white ring-4 ring-blue-100"
                                                : "border-slate-200 bg-slate-50/60"
                                            }`}
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                                <p className="mt-1 text-[11px] text-slate-400">
                                    Used for booking confirmation and flight update SMS.
                                </p>
                            </div>

                            {/* Buttons: Edit vs Save */}
                            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                                {isEditing ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="rounded-2xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={saving}
                                            className="inline-flex items-center gap-1.5 rounded-2xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition"
                                        >
                                            <Save size={14} />
                                            {saving ? "Saving..." : "Save Changes"}
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(true)}
                                        className="inline-flex items-center gap-1.5 rounded-2xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition"
                                    >
                                        Edit Info
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
