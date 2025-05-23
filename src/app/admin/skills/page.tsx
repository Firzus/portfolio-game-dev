'use client'

import { motion } from 'framer-motion';
import {
    GraduationCap,
    Plus,
    Edit,
    Trash2,
    Search,
    Filter,
    Star,
    Code,
    Gamepad2,
    Palette,
    Database,
    Settings,
    Save,
    X
} from 'lucide-react';
import { useState, useEffect } from 'react';

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

// Mock data - replace with real API calls
const mockSkills = [
    {
        id: 1,
        name: 'Unity',
        category: 'Game Engines',
        level: 9,
        icon: 'gamepad2',
        color: 'blue',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-15')
    },
    {
        id: 2,
        name: 'Unreal Engine',
        category: 'Game Engines',
        level: 7,
        icon: 'gamepad2',
        color: 'purple',
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-14')
    },
    {
        id: 3,
        name: 'C#',
        category: 'Programming Languages',
        level: 9,
        icon: 'code',
        color: 'green',
        createdAt: new Date('2024-01-03'),
        updatedAt: new Date('2024-01-13')
    },
    {
        id: 4,
        name: 'C++',
        category: 'Programming Languages',
        level: 8,
        icon: 'code',
        color: 'blue',
        createdAt: new Date('2024-01-04'),
        updatedAt: new Date('2024-01-12')
    },
    {
        id: 5,
        name: 'Blender',
        category: 'Art & Design',
        level: 6,
        icon: 'palette',
        color: 'orange',
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-11')
    },
    {
        id: 6,
        name: 'PostgreSQL',
        category: 'Databases',
        level: 7,
        icon: 'database',
        color: 'blue',
        createdAt: new Date('2024-01-06'),
        updatedAt: new Date('2024-01-10')
    }
];

const categories = [
    'Game Engines',
    'Programming Languages',
    'Art & Design',
    'Databases',
    'Tools & Software',
    'Frameworks',
    'Other'
];

const iconOptions = [
    { value: 'gamepad2', label: 'Game Controller', icon: Gamepad2 },
    { value: 'code', label: 'Code', icon: Code },
    { value: 'palette', label: 'Palette', icon: Palette },
    { value: 'database', label: 'Database', icon: Database },
    { value: 'settings', label: 'Settings', icon: Settings }
];

const colorOptions = [
    { value: 'blue', label: 'Bleu', class: 'bg-blue-500' },
    { value: 'green', label: 'Vert', class: 'bg-green-500' },
    { value: 'purple', label: 'Violet', class: 'bg-purple-500' },
    { value: 'orange', label: 'Orange', class: 'bg-orange-500' },
    { value: 'red', label: 'Rouge', class: 'bg-red-500' },
    { value: 'yellow', label: 'Jaune', class: 'bg-yellow-500' }
];

export default function AdminSkills() {
    const [skills, setSkills] = useState(mockSkills);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [editingSkill, setEditingSkill] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: '',
        category: 'Game Engines',
        level: 5,
        icon: 'gamepad2',
        color: 'blue'
    });

    const filteredSkills = skills.filter(skill => {
        const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            skill.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || skill.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const getSkillsByCategory = () => {
        const grouped = filteredSkills.reduce((acc, skill) => {
            if (!acc[skill.category]) {
                acc[skill.category] = [];
            }
            acc[skill.category].push(skill);
            return acc;
        }, {} as Record<string, typeof skills>);

        // Sort skills within each category by level (descending)
        Object.keys(grouped).forEach(category => {
            grouped[category].sort((a, b) => b.level - a.level);
        });

        return grouped;
    };

    const handleAddSkill = () => {
        setEditingSkill(null);
        setFormData({
            name: '',
            category: 'Game Engines',
            level: 5,
            icon: 'gamepad2',
            color: 'blue'
        });
        setShowModal(true);
    };

    const handleEditSkill = (skill: any) => {
        setEditingSkill(skill);
        setFormData({
            name: skill.name,
            category: skill.category,
            level: skill.level,
            icon: skill.icon,
            color: skill.color
        });
        setShowModal(true);
    };

    const handleDeleteSkill = (skillId: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette compétence ?')) {
            setSkills(prev => prev.filter(skill => skill.id !== skillId));
        }
    };

    const handleSaveSkill = async () => {
        if (!formData.name.trim()) return;

        if (editingSkill) {
            // Update existing skill
            setSkills(prev => prev.map(skill =>
                skill.id === editingSkill.id
                    ? { ...skill, ...formData, updatedAt: new Date() }
                    : skill
            ));
        } else {
            // Add new skill
            const newSkill = {
                id: Math.max(...skills.map(s => s.id)) + 1,
                ...formData,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            setSkills(prev => [...prev, newSkill]);
        }

        setShowModal(false);
        setEditingSkill(null);
    };

    const getIconComponent = (iconName: string) => {
        const iconOption = iconOptions.find(opt => opt.value === iconName);
        return iconOption ? iconOption.icon : Gamepad2;
    };

    const getLevelColor = (level: number) => {
        if (level >= 9) return 'text-green-600 dark:text-green-400';
        if (level >= 7) return 'text-blue-600 dark:text-blue-400';
        if (level >= 5) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-gray-600 dark:text-gray-400';
    };

    const getLevelLabel = (level: number) => {
        if (level >= 9) return 'Expert';
        if (level >= 7) return 'Avancé';
        if (level >= 5) return 'Intermédiaire';
        return 'Débutant';
    };

    const getStats = () => {
        const total = skills.length;
        const expert = skills.filter(s => s.level >= 9).length;
        const advanced = skills.filter(s => s.level >= 7 && s.level < 9).length;
        const intermediate = skills.filter(s => s.level >= 5 && s.level < 7).length;
        return { total, expert, advanced, intermediate };
    };

    const stats = getStats();
    const groupedSkills = getSkillsByCategory();

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
                        <span className="gradient-text">Compétences</span> Techniques
                    </h1>
                    <p className="vite-subheading text-left lg:text-left">
                        Gérez vos compétences techniques et leur niveau de maîtrise.
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div variants={itemVariants} className="vite-grid vite-grid-2 lg:grid-cols-4">
                    <div className="vite-card p-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                                <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold" style={{ color: 'var(--heading-color)' }}>
                                    {stats.total}
                                </p>
                                <p className="text-sm text-muted">Total</p>
                            </div>
                        </div>
                    </div>

                    <div className="vite-card p-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
                                <Star className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold" style={{ color: 'var(--heading-color)' }}>
                                    {stats.expert}
                                </p>
                                <p className="text-sm text-muted">Expert</p>
                            </div>
                        </div>
                    </div>

                    <div className="vite-card p-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                                <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold" style={{ color: 'var(--heading-color)' }}>
                                    {stats.advanced}
                                </p>
                                <p className="text-sm text-muted">Avancé</p>
                            </div>
                        </div>
                    </div>

                    <div className="vite-card p-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-yellow-100 dark:bg-yellow-900/30">
                                <GraduationCap className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold" style={{ color: 'var(--heading-color)' }}>
                                    {stats.intermediate}
                                </p>
                                <p className="text-sm text-muted">Intermédiaire</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Controls */}
                <motion.div variants={itemVariants} className="vite-card p-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Rechercher une compétence..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                                    style={{
                                        background: 'var(--card-bg)',
                                        borderColor: 'var(--border-primary)',
                                        color: 'var(--heading-color)'
                                    }}
                                />
                            </div>

                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                style={{
                                    background: 'var(--card-bg)',
                                    borderColor: 'var(--border-primary)',
                                    color: 'var(--heading-color)'
                                }}
                            >
                                <option value="all">Toutes les catégories</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleAddSkill}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                            Ajouter une compétence
                        </motion.button>
                    </div>
                </motion.div>

                {/* Skills by Category */}
                <div className="space-y-6">
                    {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                        <motion.div key={category} variants={itemVariants} className="vite-card p-6">
                            <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--heading-color)' }}>
                                {category} ({categorySkills.length})
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {categorySkills.map((skill) => {
                                    const IconComponent = getIconComponent(skill.icon);
                                    return (
                                        <motion.div
                                            key={skill.id}
                                            whileHover={{ scale: 1.02 }}
                                            className="p-4 border rounded-lg transition-all"
                                            style={{ borderColor: 'var(--border-primary)' }}
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg ${skill.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                                                            skill.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                                                                skill.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30' :
                                                                    skill.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30' :
                                                                        skill.color === 'red' ? 'bg-red-100 dark:bg-red-900/30' :
                                                                            'bg-yellow-100 dark:bg-yellow-900/30'
                                                        }`}>
                                                        <IconComponent className={`h-5 w-5 ${skill.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                                                                skill.color === 'green' ? 'text-green-600 dark:text-green-400' :
                                                                    skill.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                                                                        skill.color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
                                                                            skill.color === 'red' ? 'text-red-600 dark:text-red-400' :
                                                                                'text-yellow-600 dark:text-yellow-400'
                                                            }`} />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold" style={{ color: 'var(--heading-color)' }}>
                                                            {skill.name}
                                                        </h3>
                                                        <p className={`text-sm font-medium ${getLevelColor(skill.level)}`}>
                                                            {getLevelLabel(skill.level)} ({skill.level}/10)
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-1">
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleEditSkill(skill)}
                                                        className="p-1 rounded text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleDeleteSkill(skill.id)}
                                                        className="p-1 rounded text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </motion.button>
                                                </div>
                                            </div>

                                            {/* Level Bar */}
                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full transition-all ${skill.level >= 9 ? 'bg-green-500' :
                                                            skill.level >= 7 ? 'bg-blue-500' :
                                                                skill.level >= 5 ? 'bg-yellow-500' :
                                                                    'bg-gray-500'
                                                        }`}
                                                    style={{ width: `${skill.level * 10}%` }}
                                                />
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Add/Edit Modal */}
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="vite-card p-6 w-full max-w-md"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold" style={{ color: 'var(--heading-color)' }}>
                                    {editingSkill ? 'Modifier la compétence' : 'Ajouter une compétence'}
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                        Nom de la compétence
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        style={{
                                            background: 'var(--card-bg)',
                                            borderColor: 'var(--border-primary)',
                                            color: 'var(--heading-color)'
                                        }}
                                        placeholder="Ex: Unity, C#, Blender..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                        Catégorie
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        style={{
                                            background: 'var(--card-bg)',
                                            borderColor: 'var(--border-primary)',
                                            color: 'var(--heading-color)'
                                        }}
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                        Niveau (1-10): {formData.level}
                                    </label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={formData.level}
                                        onChange={(e) => setFormData(prev => ({ ...prev, level: parseInt(e.target.value) }))}
                                        className="w-full"
                                    />
                                    <div className="flex justify-between text-xs text-muted mt-1">
                                        <span>Débutant</span>
                                        <span>Intermédiaire</span>
                                        <span>Avancé</span>
                                        <span>Expert</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                        Icône
                                    </label>
                                    <div className="grid grid-cols-5 gap-2">
                                        {iconOptions.map(option => {
                                            const IconComponent = option.icon;
                                            return (
                                                <button
                                                    key={option.value}
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, icon: option.value }))}
                                                    className={`p-3 rounded-lg border transition-all ${formData.icon === option.value
                                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <IconComponent className="h-5 w-5 mx-auto" />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                        Couleur
                                    </label>
                                    <div className="grid grid-cols-6 gap-2">
                                        {colorOptions.map(option => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, color: option.value }))}
                                                className={`w-8 h-8 rounded-lg ${option.class} transition-all ${formData.color === option.value
                                                        ? 'ring-2 ring-offset-2 ring-blue-500'
                                                        : 'hover:scale-110'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    style={{ borderColor: 'var(--border-primary)', color: 'var(--subheading-color)' }}
                                >
                                    Annuler
                                </button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSaveSkill}
                                    disabled={!formData.name.trim()}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save className="h-4 w-4" />
                                    {editingSkill ? 'Modifier' : 'Ajouter'}
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
} 