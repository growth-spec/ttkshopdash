'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Ticket, Video } from 'lucide-react';
import { formatBRL, formatNumberPT } from '@/lib/format';

export default function HomePage() {
  const [allData, setAllData] = useState(null);
  const [period, setPeriod] = useState('last_7_days');

  // Busca dados ao montar
  useEffect(() => {
    fetch('/api/data?t=' + Date.now())
      .then(res => res.json())
      .then(data => setAllData(data))
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  // Recebe atualizações em tempo real do admin
  useEffect(() => {
    function onMessage(event) {
      if (event.data && event.data.type === 'update_data') {
        setAllData(event.data.payload);
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  const periodData = allData?.[period] || {};
  const gmv = periodData.gmv?.current ?? 0;
  const comm = periodData.est_commission?.current ?? 0;
  const views = periodData.product_views?.current ?? 0;

  return (
    <div className="app-container">
      <header className="main-header">
        <h1>Central de criadores do TikTok<br />Shop</h1>
      </header>

      <div className="main-content">

        {/* Dados de desempenho */}
        <section className="card">
          <div className="section-header">
            <h2>Dados de desempenho</h2>
            <ChevronRight className="icon-chevron" size={20} />
          </div>

          <div className="tabs-container">
            <div className="tabs">
              <button
                className={'tab ' + (period === 'today' ? 'active' : '')}
                onClick={(e) => { e.stopPropagation(); setPeriod('today'); }}
              >Hoje</button>
              <button
                className={'tab ' + (period === 'last_7_days' ? 'active' : '')}
                onClick={(e) => { e.stopPropagation(); setPeriod('last_7_days'); }}
              >Últimos 7 dias</button>
            </div>
          </div>

          <Link href="/data" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="stats-grid" style={{ cursor: 'pointer' }}>
              <div className="stat-item">
                <span className="stat-label">GMV</span>
                <span className="stat-value">{formatBRL(gmv)}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Comissão esti...</span>
                <span className="stat-value">{formatBRL(comm)}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Visualizações d...</span>
                <span className="stat-value">{formatNumberPT(views)}</span>
              </div>
            </div>
          </Link>
        </section>

        {/* Kit de ferramentas */}
        <section className="card">
          <div className="section-header">
            <h2>Kit de ferramentas TikTok Shop</h2>
            <ChevronRight className="icon-chevron" size={20} />
          </div>

          <div className="tools-scroll">
            <ToolItem label={<>Mercado de<br />produtos</>} />
            <ToolItem label="Receita" />
            <ToolItem label={<>Gerenciar<br />vitrine</>} />
            <ToolItem label={<>Gerenciar<br />amostras</>} />
            <ToolItem label={<>Convites d<br />colaboraçã...</>} />
          </div>
        </section>

        {/* Aumente seu público */}
        <section className="card">
          <div className="section-header">
            <h2>Aumente seu público e sua<br />receita</h2>
            <ChevronRight className="icon-chevron" size={20} />
          </div>

          <div className="task-cards-container">
            <div className="task-card">
              <div className="task-card-content">
                <span className="task-status">Pendente</span>
                <p className="task-text">Quer crescer mais? Publique vídeos curtos diariar...</p>
                <div className="task-reward">
                  <Ticket className="reward-icon" size={16} />
                  <span>R$ 90,00</span>
                </div>
              </div>
              <div className="task-progress">
                <div className="progress-circle">0/3</div>
                <ChevronRight className="progress-chevron" size={20} />
              </div>
            </div>
            <div className="task-card partial">
              <div className="task-card-content"></div>
            </div>
          </div>
        </section>

        {/* O que há de importante */}
        <section className="card" style={{ paddingTop: 24 }}>
          <h2 style={{ fontSize: 19, fontWeight: 700, marginBottom: 20 }}>O que há de importante neste mês</h2>
          <div className="promo-banner">
            <div className="promo-content">
              <div className="promo-logo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M19.589 6.686a4.793 4.793 0 0 1-3.97-1.53c-.007-.008-.014-.015-.02-.022A4.896 4.896 0 0 1 14.524.2l.002-.2h-3v14a2 2 0 1 1-2-2V9a5 5 0 1 0 5 5V6.621a7.892 7.892 0 0 0 5.063 1.83v-1.765z"/>
                </svg>
                <strong>TikTok</strong> Shop
              </div>
              <div className="promo-title">4.4</div>
              <div className="promo-subtitle">PROMO DO MÊS</div>
              <button className="promo-btn">Iniciar a seleção</button>
            </div>
            <div className="promo-decors">
              <div className="decor-circle"></div>
              <div className="decor-square"></div>
            </div>
          </div>
        </section>

        {/* Integridade */}
        <section className="card" style={{ paddingTop: 24 }}>
          <h2 style={{ fontSize: 19, fontWeight: 700, marginBottom: 12 }}>Integridade da conta</h2>
          <div className="health-info">
            <div className="health-index">
              Índice de qualidade do criador: <span className="status-green">Íntegra</span>
              <ChevronRight size={16} style={{ marginLeft: 2, color: '#555' }} />
            </div>
            <div className="health-desc">Sua conta está em situação regular</div>
          </div>
        </section>

        <div className="help-section">
          Você tem dúvidas? <strong>Obtenha ajuda aqui</strong>
        </div>
      </div>

      {/* FAB */}
      <div className="fab-container">
        <button className="fab-btn">
          <Video className="fab-icon" size={20} />
          <span>Criar agora</span>
        </button>
      </div>

      {/* Bottom Nav */}
      <BottomNav active="home" />
    </div>
  );
}

function ToolItem({ label }) {
  return (
    <div className="tool-item">
      <div className="tool-icon-box">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="8" width="14" height="13" rx="2" ry="2"/>
          <path d="M8 8V6a4 4 0 0 1 8 0v2"/>
        </svg>
      </div>
      <span className="tool-label">{label}</span>
    </div>
  );
}

export function BottomNav({ active }) {
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
        <Link key={item.id} href={item.href} className={'nav-item ' + (active === item.id ? 'active' : '')}>
          <div className="nav-icon-container">
            <svg viewBox="0 0 24 24" fill={item.id === 'home' && active === 'home' ? 'currentColor' : 'none'}
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
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
