'use client'

import { motion } from 'framer-motion';
import {
    FileText,
    Plus,
    Edit,
    Trash2,
    Search,
    Filter,
    Eye,
    EyeOff,
    Calendar,
    Tag,
    Save,
    X,
    ExternalLink,
    Clock,
    CheckCircle,
    AlertCircle
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
const mockPosts = [
    {
        id: 1,
        title: 'Optimisation des performances dans Unity',
        slug: 'optimisation-performances-unity',
        content: 'Dans cet article, nous allons explorer les meilleures pratiques pour optimiser les performances de vos jeux Unity...',
        excerpt: 'Découvrez les techniques essentielles pour améliorer les performances de vos jeux Unity.',
        image: '/images/unity-optimization.jpg',
        published: true,
        publishedAt: new Date('2024-01-15T10:00:00'),
        tags: ['Unity', 'Performance', 'Optimisation'],
        createdAt: new Date('2024-01-14T15:30:00'),
        updatedAt: new Date('2024-01-15T10:00:00')
    },
    {
        id: 2,
        title: 'Introduction au développement avec Unreal Engine 5',
        slug: 'introduction-unreal-engine-5',
        content: 'Unreal Engine 5 apporte de nombreuses nouveautés révolutionnaires pour le développement de jeux...',
        excerpt: 'Un guide complet pour débuter avec Unreal Engine 5 et ses nouvelles fonctionnalités.',
        image: '/images/unreal-engine-5.jpg',
        published: false,
        publishedAt: null,
        tags: ['Unreal Engine', 'Débutant', 'Tutorial'],
        createdAt: new Date('2024-01-13T09:20:00'),
        updatedAt: new Date('2024-01-14T16:45:00')
    },
    {
        id: 3,
        title: 'Les bases du game design moderne',
        slug: 'bases-game-design-moderne',
        content: 'Le game design est un art qui combine créativité et technique pour créer des expériences mémorables...',
        excerpt: 'Explorez les principes fondamentaux du game design contemporain.',
        image: '/images/game-design.jpg',
        published: true,
        publishedAt: new Date('2024-01-12T14:30:00'),
        tags: ['Game Design', 'Théorie', 'Créativité'],
        createdAt: new Date('2024-01-11T11:15:00'),
        updatedAt: new Date('2024-01-12T14:30:00')
    },
    {
        id: 4,
        title: 'Intégration de l\'IA dans les jeux vidéo',
        slug: 'integration-ia-jeux-video',
        content: 'L\'intelligence artificielle révolutionne l\'industrie du jeu vidéo...',
        excerpt: 'Comment l\'IA transforme le développement et l\'expérience de jeu.',
        image: '/images/ai-gaming.jpg',
        published: false,
        publishedAt: null,
        tags: ['IA', 'Innovation', 'Futur'],
        createdAt: new Date('2024-01-10T08:45:00'),
        updatedAt: new Date('2024-01-11T12:20:00')
    }
];

const availableTags = [
    'Unity', 'Unreal Engine', 'C#', 'C++', 'Game Design', 'Performance',
    'Optimisation', 'Tutorial', 'Débutant', 'Avancé', 'IA', 'Innovation',
    'Théorie', 'Créativité', 'Futur', 'Mobile', 'PC', 'Console'
];

export default function AdminBlog() {
    const [posts, setPosts] = useState(mockPosts);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all'); // all, published, draft
    const [showModal, setShowModal] = useState(false);
    const [editingPost, setEditingPost] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        image: '',
        published: false,
        tags: [] as string[]
    });

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus = statusFilter === 'all' ||
            (statusFilter === 'published' && post.published) ||
            (statusFilter === 'draft' && !post.published);

        return matchesSearch && matchesStatus;
    });

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove accents
            .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single
            .trim();
    };

    const handleAddPost = () => {
        setEditingPost(null);
        setFormData({
            title: '',
            slug: '',
            content: '',
            excerpt: '',
            image: '',
            published: false,
            tags: []
        });
        setShowModal(true);
    };

    const handleEditPost = (post: any) => {
        setEditingPost(post);
        setFormData({
            title: post.title,
            slug: post.slug,
            content: post.content,
            excerpt: post.excerpt,
            image: post.image,
            published: post.published,
            tags: post.tags
        });
        setShowModal(true);
    };

    const handleDeletePost = (postId: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
            setPosts(prev => prev.filter(post => post.id !== postId));
        }
    };

    const handleTogglePublish = (postId: number) => {
        setPosts(prev => prev.map(post =>
            post.id === postId
                ? {
                    ...post,
                    published: !post.published,
                    publishedAt: !post.published ? new Date() : null,
                    updatedAt: new Date()
                }
                : post
        ));
    };

    const handleSavePost = async () => {
        if (!formData.title.trim() || !formData.content.trim()) return;

        const slug = formData.slug || generateSlug(formData.title);

        if (editingPost) {
            // Update existing post
            setPosts(prev => prev.map(post =>
                post.id === editingPost.id
                    ? {
                        ...post,
                        ...formData,
                        slug,
                        publishedAt: formData.published && !post.published ? new Date() : post.publishedAt,
                        updatedAt: new Date()
                    }
                    : post
            ));
        } else {
            // Add new post
            const newPost = {
                id: Math.max(...posts.map(p => p.id)) + 1,
                ...formData,
                slug,
                publishedAt: formData.published ? new Date() : null,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            setPosts(prev => [...prev, newPost]);
        }

        setShowModal(false);
        setEditingPost(null);
    };

    const handleTitleChange = (title: string) => {
        setFormData(prev => ({
            ...prev,
            title,
            slug: generateSlug(title)
        }));
    };

    const handleTagToggle = (tag: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.includes(tag)
                ? prev.tags.filter(t => t !== tag)
                : [...prev.tags, tag]
        }));
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const getStats = () => {
        const total = posts.length;
        const published = posts.filter(p => p.published).length;
        const drafts = posts.filter(p => !p.published).length;
        const recentPosts = posts.filter(p => {
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return p.createdAt > weekAgo;
        }).length;
        return { total, published, drafts, recentPosts };
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
                        <span className="gradient-text">Blog</span> Articles
                    </h1>
                    <p className="vite-subheading text-left lg:text-left">
                        Gérez vos articles de blog et partagez votre expertise.
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div variants={itemVariants} className="vite-grid vite-grid-2 lg:grid-cols-4">
                    <div className="vite-card p-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold" style={{ color: 'var(--heading-color)' }}>
                                    {stats.total}
                                </p>
                                <p className="text-sm text-muted">Total articles</p>
                            </div>
                        </div>
                    </div>

                    <div className="vite-card p-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
                                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold" style={{ color: 'var(--heading-color)' }}>
                                    {stats.published}
                                </p>
                                <p className="text-sm text-muted">Publiés</p>
                            </div>
                        </div>
                    </div>

                    <div className="vite-card p-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30">
                                <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold" style={{ color: 'var(--heading-color)' }}>
                                    {stats.drafts}
                                </p>
                                <p className="text-sm text-muted">Brouillons</p>
                            </div>
                        </div>
                    </div>

                    <div className="vite-card p-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                                <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold" style={{ color: 'var(--heading-color)' }}>
                                    {stats.recentPosts}
                                </p>
                                <p className="text-sm text-muted">Cette semaine</p>
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
                                    placeholder="Rechercher un article..."
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
                                    { key: 'published', label: 'Publiés', count: stats.published },
                                    { key: 'draft', label: 'Brouillons', count: stats.drafts }
                                ].map((filterOption) => (
                                    <button
                                        key={filterOption.key}
                                        onClick={() => setStatusFilter(filterOption.key)}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${statusFilter === filterOption.key
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
                            onClick={handleAddPost}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                            Nouvel article
                        </motion.button>
                    </div>
                </motion.div>

                {/* Posts List */}
                <motion.div variants={itemVariants} className="space-y-4">
                    {filteredPosts.length === 0 ? (
                        <div className="vite-card p-12 text-center">
                            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-lg font-medium text-gray-500">Aucun article trouvé</p>
                            <p className="text-sm text-gray-400">Essayez de modifier vos filtres de recherche</p>
                        </div>
                    ) : (
                        filteredPosts.map((post) => (
                            <motion.div
                                key={post.id}
                                whileHover={{ scale: 1.01 }}
                                className="vite-card p-6"
                            >
                                <div className="flex items-start gap-6">
                                    {/* Image */}
                                    <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0 flex items-center justify-center">
                                        {post.image ? (
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        ) : (
                                            <FileText className="h-8 w-8 text-gray-400" />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-lg font-semibold" style={{ color: 'var(--heading-color)' }}>
                                                    {post.title}
                                                </h3>
                                                <div className="flex items-center gap-2">
                                                    {post.published ? (
                                                        <span className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                                                            <CheckCircle className="h-3 w-3" />
                                                            Publié
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-1 px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs rounded-full">
                                                            <AlertCircle className="h-3 w-3" />
                                                            Brouillon
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleTogglePublish(post.id)}
                                                    className={`p-2 rounded-lg transition-colors ${post.published
                                                            ? 'text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30'
                                                            : 'text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30'
                                                        }`}
                                                    title={post.published ? 'Dépublier' : 'Publier'}
                                                >
                                                    {post.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </motion.button>

                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleEditPost(post)}
                                                    className="p-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </motion.button>

                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleDeletePost(post.id)}
                                                    className="p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </motion.button>
                                            </div>
                                        </div>

                                        <p className="text-sm text-muted mb-3 line-clamp-2">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center gap-4 text-xs text-muted mb-3">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                Créé le {formatDate(post.createdAt)}
                                            </span>
                                            {post.publishedAt && (
                                                <span className="flex items-center gap-1">
                                                    <CheckCircle className="h-3 w-3" />
                                                    Publié le {formatDate(post.publishedAt)}
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                Modifié le {formatDate(post.updatedAt)}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {post.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
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
                                    {editingPost ? 'Modifier l\'article' : 'Nouvel article'}
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
                                            Titre de l'article
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => handleTitleChange(e.target.value)}
                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            style={{
                                                background: 'var(--card-bg)',
                                                borderColor: 'var(--border-primary)',
                                                color: 'var(--heading-color)'
                                            }}
                                            placeholder="Ex: Les meilleures pratiques Unity..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                            Slug (URL)
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.slug}
                                            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            style={{
                                                background: 'var(--card-bg)',
                                                borderColor: 'var(--border-primary)',
                                                color: 'var(--heading-color)'
                                            }}
                                            placeholder="meilleures-pratiques-unity"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                        Résumé
                                    </label>
                                    <textarea
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                                        rows={3}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        style={{
                                            background: 'var(--card-bg)',
                                            borderColor: 'var(--border-primary)',
                                            color: 'var(--heading-color)'
                                        }}
                                        placeholder="Un bref résumé de l'article..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                        Contenu
                                    </label>
                                    <textarea
                                        value={formData.content}
                                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                        rows={12}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        style={{
                                            background: 'var(--card-bg)',
                                            borderColor: 'var(--border-primary)',
                                            color: 'var(--heading-color)'
                                        }}
                                        placeholder="Rédigez votre article ici..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                        Image de couverture (URL)
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

                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                        Tags
                                    </label>
                                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-3 border rounded-lg" style={{ borderColor: 'var(--border-primary)' }}>
                                        {availableTags.map((tag) => (
                                            <button
                                                key={tag}
                                                type="button"
                                                onClick={() => handleTagToggle(tag)}
                                                className={`px-3 py-1 rounded-full text-sm transition-all ${formData.tags.includes(tag)
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                                    }`}
                                            >
                                                #{tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.published}
                                            onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    </label>
                                    <span className="text-sm font-medium" style={{ color: 'var(--subheading-color)' }}>
                                        Publier immédiatement
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
                                    onClick={handleSavePost}
                                    disabled={!formData.title.trim() || !formData.content.trim()}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save className="h-4 w-4" />
                                    {editingPost ? 'Modifier' : 'Créer'}
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
} 