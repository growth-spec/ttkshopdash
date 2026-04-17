'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { calculateTrend, formatByType } from '@/lib/format';
import { METRICS, PERIODS, makeDefaultData } from '@/lib/constants';

export default function AdminPage() {
  const router = useRouter();
  const [data, setData] = useState(makeDefaultData());
  const [activePeriod, setActivePeriod] = useState('today');
  const [saveState, setSaveState] = useState({ status: 'idle', message: '' });
  const [storageMode, setStorageMode] = useState(null);
  const indexFrameRef = useRef(null);
  const dataFrameRef = useRef(null);
  const fileInputRef = useRef(null);

  // ==========================================================
  // Carregar dados iniciais
  // ==========================================================
  useEffect(() => {
    fetch('/api/data?t=' + Date.now())
      .then(res => res.json())
      .then(loaded => {
        setStorageMode(loaded._storage || null);
        const valid = loaded && (loaded.today || loaded.yesterday || loaded.last_7_days);
        if (valid) {
          // Garante estrutura completa caso falte alguma métrica
          const full = makeDefaultData();
          PERIODS.forEach(p => {
            METRICS.forEach(m => {
              if (loaded[p.key]?.[m.key]) full[p.key][m.key] = loaded[p.key][m.key];
            });
          });
          setData(full);
        }
      })
      .catch(err => console.log('Sem dados, usando padrão:', err));
  }, []);

  // ==========================================================
  // Atualiza um valor (current ou previous) de uma métrica
  // ==========================================================
  const updateValue = (period, metric, field, value) => {
    setData(prev => ({
      ...prev,
      [period]: {
        ...prev[period],
        [metric]: {
          ...prev[period][metric],
          [field]: parseFloat(value) || 0
        }
      }
    }));
  };

  // ==========================================================
  // Manda preview em tempo real para os iframes
  // ==========================================================
  const sendPreview = useCallback((payload) => {
    indexFrameRef.current?.contentWindow?.postMessage({ type: 'update_data', payload }, '*');
    dataFrameRef.current?.contentWindow?.postMessage({ type: 'update_data', payload }, '*');
  }, []);

  useEffect(() => {
    sendPreview(data);
  }, [data, sendPreview]);

  // ==========================================================
  // Upload de imagem (preview apenas; salvamento de imagem
  // requer Vercel Blob — fica para implementação futura)
  // ==========================================================
  const onImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      dataFrameRef.current?.contentWindow?.postMessage(
        { type: 'update_img', src: ev.target.result },
        '*'
      );
    };
    reader.readAsDataURL(file);
  };

  // ==========================================================
  // Submit — salva no servidor (dados + imagem)
  // ==========================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveState({ status: 'saving', message: '' });

    try {
      // 1) Salvar os dados (números) no Redis
      const dataRes = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const dataResult = await dataRes.json();

      if (!dataResult.success) {
        throw new Error(dataResult.error || 'Erro ao salvar dados');
      }

      // 2) Se há imagem selecionada, fazer upload para o Blob
      const imgFile = fileInputRef.current?.files?.[0];
      if (imgFile) {
        const formData = new FormData();
        formData.append('image', imgFile);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        const uploadResult = await uploadRes.json();

        if (!uploadResult.success) {
          throw new Error(uploadResult.error || 'Erro ao fazer upload da imagem');
        }
      }

      setSaveState({
        status: 'success',
        message: `Salvo com sucesso! (modo: ${dataResult.mode})`
      });
      // Recarrega iframes para refletir o salvamento
      if (indexFrameRef.current) indexFrameRef.current.src = '/?t=' + Date.now();
      if (dataFrameRef.current) dataFrameRef.current.src = '/data?t=' + Date.now();
      setTimeout(() => setSaveState({ status: 'idle', message: '' }), 3000);
    } catch (err) {
      setSaveState({ status: 'error', message: err.message });
    }
  };

  return (
    <div className="admin-root">
      <style>{adminStyles}</style>

      {/* SIDEBAR */}
      <div className="admin-sidebar">
        <div className="admin-header">
          <h1>Painel Admin</h1>
          {storageMode && (
            <span className={'storage-badge ' + storageMode}>
              {storageMode === 'redis' ? 'Upstash Redis' : 'arquivo local'}
            </span>
          )}
          <button className="exit-btn" onClick={() => router.push('/')}>Sair</button>
        </div>

        <div className="form-content">
          {saveState.status === 'success' && (
            <div className="msg success">{saveState.message}</div>
          )}
          {saveState.status === 'error' && (
            <div className="msg error">Erro ao salvar: {saveState.message}</div>
          )}

          <div className="info-msg">
            💡 <strong>Como funciona:</strong> insira números puros (ex: <code>5100</code>). O sistema formata e calcula a porcentagem comparando <strong>Atual</strong> com <strong>Anterior</strong>.
          </div>

          <form onSubmit={handleSubmit}>

            {/* Abas de período */}
            <div className="period-tabs">
              {PERIODS.map(p => (
                <button
                  key={p.key}
                  type="button"
                  className={'period-tab-btn ' + (activePeriod === p.key ? 'active' : '')}
                  onClick={() => setActivePeriod(p.key)}
                >{p.name}</button>
              ))}
            </div>

            {/* Painel da aba ativa */}
            <div className="period-panel">
              {METRICS.map(metric => {
                const m = data[activePeriod]?.[metric.key] || { current: 0, previous: 0 };
                const trend = calculateTrend(m.current, m.previous);
                return (
                  <div key={metric.key} className="metric-card">
                    <div className="metric-card-header">
                      <span className="metric-name">{metric.name}</span>
                      <span className={'metric-trend-preview ' + (trend.isPositive ? '' : 'negative')}>
                        {trend.text}
                      </span>
                    </div>
                    <div className="metric-inputs">
                      <div className="metric-input-group">
                        <label>Atual</label>
                        <input
                          type="number"
                          step="any"
                          value={m.current}
                          onChange={(e) => updateValue(activePeriod, metric.key, 'current', e.target.value)}
                          placeholder="0"
                        />
                        <div className="formatted-preview">→ {formatByType(m.current, metric.format)}</div>
                      </div>
                      <div className="metric-input-group">
                        <label>Anterior (comparação)</label>
                        <input
                          type="number"
                          step="any"
                          value={m.previous}
                          onChange={(e) => updateValue(activePeriod, metric.key, 'previous', e.target.value)}
                          placeholder="0"
                        />
                        <div className="formatted-preview">→ {formatByType(m.previous, metric.format)}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Imagem */}
            <hr className="section-separator" />
            <h3 className="section-title">📷 Imagem do Diagnóstico (apenas preview)</h3>
            <input ref={fileInputRef} type="file" accept="image/*" className="file-input" onChange={onImageChange} />

            <button
              type="submit"
              className="save-btn"
              disabled={saveState.status === 'saving'}
            >
              {saveState.status === 'saving' ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </form>
        </div>
      </div>

      {/* PREVIEW */}
      <div className="preview-area">
        <div style={{ position: 'relative' }}>
          <div className="mockup-label">Tela Inicial</div>
          <div className="device-mockup">
            <iframe ref={indexFrameRef} src="/" title="Preview Inicial" />
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <div className="mockup-label">Tela de Dados</div>
          <div className="device-mockup">
            <iframe ref={dataFrameRef} src="/data" title="Preview Dados" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================================
// ESTILOS DO ADMIN (escopados via tag <style>)
// ==========================================================
const adminStyles = `
  .admin-root {
    margin: 0;
    padding: 0;
    background-color: #f1f1f1;
    height: 100vh;
    display: flex;
    overflow: hidden;
  }
  .admin-sidebar {
    width: 480px;
    background: #fff;
    height: 100vh;
    overflow-y: auto;
    border-right: 1px solid #eaebed;
    display: flex;
    flex-direction: column;
  }
  .admin-header {
    padding: 20px;
    border-bottom: 1px solid #eaebed;
    display: flex;
    align-items: center;
    gap: 12px;
    background: #fff;
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .admin-header h1 {
    font-size: 20px;
    font-weight: 800;
    margin: 0;
    flex: 1;
  }
  .exit-btn {
    background: #fff;
    color: #161823;
    border: 1px solid #eaebed;
    border-radius: 6px;
    padding: 6px 14px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
  }
  .storage-badge {
    font-size: 10px;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .storage-badge.redis { background: #e0e7ff; color: #3730a3; }
  .storage-badge.file { background: #fef3c7; color: #92400e; }

  .form-content { padding: 20px; flex: 1; }

  .period-tabs {
    display: flex;
    gap: 6px;
    background: #f3f3f5;
    padding: 4px;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  .period-tab-btn {
    flex: 1;
    border: none;
    background: transparent;
    padding: 10px;
    font-size: 13px;
    font-weight: 600;
    color: #757575;
    border-radius: 7px;
    cursor: pointer;
    font-family: inherit;
  }
  .period-tab-btn.active {
    background: #fff;
    color: #161823;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  }

  .metric-card {
    border: 1px solid #eaebed;
    border-radius: 10px;
    padding: 14px;
    margin-bottom: 12px;
  }
  .metric-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }
  .metric-name { font-size: 14px; font-weight: 700; color: #161823; }
  .metric-trend-preview {
    font-size: 13px;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 6px;
    background: #f0f9f6;
    color: #20b89e;
  }
  .metric-trend-preview.negative {
    background: #fdecec;
    color: #ef4444;
  }
  .metric-inputs { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .metric-input-group label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    color: #757575;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  .metric-input-group input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #eaebed;
    border-radius: 8px;
    font-size: 14px;
    font-family: inherit;
    box-sizing: border-box;
  }
  .metric-input-group input:focus { outline: none; border-color: #6d38e1; }

  .formatted-preview {
    font-size: 11px;
    color: #a0a0a0;
    margin-top: 4px;
    font-style: italic;
  }

  .save-btn {
    width: 100%;
    background-color: #161823;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 16px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    margin-top: 16px;
  }
  .save-btn:hover { background-color: #2d2f3d; }
  .save-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .msg {
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 16px;
    font-weight: 600;
    font-size: 13px;
  }
  .msg.success { background: #e8f5e9; color: #2e7d32; }
  .msg.error { background: #f8d7da; color: #721c24; }

  .info-msg {
    background-color: #e8f3ff;
    color: #0c5dc7;
    padding: 10px 12px;
    border-radius: 8px;
    margin-bottom: 16px;
    font-size: 12px;
    border: 1px solid #c5dffd;
  }
  .info-msg code { background: rgba(0,0,0,0.05); padding: 1px 4px; border-radius: 3px; }

  .section-separator {
    border: 0;
    border-top: 1px solid #eaebed;
    margin: 24px 0 16px;
  }
  .section-title {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .file-input {
    width: 100%;
    padding: 8px;
    border: 1px solid #eaebed;
    border-radius: 8px;
    font-size: 13px;
  }

  .preview-area {
    flex: 1;
    padding: 40px;
    display: flex;
    gap: 40px;
    overflow-x: auto;
    align-items: flex-start;
    justify-content: center;
    background-color: #e5e5e5;
  }
  .device-mockup {
    width: 375px;
    height: 812px;
    background: #fff;
    border-radius: 40px;
    border: 14px solid #111;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    flex-shrink: 0;
    position: relative;
  }
  .device-mockup iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
  .mockup-label {
    position: absolute;
    top: -30px;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    color: #555;
  }
`;
