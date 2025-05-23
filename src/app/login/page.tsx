"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { User, Lock, Mail, Eye, EyeOff, ArrowRight, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    }
}

export default function LoginPage() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    // États du formulaire
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        name: "",
        password: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError(""); // Clear error on input change
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { data, error } = await authClient.signIn.username({
                username: formData.username,
                password: formData.password,
            });

            if (error) {
                setError(error.message || "Erreur lors de la connexion");
            } else if (data) {
                router.push("/admin");
                router.refresh();
            }
        } catch (err) {
            console.error("Erreur de connexion:", err);
            setError("Erreur lors de la connexion");
        } finally {
            setLoading(false);
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { data, error } = await authClient.signUp.email({
                email: formData.email,
                password: formData.password,
                name: formData.name,
                username: formData.username,
            });

            if (error) {
                setError(error.message || "Erreur lors de l'inscription");
            } else if (data) {
                // Connexion automatique après inscription réussie
                router.push("/admin");
                router.refresh();
            }
        } catch (err) {
            console.error("Erreur d'inscription:", err);
            setError("Erreur lors de l'inscription");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center vite-bg-pattern" style={{ background: 'var(--bg-primary)' }}>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="vite-card w-full max-w-md p-8 mx-4"
            >
                <div className="text-center mb-8">
                    <motion.h1
                        variants={itemVariants}
                        className="text-3xl font-bold mb-2"
                        style={{ color: 'var(--heading-color)' }}
                    >
                        {isSignUp ? (
                            <>
                                <span className="gradient-text">Créer</span> un compte
                            </>
                        ) : (
                            <>
                                <span className="gradient-text">Connexion</span> Admin
                            </>
                        )}
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-muted"
                    >
                        {isSignUp
                            ? "Créez votre compte administrateur"
                            : "Connectez-vous à votre espace d&apos;administration"
                        }
                    </motion.p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                    >
                        <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
                    </motion.div>
                )}

                <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-6">
                    {/* Nom (seulement pour l'inscription) */}
                    {isSignUp && (
                        <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                Nom complet
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 vite-card border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Votre nom complet"
                                    required
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* Email (seulement pour l'inscription) */}
                    {isSignUp && (
                        <motion.div variants={itemVariants}>
                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 vite-card border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="votre@email.com"
                                    required
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* Username */}
                    <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                            Nom d&apos;utilisateur
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 vite-card border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="nom_utilisateur"
                                required
                                minLength={3}
                                maxLength={30}
                                pattern="[a-zA-Z0-9_.]+"
                                title="Seuls les lettres, chiffres, points et underscores sont autorisés"
                            />
                        </div>
                    </motion.div>

                    {/* Mot de passe */}
                    <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                            Mot de passe
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-12 py-3 vite-card border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Votre mot de passe"
                                required
                                minLength={8}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </motion.div>

                    {/* Bouton de soumission */}
                    <motion.button
                        variants={itemVariants}
                        type="submit"
                        disabled={loading}
                        className="w-full vite-button-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading
                            ? (isSignUp ? "Création..." : "Connexion...")
                            : (
                                <>
                                    {isSignUp ? (
                                        <>
                                            <UserPlus className="w-5 h-5" />
                                            Créer le compte
                                        </>
                                    ) : (
                                        <>
                                            <ArrowRight className="w-5 h-5" />
                                            Se connecter
                                        </>
                                    )}
                                </>
                            )
                        }
                    </motion.button>
                </form>

                {/* Toggle entre connexion et inscription */}
                <motion.div variants={itemVariants} className="mt-6 text-center">
                    <p className="text-sm text-muted">
                        {isSignUp ? "Déjà un compte ? " : "Pas encore de compte ? "}
                        <button
                            onClick={() => {
                                setIsSignUp(!isSignUp);
                                setError("");
                                setFormData({ username: "", email: "", name: "", password: "" });
                            }}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline"
                        >
                            {isSignUp ? "Se connecter" : "Créer un compte"}
                        </button>
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-6 text-center">
                    <p className="text-xs text-muted">
                        Seuls les administrateurs autorisés peuvent accéder à cette interface.
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
} 