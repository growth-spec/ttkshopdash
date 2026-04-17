/**
 * Configuração das métricas e períodos.
 * Define quais métricas existem, como cada uma é formatada,
 * e quais períodos o app suporta.
 */

export const METRICS = [
  { key: 'gmv',             name: 'GMV',                    format: 'usd' },
  { key: 'items_sold',      name: 'Itens vendidos',         format: 'number' },
  { key: 'est_commission',  name: 'Comissão estimada',      format: 'usd' },
  { key: 'commission_base', name: 'Base de comissão',       format: 'usd' },
  { key: 'product_views',   name: 'Visualizações do prod.', format: 'number' },
  { key: 'product_clicks',  name: 'Cliques no produto',     format: 'number' }
];

export const PERIODS = [
  { key: 'today',       name: 'Hoje' },
  { key: 'yesterday',   name: 'Ontem' },
  { key: 'last_7_days', name: 'Últimos 7 dias' }
];

export function makeDefaultData() {
  const empty = Object.fromEntries(
    METRICS.map(m => [m.key, { current: 0, previous: 0 }])
  );
  return Object.fromEntries(PERIODS.map(p => [p.key, { ...empty }]));
}
