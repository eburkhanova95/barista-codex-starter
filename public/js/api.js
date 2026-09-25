// =========================================================
// API CLIENT (MOCKED FOR FRONTEND TESTING)
// =========================================================

const API_BASE = 'http://localhost:3000/api';

// MOCK DATA: Чтобы верстка работала без бэкенда

export const apiClient = {
    // 1. GET LIST
    async getAllBeans() {

        const res = await fetch(`${API_BASE}/beans`);

        if (!res.ok) throw new Error('Failed to load beans');

        return res.json();

    },

    // 2. GET DETAILS
    async getBeanById(id) {

        const res = await fetch(`${API_BASE}/beans/${id}`);

        if (!res.ok) throw new Error(`Bean not found: ${id}`);

        return res.json();

    },

// 3. CREATE
    async createBean(beanData) {
        const res = await fetch(`${API_BASE}/beans`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(beanData)
        });
        if (!res.ok) throw new Error('Failed to create bean');
        return res.json();
        
    }, 
    
    // 4. UPDATE
    async updateBean(id, beanData) {
        const res = await fetch(`${API_BASE}/beans/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(beanData)
        });
        if (!res.ok) throw new Error(`Failed to update bean: ${id}`);
        return res.json();
    },
//
//     // 5. DELETE
    async deleteBean(id) {
        const res = await fetch(`${API_BASE}/beans/${id}`, 
            { method: 'DELETE' });

        if (!res.ok) throw new Error(`Failed to delete bean: ${id}`);
    },
//
    // 6. LOCALIZATION
    async getTranslations(lang) {
        const res = await fetch(`${API_BASE}/i18n/${lang}`);
        if (!res.ok) return {};
        return res.json();
    },
 };