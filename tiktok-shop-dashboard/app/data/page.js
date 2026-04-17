'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronDown, Info, LineChart, ChevronRight } from 'lucide-react';
import { calculateTrend, formatByType } from '@/lib/format';
import { METRICS } from '@/lib/constants';
import BottomNav from '@/app/components/BottomNav';

export default function DataPage() {
  const router = useRouter();
  const [allData, setAllData] = useState(null);
  const [period, setPeriod] = useState('last_7_days');
  const [diagnosisImg, setDiagnosisImg] = useState(null);

  // Fetch inicial
  useEffect(() => {
    fetch('/api/data?t=' + Date.now())
      .then(res => res.json())
      .then(data => {
        setAllData(data);
        if (data.image_url) setDiagnosisImg(data.image_url);
      })
      .catch(err => console.error(err));
  }, []);

  // Recebe atualizações em tempo real
  useEffect(() => {
    function onMessage(event) {
      if (event.data?.type === 'update_data') {
        setAllData(event.data.payload);
      }
      if (event.data?.type === 'update_img') {
        setDiagnosisImg(event.data.src);
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  // Label da data conforme período
  const dateLabel = useMemo(() => {
    const months = ['jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'];
    const offset = -new Date().getTimezoneOffset() / 60;
    const gmtStr = (offset >= 0 ? '+' : '') + offset;
    const fmt = (d) => `${d.getDate()} de ${months[d.getMonth()]} ${d.getFullYear()}`;
    const today = new Date();

    if (period === 'today') return `${fmt(today)} (GMT${gmtStr})`;
    if (period === 'yesterday') {
      const y = new Date(today); y.setDate(today.getDate() - 1);
      return `${fmt(y)} (GMT${gmtStr})`;
    }
    if (period === 'last_7_days') {
      const start = new Date(today); start.setDate(today.getDate() - 6);
      return `${fmt(start)} - ${fmt(today)} (GMT${gmtStr})`;
    }
    const start = new Date(today); start.setDate(today.getDate() - 30);
    return `${fmt(start)} - ${fmt(today)} (GMT${gmtStr})`;
  }, [period]);

  const periodData = allData?.[period] || {};

  return (
    <div className="app-container app-data">

      <div className="data-header">
        <button className="back-btn" onClick={() => router.push('/')}>
          <ChevronLeft size={28} strokeWidth={2.5} />
        </button>
        <h1 className="data-title">Dados</h1>
        <div className="header-right-placeholder"></div>
      </div>

      <div className="filters-section">
        <div className="date-tabs">
          <PeriodTab id="today"        label="Hoje"   period={period} setPeriod={setPeriod} />
          <PeriodTab id="yesterday"    label="Ontem"  period={period} setPeriod={setPeriod} />
          <PeriodTab id="last_7_days"  label="7 dias" period={period} setPeriod={setPeriod} />
          <PeriodTab id="custom"       label={<>Personalizado <ChevronDown className="icon-sm" size={14} /></>} period={period} setPeriod={setPeriod} />
        </div>
        <div className="date-range">{dateLabel}</div>
      </div>

      <div className="main-content">

        <section className="card key-data-section">
          <div className="section-title-wrapper">
            <h2>Dados principais</h2>
            <Info className="icon-info" size={16} />
          </div>

          <div className="key-data-grid">
            {METRICS.map(metric => {
              const m = periodData[metric.key] || { current: 0, previous: 0 };
              const trend = calculateTrend(m.current, m.previous);
              return (
                <div key={metric.key} className="key-stat-item">
                  <span className="key-stat-label">{metric.name.length > 18 ? metric.name.slice(0,15) + '...' : metric.name}</span>
                  <span className="key-stat-value">{formatByType(m.current, metric.format)}</span>
                  <span
                    className="key-stat-change"
                    style={{ color: trend.isPositive ? '#20b89e' : '#ef4444' }}
                  >{trend.text}</span>
                </div>
              );
            })}
          </div>

          <div className="see-trends">
            <LineChart className="icon-sm" size={16} />
            <span>Ver tendências</span>
          </div>
        </section>

        <section className="card diagnosis-section">
          <span className="diagnosis-subtitle">Diagnóstico do produto</span>
          <h2 className="diagnosis-title">Adicione mais produtos à sua<br />vitrine!</h2>

          <div className="diagnosis-card">
            <div className="diagnosis-img">
              {diagnosisImg ? (
                <img src={diagnosisImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} />
              ) : (
                <div className="simulated-image">
                  <span style={{ fontSize: 10, color: '#fff' }}>goli</span>
                </div>
              )}
            </div>
            <div className="diagnosis-text">
              Criadores como você estão adicionando em média 186 produtos às suas vitrines.
            </div>
            <ChevronRight className="icon-chevron" size={20} />
          </div>

          <div className="carousel-dots">
            <div className="dot active"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </section>

      </div>

      <BottomNav active="home" />
    </div>
  );
}

function PeriodTab({ id, label, period, setPeriod }) {
  return (
    <button
      className={'date-tab ' + (period === id ? 'active' : '')}
      onClick={() => setPeriod(id)}
    >{label}</button>
  );
}
