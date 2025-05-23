'use client'

import { motion } from 'framer-motion';
import {
    User,
    Shield,
    Bell,
    Palette,
    Database,
    Save,
    Eye,
    EyeOff,
    Key,
    Mail
} from 'lucide-react';
import { useState } from 'react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.1,
            staggerChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
}

export default function AdminSettings() {
    const [showPassword, setShowPassword] = useState(false);
    const [settings, setSettings] = useState({
        // Profile settings
        name: 'Administrateur',
        email: 'admin@example.com',
        username: 'admin',
        bio: 'Développeur de jeux vidéo passionné',

        // Security settings
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        twoFactorEnabled: false,

        // Notification settings
        emailNotifications: true,
        browserNotifications: false,
        marketingEmails: false,

        // System settings
        theme: 'auto',
        language: 'fr',
        timezone: 'Europe/Paris',

        // Database settings
        autoBackup: true,
        backupFrequency: 'daily',
        maxBackups: 7
    });

    const handleInputChange = (field: string, value: string | boolean | number) => {
        setSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async (section: string) => {
        // TODO: Implement save functionality
        console.log(`Saving ${section} settings:`, settings);
        // Show success message
    };

    return (
        <div className="vite-section-with-sidebar">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="text-center lg:text-left">
                    <h1 className="vite-heading text-4xl">
                        <span className="gradient-text">Paramètres</span> Admin
                    </h1>
                    <p className="vite-subheading text-left lg:text-left">
                        Configurez votre compte et les paramètres du système.
                    </p>
                </motion.div>

                {/* Settings Sections */}
                <div className="space-y-8">
                    {/* Profile Settings */}
                    <motion.div variants={itemVariants} className="vite-card p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h2 className="text-xl font-semibold" style={{ color: 'var(--heading-color)' }}>
                                Profil
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                    Nom complet
                                </label>
                                <input
                                    type="text"
                                    value={settings.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    style={{
                                        background: 'var(--card-bg)',
                                        borderColor: 'var(--border-primary)',
                                        color: 'var(--heading-color)'
                                    }}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={settings.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    style={{
                                        background: 'var(--card-bg)',
                                        borderColor: 'var(--border-primary)',
                                        color: 'var(--heading-color)'
                                    }}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                    Nom d&apos;utilisateur
                                </label>
                                <input
                                    type="text"
                                    value={settings.username}
                                    onChange={(e) => handleInputChange('username', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    style={{
                                        background: 'var(--card-bg)',
                                        borderColor: 'var(--border-primary)',
                                        color: 'var(--heading-color)'
                                    }}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                    Bio
                                </label>
                                <textarea
                                    value={settings.bio}
                                    onChange={(e) => handleInputChange('bio', e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    style={{
                                        background: 'var(--card-bg)',
                                        borderColor: 'var(--border-primary)',
                                        color: 'var(--heading-color)'
                                    }}
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleSave('profile')}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Save className="h-4 w-4" />
                                Sauvegarder
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Security Settings */}
                    <motion.div variants={itemVariants} className="vite-card p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                                <Shield className="h-5 w-5 text-red-600 dark:text-red-400" />
                            </div>
                            <h2 className="text-xl font-semibold" style={{ color: 'var(--heading-color)' }}>
                                Sécurité
                            </h2>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                        Mot de passe actuel
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={settings.currentPassword}
                                            onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                                            className="w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            style={{
                                                background: 'var(--card-bg)',
                                                borderColor: 'var(--border-primary)',
                                                color: 'var(--heading-color)'
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-gray-400" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                        Nouveau mot de passe
                                    </label>
                                    <input
                                        type="password"
                                        value={settings.newPassword}
                                        onChange={(e) => handleInputChange('newPassword', e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        style={{
                                            background: 'var(--card-bg)',
                                            borderColor: 'var(--border-primary)',
                                            color: 'var(--heading-color)'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                        Confirmer le mot de passe
                                    </label>
                                    <input
                                        type="password"
                                        value={settings.confirmPassword}
                                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        style={{
                                            background: 'var(--card-bg)',
                                            borderColor: 'var(--border-primary)',
                                            color: 'var(--heading-color)'
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded-lg" style={{ borderColor: 'var(--border-primary)' }}>
                                <div className="flex items-center gap-3">
                                    <Key className="h-5 w-5 text-gray-500" />
                                    <div>
                                        <p className="font-medium" style={{ color: 'var(--heading-color)' }}>
                                            Authentification à deux facteurs
                                        </p>
                                        <p className="text-sm text-muted">
                                            Ajoutez une couche de sécurité supplémentaire
                                        </p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.twoFactorEnabled}
                                        onChange={(e) => handleInputChange('twoFactorEnabled', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleSave('security')}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                <Shield className="h-4 w-4" />
                                Mettre à jour la sécurité
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Notification Settings */}
                    <motion.div variants={itemVariants} className="vite-card p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                                <Bell className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <h2 className="text-xl font-semibold" style={{ color: 'var(--heading-color)' }}>
                                Notifications
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {[
                                { key: 'emailNotifications', label: 'Notifications par email', desc: 'Recevoir des notifications par email' },
                                { key: 'browserNotifications', label: 'Notifications navigateur', desc: 'Recevoir des notifications dans le navigateur' },
                                { key: 'marketingEmails', label: 'Emails marketing', desc: 'Recevoir des emails promotionnels' }
                            ].map((item) => (
                                <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg" style={{ borderColor: 'var(--border-primary)' }}>
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="font-medium" style={{ color: 'var(--heading-color)' }}>
                                                {item.label}
                                            </p>
                                            <p className="text-sm text-muted">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings[item.key as keyof typeof settings] as boolean}
                                            onChange={(e) => handleInputChange(item.key, e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex justify-end">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleSave('notifications')}
                                className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                            >
                                <Bell className="h-4 w-4" />
                                Sauvegarder les notifications
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* System Settings */}
                    <motion.div variants={itemVariants} className="vite-card p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                                <Palette className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h2 className="text-xl font-semibold" style={{ color: 'var(--heading-color)' }}>
                                Système
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                    Thème
                                </label>
                                <select
                                    value={settings.theme}
                                    onChange={(e) => handleInputChange('theme', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    style={{
                                        background: 'var(--card-bg)',
                                        borderColor: 'var(--border-primary)',
                                        color: 'var(--heading-color)'
                                    }}
                                >
                                    <option value="auto">Automatique</option>
                                    <option value="light">Clair</option>
                                    <option value="dark">Sombre</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                    Langue
                                </label>
                                <select
                                    value={settings.language}
                                    onChange={(e) => handleInputChange('language', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    style={{
                                        background: 'var(--card-bg)',
                                        borderColor: 'var(--border-primary)',
                                        color: 'var(--heading-color)'
                                    }}
                                >
                                    <option value="fr">Français</option>
                                    <option value="en">English</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                    Fuseau horaire
                                </label>
                                <select
                                    value={settings.timezone}
                                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    style={{
                                        background: 'var(--card-bg)',
                                        borderColor: 'var(--border-primary)',
                                        color: 'var(--heading-color)'
                                    }}
                                >
                                    <option value="Europe/Paris">Europe/Paris</option>
                                    <option value="Europe/London">Europe/London</option>
                                    <option value="America/New_York">America/New_York</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleSave('system')}
                                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                <Palette className="h-4 w-4" />
                                Sauvegarder le système
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Database Settings */}
                    <motion.div variants={itemVariants} className="vite-card p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                                <Database className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <h2 className="text-xl font-semibold" style={{ color: 'var(--heading-color)' }}>
                                Base de données
                            </h2>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 border rounded-lg" style={{ borderColor: 'var(--border-primary)' }}>
                                <div className="flex items-center gap-3">
                                    <Database className="h-5 w-5 text-gray-500" />
                                    <div>
                                        <p className="font-medium" style={{ color: 'var(--heading-color)' }}>
                                            Sauvegarde automatique
                                        </p>
                                        <p className="text-sm text-muted">
                                            Effectuer des sauvegardes automatiques de la base de données
                                        </p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.autoBackup}
                                        onChange={(e) => handleInputChange('autoBackup', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                        Fréquence de sauvegarde
                                    </label>
                                    <select
                                        value={settings.backupFrequency}
                                        onChange={(e) => handleInputChange('backupFrequency', e.target.value)}
                                        disabled={!settings.autoBackup}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                                        style={{
                                            background: 'var(--card-bg)',
                                            borderColor: 'var(--border-primary)',
                                            color: 'var(--heading-color)'
                                        }}
                                    >
                                        <option value="hourly">Toutes les heures</option>
                                        <option value="daily">Quotidienne</option>
                                        <option value="weekly">Hebdomadaire</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                        Nombre max de sauvegardes
                                    </label>
                                    <input
                                        type="number"
                                        value={settings.maxBackups}
                                        onChange={(e) => handleInputChange('maxBackups', parseInt(e.target.value))}
                                        disabled={!settings.autoBackup}
                                        min="1"
                                        max="30"
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                                        style={{
                                            background: 'var(--card-bg)',
                                            borderColor: 'var(--border-primary)',
                                            color: 'var(--heading-color)'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleSave('database')}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <Database className="h-4 w-4" />
                                Sauvegarder la configuration
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
} 