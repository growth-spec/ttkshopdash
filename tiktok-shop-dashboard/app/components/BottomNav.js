'use client';

import Link from 'next/link';

/**
 * Barra de navegação inferior, compartilhada entre as telas.
 * Recebe `active` para destacar o item atual ('home', 'products', etc).
 */
export default function BottomNav({ active }) {
  const items = [
    { id: 'home',     label: 'Início',     href: '/' },
    { id: 'products', label: 'Produtos',   href: '#' },
    { id: 'videos',   label: 'Vídeos',     href: '#', dot: true },
    { id: 'live',     label: 'LIVE',       href: '#' },
    { id: 'growth',   label: 'Crescimento', href: '#' }
  ];

  return (
    <nav className="bottom-nav">
      {items.map(item => (
        <Link
          key={item.id}
          href={item.href}
          className={'nav-item ' + (active === item.id ? 'active' : '')}
        >
          <div className="nav-icon-container">
            <svg
              viewBox="0 0 24 24"
              fill={item.id === 'home' && active === 'home' ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="nav-icon"
            >
              {item.id === 'home' && <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>}
              {item.id === 'products' && (<><rect x="4" y="7" width="16" height="15" rx="2" ry="2"/><path d="M8 7V5a4 4 0 0 1 8 0v2"/></>)}
              {item.id === 'videos' && (<><rect x="3" y="5" width="18" height="14" rx="2" ry="2"/><polygon points="10 9 15 12 10 15 10 9"/></>)}
              {item.id === 'live' && (<><rect x="3" y="6" width="18" height="14" rx="2" ry="2"/><path d="M10 6V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2"/><line x1="9" y1="15" x2="9" y2="10"/><line x1="12" y1="15" x2="12" y2="12"/><line x1="15" y1="15" x2="15" y2="11"/></>)}
              {item.id === 'growth' && (<><path d="M5 4h14v7c0 5.5-5 9.5-7 11-2-1.5-7-5.5-7-11V4z"/><polygon points="12 8 13.5 10.5 16 11 14 13 14.5 16 12 14.5 9.5 16 10 13 8 11 10.5 10.5"/></>)}
            </svg>
            {item.dot && <span className="notification-dot"></span>}
          </div>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
