'use client'

import { motion } from 'framer-motion';
import {
    Image as ImageIcon,
    Plus,
    Edit,
    Trash2,
    Search,
    Filter,
    Star,
    ExternalLink,
    Github,
    Calendar,
    Tag,
    Save,
    X,
    Eye,
    Code,
    Gamepad2
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
const mockProjects = [
    {
        id: 1,
        title: 'Space Explorer VR',
        description: 'Un jeu d\'exploration spatiale en réalité virtuelle développé avec Unity. Le joueur explore des planètes mystérieuses et découvre des civilisations anciennes.',
        shortDescription: 'Jeu d\'exploration spatiale en VR avec Unity',
        image: '/images/space-explorer.jpg',
        demoUrl: 'https://demo.space-explorer.com',
        sourceUrl: 'https://github.com/user/space-explorer',
        technologies: ['Unity', 'C#', 'VR', 'Oculus SDK', 'Blender'],
        featured: true,
        createdAt: new Date('2024-01-10T10:00:00'),
        updatedAt: new Date('2024-01-15T14:30:00')
    },
    {
        id: 2,
        title: 'Pixel Adventure',
        description: 'Un platformer 2D rétro inspiré des jeux classiques des années 90. Développé avec Unity et doté d\'un système de progression et de collectibles.',
        shortDescription: 'Platformer 2D rétro avec Unity',
        image: '/images/pixel-adventure.jpg',
        demoUrl: 'https://demo.pixel-adventure.com',
        sourceUrl: null,
        technologies: ['Unity', 'C#', '2D', 'Pixel Art', 'Animation'],
        featured: false,
        createdAt: new Date('2024-01-05T09:15:00'),
        updatedAt: new Date('2024-01-12T16:20:00')
    },
    {
        id: 3,
        title: 'Racing Simulator',
        description: 'Simulateur de course réaliste développé avec Unreal Engine 5. Physique avancée des véhicules et circuits détaillés.',
        shortDescription: 'Simulateur de course avec Unreal Engine 5',
        image: '/images/racing-simulator.jpg',
        demoUrl: null,
        sourceUrl: 'https://github.com/user/racing-simulator',
        technologies: ['Unreal Engine', 'C++', 'Blueprint', 'Physics', '3D Modeling'],
        featured: true,
        createdAt: new Date('2023-12-20T11:30:00'),
        updatedAt: new Date('2024-01-08T13:45:00')
    },
    {
        id: 4,
        title: 'Mobile Puzzle Game',
        description: 'Jeu de puzzle mobile addictif avec plus de 100 niveaux. Interface intuitive et mécaniques de jeu innovantes.',
        shortDescription: 'Jeu de puzzle mobile avec 100+ niveaux',
        image: '/images/mobile-puzzle.jpg',
        demoUrl: 'https://play.google.com/store/apps/details?id=com.example.puzzle',
        sourceUrl: null,
        technologies: ['Unity', 'C#', 'Mobile', 'UI/UX', 'Analytics'],
        featured: false,
        createdAt: new Date('2023-11-15T14:20:00'),
        updatedAt: new Date('2024-01-03T10:15:00')
    }
];

const availableTechnologies = [
    'Unity', 'Unreal Engine', 'C#', 'C++', 'JavaScript', 'Python',
    'VR', 'AR', 'Mobile', '2D', '3D', 'Physics', 'AI', 'Networking',
    'Blender', 'Maya', 'Photoshop', 'Pixel Art', 'Animation',
    'UI/UX', 'Analytics', 'Optimization', 'Shaders', 'Audio'
];

export default function AdminProjects() {
    const [projects, setProjects] = useState(mockProjects);
    const [searchTerm, setSearchTerm] = useState('');
    const [featuredFilter, setFeaturedFilter] = useState('all'); // all, featured, regular
    const [showModal, setShowModal] = useState(false);
    const [editingProject, setEditingProject] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        shortDescription: '',
        image: '',
        demoUrl: '',
        sourceUrl: '',
        technologies: [] as string[],
        featured: false
    });

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesFeatured = featuredFilter === 'all' ||
            (featuredFilter === 'featured' && project.featured) ||
            (featuredFilter === 'regular' && !project.featured);

        return matchesSearch && matchesFeatured;
    });

    const handleAddProject = () => {
        setEditingProject(null);
        setFormData({
            title: '',
            description: '',
            shortDescription: '',
            image: '',
            demoUrl: '',
            sourceUrl: '',
            technologies: [],
            featured: false
        });
        setShowModal(true);
    };

    const handleEditProject = (project: any) => {
        setEditingProject(project);
        setFormData({
            title: project.title,
            description: project.description,
            shortDescription: project.shortDescription,
            image: project.image,
            demoUrl: project.demoUrl || '',
            sourceUrl: project.sourceUrl || '',
            technologies: project.technologies,
            featured: project.featured
        });
        setShowModal(true);
    };

    const handleDeleteProject = (projectId: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
            setProjects(prev => prev.filter(project => project.id !== projectId));
        }
    };

    const handleToggleFeatured = (projectId: number) => {
        setProjects(prev => prev.map(project =>
            project.id === projectId
                ? { ...project, featured: !project.featured, updatedAt: new Date() }
                : project
        ));
    };

    const handleSaveProject = async () => {
        if (!formData.title.trim() || !formData.description.trim()) return;

        if (editingProject) {
            // Update existing project
            setProjects(prev => prev.map(project =>
                project.id === editingProject.id
                    ? { ...project, ...formData, updatedAt: new Date() }
                    : project
            ));
        } else {
            // Add new project
            const newProject = {
                id: Math.max(...projects.map(p => p.id)) + 1,
                ...formData,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            setProjects(prev => [...prev, newProject]);
        }

        setShowModal(false);
        setEditingProject(null);
    };

    const handleTechnologyToggle = (tech: string) => {
        setFormData(prev => ({
            ...prev,
            technologies: prev.technologies.includes(tech)
                ? prev.technologies.filter(t => t !== tech)
                : [...prev.technologies, tech]
        }));
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }).format(date);
    };

    const getStats = () => {
        const total = projects.length;
        const featured = projects.filter(p => p.featured).length;
        const withDemo = projects.filter(p => p.demoUrl).length;
        const withSource = projects.filter(p => p.sourceUrl).length;
        return { total, featured, withDemo, withSource };
    };

    const stats = getStats();

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
                        <span className="gradient-text">Projets</span> de Jeux
                    </h1>
                    <p className="vite-subheading text-left lg:text-left">
                        Gérez votre portfolio de projets de développement de jeux vidéo.
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div variants={itemVariants} className="vite-grid vite-grid-2 lg:grid-cols-4">
                    <div className="vite-card p-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                                <Gamepad2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold" style={{ color: 'var(--heading-color)' }}>
                                    {stats.total}
                                </p>
                                <p className="text-sm text-muted">Total projets</p>
                            </div>
                        </div>
                    </div>

                    <div className="vite-card p-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-yellow-100 dark:bg-yellow-900/30">
                                <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold" style={{ color: 'var(--heading-color)' }}>
                                    {stats.featured}
                                </p>
                                <p className="text-sm text-muted">En vedette</p>
                            </div>
                        </div>
                    </div>

                    <div className="vite-card p-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
                                <Eye className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold" style={{ color: 'var(--heading-color)' }}>
                                    {stats.withDemo}
                                </p>
                                <p className="text-sm text-muted">Avec démo</p>
                            </div>
                        </div>
                    </div>

                    <div className="vite-card p-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                                <Github className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold" style={{ color: 'var(--heading-color)' }}>
                                    {stats.withSource}
                                </p>
                                <p className="text-sm text-muted">Open source</p>
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
                                    placeholder="Rechercher un projet..."
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

                            <div className="flex gap-2">
                                {[
                                    { key: 'all', label: 'Tous', count: stats.total },
                                    { key: 'featured', label: 'En vedette', count: stats.featured },
                                    { key: 'regular', label: 'Réguliers', count: stats.total - stats.featured }
                                ].map((filterOption) => (
                                    <button
                                        key={filterOption.key}
                                        onClick={() => setFeaturedFilter(filterOption.key)}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${featuredFilter === filterOption.key
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        {filterOption.label} ({filterOption.count})
                                    </button>
                                ))}
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleAddProject}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                            Nouveau projet
                        </motion.button>
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredProjects.length === 0 ? (
                        <div className="lg:col-span-2 vite-card p-12 text-center">
                            <Gamepad2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-lg font-medium text-gray-500">Aucun projet trouvé</p>
                            <p className="text-sm text-gray-400">Essayez de modifier vos filtres de recherche</p>
                        </div>
                    ) : (
                        filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                whileHover={{ scale: 1.02 }}
                                className="vite-card p-6 group"
                            >
                                {/* Project Image */}
                                <div className="relative mb-4 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 h-48">
                                    {project.image ? (
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <ImageIcon className="h-12 w-12 text-gray-400" />
                                        </div>
                                    )}

                                    {/* Featured Badge */}
                                    {project.featured && (
                                        <div className="absolute top-3 left-3">
                                            <span className="flex items-center gap-1 px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">
                                                <Star className="h-3 w-3 fill-current" />
                                                Vedette
                                            </span>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => handleToggleFeatured(project.id)}
                                            className={`p-2 rounded-lg transition-colors ${project.featured
                                                    ? 'bg-yellow-500 text-white'
                                                    : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-yellow-100 dark:hover:bg-yellow-900/30'
                                                }`}
                                            title={project.featured ? 'Retirer de la vedette' : 'Mettre en vedette'}
                                        >
                                            <Star className={`h-4 w-4 ${project.featured ? 'fill-current' : ''}`} />
                                        </motion.button>

                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => handleEditProject(project)}
                                            className="p-2 rounded-lg bg-white/90 dark:bg-gray-800/90 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </motion.button>

                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => handleDeleteProject(project.id)}
                                            className="p-2 rounded-lg bg-white/90 dark:bg-gray-800/90 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </motion.button>
                                    </div>
                                </div>

                                {/* Project Info */}
                                <div className="space-y-3">
                                    <h3 className="text-lg font-semibold" style={{ color: 'var(--heading-color)' }}>
                                        {project.title}
                                    </h3>

                                    <p className="text-sm text-muted line-clamp-2">
                                        {project.shortDescription}
                                    </p>

                                    <p className="text-xs text-muted line-clamp-3">
                                        {project.description}
                                    </p>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-1">
                                        {project.technologies.slice(0, 4).map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 4 && (
                                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                                                +{project.technologies.length - 4}
                                            </span>
                                        )}
                                    </div>

                                    {/* Links and Date */}
                                    <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                                        <div className="flex items-center gap-2">
                                            {project.demoUrl && (
                                                <a
                                                    href={project.demoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-1 rounded text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                                                    title="Voir la démo"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                </a>
                                            )}
                                            {project.sourceUrl && (
                                                <a
                                                    href={project.sourceUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-1 rounded text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                                                    title="Voir le code source"
                                                >
                                                    <Github className="h-4 w-4" />
                                                </a>
                                            )}
                                        </div>

                                        <span className="text-xs text-muted flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {formatDate(project.updatedAt)}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </motion.div>

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
                            className="vite-card p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold" style={{ color: 'var(--heading-color)' }}>
                                    {editingProject ? 'Modifier le projet' : 'Nouveau projet'}
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                            Titre du projet
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            style={{
                                                background: 'var(--card-bg)',
                                                borderColor: 'var(--border-primary)',
                                                color: 'var(--heading-color)'
                                            }}
                                            placeholder="Ex: Space Explorer VR"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                            Image (URL)
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.image}
                                            onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            style={{
                                                background: 'var(--card-bg)',
                                                borderColor: 'var(--border-primary)',
                                                color: 'var(--heading-color)'
                                            }}
                                            placeholder="https://example.com/image.jpg"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                        Description courte
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.shortDescription}
                                        onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        style={{
                                            background: 'var(--card-bg)',
                                            borderColor: 'var(--border-primary)',
                                            color: 'var(--heading-color)'
                                        }}
                                        placeholder="Une description courte du projet..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                        Description complète
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                        rows={6}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        style={{
                                            background: 'var(--card-bg)',
                                            borderColor: 'var(--border-primary)',
                                            color: 'var(--heading-color)'
                                        }}
                                        placeholder="Description détaillée du projet, ses fonctionnalités, objectifs..."
                                    />
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                            URL de démo (optionnel)
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.demoUrl}
                                            onChange={(e) => setFormData(prev => ({ ...prev, demoUrl: e.target.value }))}
                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            style={{
                                                background: 'var(--card-bg)',
                                                borderColor: 'var(--border-primary)',
                                                color: 'var(--heading-color)'
                                            }}
                                            placeholder="https://demo.example.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                            URL du code source (optionnel)
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.sourceUrl}
                                            onChange={(e) => setFormData(prev => ({ ...prev, sourceUrl: e.target.value }))}
                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            style={{
                                                background: 'var(--card-bg)',
                                                borderColor: 'var(--border-primary)',
                                                color: 'var(--heading-color)'
                                            }}
                                            placeholder="https://github.com/user/project"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                        Technologies utilisées
                                    </label>
                                    <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-3 border rounded-lg" style={{ borderColor: 'var(--border-primary)' }}>
                                        {availableTechnologies.map((tech) => (
                                            <button
                                                key={tech}
                                                type="button"
                                                onClick={() => handleTechnologyToggle(tech)}
                                                className={`px-3 py-1 rounded-full text-sm transition-all ${formData.technologies.includes(tech)
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                                    }`}
                                            >
                                                {tech}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.featured}
                                            onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    </label>
                                    <span className="text-sm font-medium" style={{ color: 'var(--subheading-color)' }}>
                                        Mettre en vedette
                                    </span>
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
                                    onClick={handleSaveProject}
                                    disabled={!formData.title.trim() || !formData.description.trim()}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save className="h-4 w-4" />
                                    {editingProject ? 'Modifier' : 'Créer'}
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
} 