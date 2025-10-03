<template>
  <a :href="link" class="settings-card">
    <div class="card-header">
      <h3>{{ title }}</h3>
      <span v-if="badge" class="card-badge">{{ badge }}</span>
    </div>
    <p>{{ description }}</p>
    <span class="card-arrow">→</span>
  </a>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  link: String,
  badge: String
})
</script>

<style scoped>
.settings-card {
  display: block;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none;
  position: relative;
  transition: all 0.25s ease;
  overflow: hidden;
}

.settings-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--vp-c-brand-1);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}

.settings-card:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-alt);
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.dark .settings-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.settings-card:hover::before {
  transform: scaleX(1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.settings-card h3 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 1.125rem;
  font-weight: 600;
  transition: color 0.2s ease;
  flex: 1;
}

.settings-card:hover h3 {
  color: var(--vp-c-brand-1);
}

.card-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 4px;
  white-space: nowrap;
}

.settings-card p {
  margin: 0;
  padding-right: 2rem;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  line-height: 1.6;
}

.card-arrow {
  position: absolute;
  right: 1.5rem;
  bottom: 1.5rem;
  color: var(--vp-c-brand-1);
  font-size: 1.25rem;
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.25s ease;
}

.settings-card:hover .card-arrow {
  opacity: 1;
  transform: translateX(0);
}

.settings-card:active {
  transform: translateY(-2px);
}
</style>