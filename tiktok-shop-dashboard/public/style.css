:root {
  --bg-color: #f7f7f9;
  --card-bg: #ffffff;
  --text-primary: #161823;
  --text-secondary: #757575;
  --text-tertiary: #a0a0a0;
  --border-color: #eaebed;
  --button-hover: #f1f1f2;
  --tab-bg: #f8f8f8;
  --icon-bg: #f2f2f2;
  --accent-color: #fe2c55;
  --reward-bg: #fff0f3;
  --reward-text: #e6234b;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
  /* Espaço para o FAB e Bottom Nav + área segura inferior do iPhone */
  padding-bottom: calc(120px + env(safe-area-inset-bottom));
  /* Área segura superior do iPhone (notch / dynamic island) */
  padding-top: env(safe-area-inset-top);
  line-height: 1.4;
}

.app-container {
  max-width: 600px;
  margin: 0 auto;
  background-color: var(--bg-color);
  min-height: 100vh;
  position: relative;
}

/* Header */
.main-header {
  background-color: var(--card-bg);
  padding: 24px 20px 16px 20px;
}

.main-header h1 {
  font-size: 26px;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

/* Common Section */
.card {
  background-color: var(--card-bg);
  margin-top: 8px;
  padding: 20px 20px;
  padding-bottom: 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h2 {
  font-size: 19px;
  font-weight: 700;
  line-height: 1.3;
}

/* Promo Banner */
.promo-banner {
  background: linear-gradient(135deg, #fff4cc, #fed78c);
  border-radius: 12px;
  padding: 24px 20px;
  position: relative;
  overflow: hidden;
  height: 180px;
}
.promo-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.promo-logo {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  margin-bottom: 8px;
  color: #161823;
}
.promo-logo svg {
  width: 14px;
  height: 14px;
}
.promo-logo strong {
  font-weight: 800;
}
.promo-title {
  font-size: 58px;
  font-weight: 900;
  color: #6431e5;
  line-height: 0.9;
  letter-spacing: -2px;
  margin-left: -2px;
  margin-bottom: 2px;
}
.promo-subtitle {
  font-size: 15px;
  font-weight: 900;
  color: #6431e5;
  margin-bottom: 12px;
}
.promo-btn {
  background-color: #6431e5;
  color: #fff;
  border: none;
  border-radius: 100px;
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(100, 49, 229, 0.2);
}
.promo-decors {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}
.decor-circle {
  position: absolute;
  top: 10%;
  right: -5%;
  width: 140px;
  height: 140px;
  background-color: #ff9e00;
  border-radius: 50%;
  filter: blur(25px);
  opacity: 0.4;
}
.decor-square {
  position: absolute;
  bottom: -20%;
  right: 15%;
  width: 120px;
  height: 120px;
  background-color: #ff5e00;
  transform: rotate(30deg);
  filter: blur(20px);
  opacity: 0.4;
}

/* Account Health */
.health-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-bottom: 4px;
}
.health-index {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary);
  display: flex;
  align-items: center;
}
.status-green {
  color: #20b89e;
  font-weight: 600;
  margin-left: 4px;
}
.health-desc {
  font-size: 13.5px;
  color: var(--text-secondary);
}

/* Help Section */
.help-section {
  height: 240px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  font-size: 14px;
  color: var(--text-primary);
  padding: 40px 20px;
}
.help-section strong {
  margin-left: 4px;
  font-weight: 700;
}

.icon-chevron {
  width: 20px;
  height: 20px;
  color: var(--text-primary);
}

/* Desempenho - Tabs */
.tabs-container {
  margin-bottom: 24px;
}

.tabs {
  display: inline-flex;
  background-color: var(--tab-bg);
  border-radius: 8px;
  padding: 4px;
}

.tab {
  border: none;
  background: transparent;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
}

.tab.active {
  background-color: #fff;
  color: var(--text-primary);
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

/* Desempenho - Stats */
.stats-grid {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 0;
}

.stat-label {
  font-size: 13.5px;
  color: var(--text-secondary);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stat-value {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Ferramentas - Scroll */
.tools-scroll {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 8px;
  scrollbar-width: none; /* Firefox */
}

.tools-scroll::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

.tool-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 76px;
  flex-shrink: 0;
  gap: 8px;
}

.tool-icon-box {
  width: 64px;
  height: 64px;
  background-color: var(--icon-bg);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tool-icon-box svg {
  width: 26px;
  height: 26px;
  stroke: var(--text-primary);
  stroke-width: 1.5px;
}

.tool-label {
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  color: var(--text-primary);
  line-height: 1.2;
}

/* Aumente seu publico */
.task-cards-container {
  display: flex;
  gap: 12px;
  overflow-x: auto;
}

.task-card {
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 16px;
  min-width: 290px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex-shrink: 0;
}

.task-card.partial {
  min-width: 40px;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.task-card-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.task-status {
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 500;
  margin-bottom: 6px;
}

.task-text {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 24px;
  line-height: 1.3;
  padding-right: 12px;
}

.task-reward {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background-color: var(--reward-bg);
  padding: 4px 8px;
  border-radius: 4px;
  color: var(--reward-text);
  font-size: 13px;
  font-weight: 700;
  width: fit-content;
}

.reward-icon {
  width: 16px;
  height: 16px;
  stroke-width: 2.5px;
}

.task-progress {
  display: flex;
  align-items: center;
  gap: 6px;
}

.progress-circle {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
}

.progress-chevron {
  width: 20px;
  height: 20px;
  color: var(--text-primary);
}

/* FAB */
.fab-container {
  position: fixed;
  bottom: calc(80px + env(safe-area-inset-bottom)); /* shifted up for bottom nav + safe area */
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  pointer-events: none; /* Let clicks pass through container */
  z-index: 100;
}

.fab-btn {
  pointer-events: auto;
  background-color: #000000;
  color: #ffffff;
  border: none;
  border-radius: 100px;
  padding: 12px 24px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  cursor: pointer;
  font-family: inherit;
}

.fab-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

/* --- DATA PAGE STYLES --- */
.app-data {
  background-color: #ffffff;
}

.app-data .card {
  box-shadow: none;
  border-top: 8px solid var(--bg-color);
  margin-top: 0;
  border-radius: 0;
}

/* Header */
.data-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background-color: var(--card-bg);
}

.back-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-btn svg {
  width: 28px;
  height: 28px;
  stroke-width: 2.5px;
  color: var(--text-primary);
}

.data-title {
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  flex: 1;
}

.header-right-placeholder {
  width: 28px;
}

/* Filters */
.filters-section {
  padding: 0 20px 20px 20px;
  background-color: var(--card-bg);
}

.date-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  overflow-x: auto;
  scrollbar-width: none;
}
.date-tabs::-webkit-scrollbar { display: none; }

.date-tab {
  background-color: var(--icon-bg);
  color: var(--text-primary);
  border: none;
  padding: 8px 14px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: inherit;
}

.date-tab.active {
  background-color: #000;
  color: #fff;
}

.date-tab .icon-sm {
  width: 14px;
  height: 14px;
}

.date-range {
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 400;
}

/* Key Data Section */
.key-data-section {
  padding-bottom: 24px;
}

.section-title-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
}

.section-title-wrapper h2 {
  font-size: 20px;
  font-weight: 700;
}

.icon-info {
  width: 16px;
  height: 16px;
  color: var(--text-tertiary);
}

.key-data-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 12px;
  margin-bottom: 32px;
}

.key-stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 0;
}

.key-stat-label {
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 500;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.key-stat-value {
  font-size: 20px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 4px;
  letter-spacing: -0.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.key-stat-change {
  font-size: 13px;
  color: #20b89e; /* Teal green indicator */
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.see-trends {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.see-trends .icon-sm {
  width: 16px;
  height: 16px;
}

/* Diagnosis Section */
.diagnosis-section {
  padding-bottom: 32px;
}

.diagnosis-subtitle {
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 500;
  display: block;
  margin-bottom: 8px;
}

.diagnosis-title {
  font-size: 24px;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 20px;
}

.diagnosis-card {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.diagnosis-img {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
}

.simulated-image {
  background-color: #0076cf;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.diagnosis-text {
  font-size: 15px;
  color: var(--text-primary);
  font-weight: 400;
  flex: 1;
  line-height: 1.4;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 6px;
}

.dot {
  width: 16px;
  height: 2px;
  background-color: var(--border-color);
  border-radius: 2px;
}

.dot.active {
  background-color: var(--text-primary);
}

/* Bottom Tools */
.bottom-tools {
  padding-top: 24px;
  padding-bottom: 32px;
}

.tool-icon-box.squared {
  border-radius: 12px;
  background-color: #f7f7f9;
}

/* --- BOTTOM NAVIGATION --- */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 0 calc(16px + env(safe-area-inset-bottom)) 0;
  border-top: 1px solid var(--border-color);
  z-index: 900;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.02);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 11px;
  font-weight: 500; /* Matching the delicate weight from the screenshot */
  position: relative;
  width: 20%; /* Equal width */
}

.nav-item.active {
  color: #e6234b; /* Active pinkish-red */
}

.nav-icon-container {
  position: relative;
  display: inline-flex;
}

.nav-icon {
  width: 24px;
  height: 24px;
  stroke-width: 1.5px;
}

.nav-item.active .nav-icon {
  stroke: transparent;
  fill: currentColor;
}

.notification-dot {
  position: absolute;
  top: -2px;
  right: -3px;
  width: 9px;
  height: 9px;
  background-color: #e6234b;
  border-radius: 50%;
  border: 1.5px solid #ffffff;
}
