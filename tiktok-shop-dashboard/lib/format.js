/**
 * Funções de formatação numérica e cálculo de tendência.
 * Compartilhadas entre todas as páginas.
 */

// ===== FORMATO PORTUGUÊS (mil, mi, bi) =====
export function formatNumberPT(num) {
  num = Number(num) || 0;
  const abs = Math.abs(num);
  if (abs >= 1_000_000_000) return formatPT(num / 1_000_000_000) + ' bi';
  if (abs >= 1_000_000)     return formatPT(num / 1_000_000) + ' mi';
  if (abs >= 1_000)         return formatPT(num / 1_000) + ' mil';
  return formatPT(num);
}

function formatPT(num) {
  if (Number.isInteger(num)) return num.toString();
  return num.toFixed(1).replace('.', ',');
}

// ===== FORMATO INGLÊS (K, M, B) =====
export function formatNumberEN(num) {
  num = Number(num) || 0;
  const abs = Math.abs(num);
  if (abs >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  if (abs >= 1_000_000)     return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (abs >= 1_000)         return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return num.toString();
}

// ===== HELPERS DE MOEDA =====
export function formatBRL(num) {
  return 'R$ ' + formatNumberPT(num);
}

export function formatUSD(num) {
  return '$' + formatNumberEN(num);
}

// ===== CÁLCULO DE TENDÊNCIA =====
export function calculateTrend(current, previous) {
  current = Number(current) || 0;
  previous = Number(previous) || 0;

  if (previous === 0) {
    if (current === 0) return { text: '0%', isPositive: true, value: 0 };
    return { text: '+100%', isPositive: true, value: 100 };
  }

  const variation = ((current - previous) / Math.abs(previous)) * 100;
  const isPositive = variation >= 0;

  let formatted;
  const absVar = Math.abs(variation);
  if (absVar >= 100) {
    formatted = Math.round(variation) + '%';
  } else if (absVar >= 10) {
    formatted = variation.toFixed(1).replace('.0', '') + '%';
  } else {
    formatted = variation.toFixed(2).replace(/\.?0+$/, '') + '%';
  }

  if (isPositive && variation > 0) formatted = '+' + formatted;

  return { text: formatted, isPositive, value: variation };
}

// ===== FORMATAÇÃO POR TIPO DE MÉTRICA =====
export function formatByType(num, format) {
  if (format === 'usd') return formatUSD(num);
  if (format === 'brl') return formatBRL(num);
  if (format === 'pt')  return formatNumberPT(num);
  return formatNumberEN(num);
}
