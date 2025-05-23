'use client'

import { motion } from 'framer-motion';
import {
    MessageSquare,
    Search,
    Filter,
    Mail,
    MailOpen,
    Reply,
    Trash2,
    Calendar,
    User,
    Phone,
    ExternalLink,
    Archive,
    Star,
    Clock
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
const mockMessages = [
    {
        id: 1,
        name: 'Jean Dupont',
        email: 'jean.dupont@example.com',
        subject: 'Collaboration sur un projet de jeu',
        message: 'Bonjour, je suis intéressé par votre travail et j\'aimerais discuter d\'une possible collaboration sur un projet de jeu mobile.',
        replied: false,
        starred: true,
        createdAt: new Date('2024-01-15T10:30:00'),
        phone: '+33 6 12 34 56 78'
    },
    {
        id: 2,
        name: 'Marie Martin',
        email: 'marie.martin@studio.com',
        subject: 'Offre d\'emploi - Développeur Unity',
        message: 'Nous recherchons un développeur Unity expérimenté pour rejoindre notre équipe. Votre profil nous intéresse beaucoup.',
        replied: true,
        starred: false,
        createdAt: new Date('2024-01-14T14:20:00'),
        phone: null
    },
    {
        id: 3,
        name: 'Pierre Durand',
        email: 'pierre.durand@gmail.com',
        subject: 'Question technique sur Unreal Engine',
        message: 'J\'ai vu votre article sur l\'optimisation dans Unreal Engine. Pourriez-vous m\'aider avec un problème de performance ?',
        replied: false,
        starred: false,
        createdAt: new Date('2024-01-13T09:15:00'),
        phone: null
    },
    {
        id: 4,
        name: 'Sophie Bernard',
        email: 'sophie.bernard@indie.dev',
        subject: 'Demande de conseil pour débutant',
        message: 'Je débute dans le développement de jeux vidéo. Auriez-vous des conseils à me donner pour commencer ?',
        replied: true,
        starred: false,
        createdAt: new Date('2024-01-12T16:45:00'),
        phone: '+33 7 98 76 54 32'
    }
];

export default function AdminMessages() {
    const [messages, setMessages] = useState(mockMessages);
    const [selectedMessage, setSelectedMessage] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all'); // all, unread, read, starred
    const [replyText, setReplyText] = useState('');
    const [showReplyModal, setShowReplyModal] = useState(false);

    const filteredMessages = messages.filter(message => {
        const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.subject.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filter === 'all' ||
            (filter === 'unread' && !message.replied) ||
            (filter === 'read' && message.replied) ||
            (filter === 'starred' && message.starred);

        return matchesSearch && matchesFilter;
    });

    const handleReply = (message: any) => {
        setSelectedMessage(message);
        setShowReplyModal(true);
        setReplyText(`Bonjour ${message.name},\n\nMerci pour votre message concernant "${message.subject}".\n\n`);
    };

    const handleSendReply = async () => {
        if (!selectedMessage || !replyText.trim()) return;

        // TODO: Implement actual email sending
        console.log('Sending reply to:', selectedMessage.email, replyText);

        // Mark as replied
        setMessages(prev => prev.map(msg =>
            msg.id === selectedMessage.id ? { ...msg, replied: true } : msg
        ));

        setShowReplyModal(false);
        setReplyText('');
        setSelectedMessage(null);
    };

    const handleToggleStar = (messageId: number) => {
        setMessages(prev => prev.map(msg =>
            msg.id === messageId ? { ...msg, starred: !msg.starred } : msg
        ));
    };

    const handleDelete = (messageId: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
            setMessages(prev => prev.filter(msg => msg.id !== messageId));
        }
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

    const getMessageStats = () => {
        const total = messages.length;
        const unread = messages.filter(m => !m.replied).length;
        const starred = messages.filter(m => m.starred).length;
        return { total, unread, starred };
    };

    const stats = getMessageStats();

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
                        <span className="gradient-text">Messages</span> de Contact
                    </h1>
                    <p className="vite-subheading text-left lg:text-left">
                        Gérez les messages reçus via le formulaire de contact.
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div variants={itemVariants} className="vite-grid vite-grid-2 lg:grid-cols-3">
                    <div className="vite-card p-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                                <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold" style={{ color: 'var(--heading-color)' }}>
                                    {stats.total}
                                </p>
                                <p className="text-sm text-muted">Total des messages</p>
                            </div>
                        </div>
                    </div>

                    <div className="vite-card p-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/30">
                                <Mail className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold" style={{ color: 'var(--heading-color)' }}>
                                    {stats.unread}
                                </p>
                                <p className="text-sm text-muted">Non répondus</p>
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
                                    {stats.starred}
                                </p>
                                <p className="text-sm text-muted">Favoris</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Filters and Search */}
                <motion.div variants={itemVariants} className="vite-card p-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                            {[
                                { key: 'all', label: 'Tous', count: stats.total },
                                { key: 'unread', label: 'Non répondus', count: stats.unread },
                                { key: 'read', label: 'Répondus', count: stats.total - stats.unread },
                                { key: 'starred', label: 'Favoris', count: stats.starred }
                            ].map((filterOption) => (
                                <button
                                    key={filterOption.key}
                                    onClick={() => setFilter(filterOption.key)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === filterOption.key
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {filterOption.label} ({filterOption.count})
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full lg:w-80">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher dans les messages..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                style={{
                                    background: 'var(--card-bg)',
                                    borderColor: 'var(--border-primary)',
                                    color: 'var(--heading-color)'
                                }}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Messages List */}
                <motion.div variants={itemVariants} className="vite-card p-6">
                    <div className="space-y-4">
                        {filteredMessages.length === 0 ? (
                            <div className="text-center py-12">
                                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-lg font-medium text-gray-500">Aucun message trouvé</p>
                                <p className="text-sm text-gray-400">Essayez de modifier vos filtres de recherche</p>
                            </div>
                        ) : (
                            filteredMessages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    whileHover={{ scale: 1.01 }}
                                    className={`p-4 border rounded-lg transition-all cursor-pointer ${!message.replied
                                            ? 'border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10'
                                            : 'border-gray-200 dark:border-gray-700'
                                        }`}
                                    style={{ borderColor: 'var(--border-primary)' }}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="flex items-center gap-2">
                                                    {message.replied ? (
                                                        <MailOpen className="h-4 w-4 text-green-500" />
                                                    ) : (
                                                        <Mail className="h-4 w-4 text-blue-500" />
                                                    )}
                                                    <h3 className="font-semibold" style={{ color: 'var(--heading-color)' }}>
                                                        {message.name}
                                                    </h3>
                                                </div>
                                                <span className="text-sm text-muted">{message.email}</span>
                                                {message.phone && (
                                                    <span className="text-sm text-muted flex items-center gap-1">
                                                        <Phone className="h-3 w-3" />
                                                        {message.phone}
                                                    </span>
                                                )}
                                            </div>

                                            <h4 className="font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                                {message.subject}
                                            </h4>

                                            <p className="text-sm text-muted line-clamp-2 mb-3">
                                                {message.message}
                                            </p>

                                            <div className="flex items-center gap-2 text-xs text-muted">
                                                <Calendar className="h-3 w-3" />
                                                {formatDate(message.createdAt)}
                                                {!message.replied && (
                                                    <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
                                                        <Clock className="h-3 w-3" />
                                                        En attente de réponse
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 ml-4">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleToggleStar(message.id);
                                                }}
                                                className={`p-2 rounded-lg transition-colors ${message.starred
                                                        ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30'
                                                        : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-100 dark:hover:bg-yellow-900/30'
                                                    }`}
                                            >
                                                <Star className={`h-4 w-4 ${message.starred ? 'fill-current' : ''}`} />
                                            </motion.button>

                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleReply(message);
                                                }}
                                                className="p-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                                            >
                                                <Reply className="h-4 w-4" />
                                            </motion.button>

                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(message.id);
                                                }}
                                                className="p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </motion.div>

                {/* Reply Modal */}
                {showReplyModal && selectedMessage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowReplyModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="vite-card p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold" style={{ color: 'var(--heading-color)' }}>
                                    Répondre à {selectedMessage.name}
                                </h2>
                                <button
                                    onClick={() => setShowReplyModal(false)}
                                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    ×
                                </button>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <p className="text-sm text-muted mb-2">Message original :</p>
                                    <p className="font-medium mb-1" style={{ color: 'var(--subheading-color)' }}>
                                        {selectedMessage.subject}
                                    </p>
                                    <p className="text-sm" style={{ color: 'var(--heading-color)' }}>
                                        {selectedMessage.message}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--subheading-color)' }}>
                                        Votre réponse
                                    </label>
                                    <textarea
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        rows={8}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        style={{
                                            background: 'var(--card-bg)',
                                            borderColor: 'var(--border-primary)',
                                            color: 'var(--heading-color)'
                                        }}
                                        placeholder="Tapez votre réponse ici..."
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowReplyModal(false)}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    style={{ borderColor: 'var(--border-primary)', color: 'var(--subheading-color)' }}
                                >
                                    Annuler
                                </button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSendReply}
                                    disabled={!replyText.trim()}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Reply className="h-4 w-4" />
                                    Envoyer la réponse
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
} 