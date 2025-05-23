import SidebarClient from './SidebarClient'

const navigationItems = [
  { id: 'hero', label: 'Accueil', icon: 'home' },
  { id: 'skills', label: 'Compétences', icon: 'code' },
  { id: 'projects', label: 'Projets', icon: 'folder' },
  { id: 'experience', label: 'Expérience', icon: 'briefcase' },
  { id: 'education', label: 'Formation', icon: 'graduation' },
  { id: 'contact', label: 'Contact', icon: 'mail' }
]

export default function Sidebar() {
  return <SidebarClient navigationItems={navigationItems} />
}
