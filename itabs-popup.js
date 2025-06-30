
// iTabs Popup System for Alliance AMS
// Professional popup system with Alliance AMS branding and mobile optimization
// Upload this file to WordPress Media Library

window.iTabs = window.iTabs || {};

// Popup configuration with Alliance AMS styling
window.iTabs.popupConfig = {
    // Alliance AMS brand colors
    colors: {
        primary: '#0066CC',        // Alliance AMS corporate blue
        secondary: '#003366',      // Darker blue for accents
        orange: '#FF6600',         // Safety/warning orange
        gray: '#555555',           // Professional gray
        lightGray: '#F5F5F5',      // Background gray
        white: '#FFFFFF',          // Clean white
        border: '#E0E0E0',         // Light border
        text: '#333333',           // Main text
        lightText: '#666666',      // Secondary text
        success: '#28a745',        // Success green
        warning: '#ffc107'         // Warning yellow
    },

    // Popup dimensions and positioning
    dimensions: {
        maxWidth: '700px',
        maxHeight: '90vh',
        borderRadius: '12px',
        tabHeight: '50px'
    },

    // Animation settings
    animation: {
        duration: '0.3s',
        easing: 'ease-out'
    }
};

// Function to create the popup overlay
window.iTabs.createOverlay = function() {
    // Remove any existing overlay
    const existingOverlay = document.getElementById('itabs-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }

    const overlay = document.createElement('div');
    overlay.id = 'itabs-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        z-index: 10000;
        display: none;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity ${window.iTabs.popupConfig.animation.duration} ${window.iTabs.popupConfig.animation.easing};
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
    `;

    // Close popup when clicking overlay background
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            window.iTabs.closePopup();
        }
    });

    document.body.appendChild(overlay);
    return overlay;
};

// Function to create the popup container
window.iTabs.createPopup = function() {
    const config = window.iTabs.popupConfig;
    const popup = document.createElement('div');
    popup.id = 'itabs-popup';
    popup.style.cssText = `
        background: ${config.colors.white};
        width: 90vw;
        max-width: ${config.dimensions.maxWidth};
        max-height: ${config.dimensions.maxHeight};
        border-radius: ${config.dimensions.borderRadius};
        overflow: hidden;
        box-shadow: 0 25px 70px rgba(0, 0, 0, 0.3);
        transform: scale(0.9) translateY(-30px);
        transition: transform ${config.animation.duration} ${config.animation.easing};
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
        border: 3px solid ${config.colors.primary};
        position: relative;
    `;

    return popup;
};

// Function to create the popup header
window.iTabs.createPopupHeader = function(productData) {
    const config = window.iTabs.popupConfig;
    const header = document.createElement('div');
    header.style.cssText = `
        background: linear-gradient(135deg, ${config.colors.primary} 0%, ${config.colors.secondary} 100%);
        color: ${config.colors.white};
        padding: 25px 30px;
        position: relative;
        border-bottom: 1px solid ${config.colors.border};
    `;

    header.innerHTML = `
        <div style="margin-right: 60px;">
            <h3 style="margin: 0 0 10px 0; font-size: 1.5rem; font-weight: 600; line-height: 1.2;">
                ${productData.productName}
            </h3>
            <div style="font-size: 1rem; opacity: 0.9; font-family: 'Courier New', monospace; margin-bottom: 6px;">
                Product Code: ${productData.productCode}
            </div>
            <div style="font-size: 0.9rem; opacity: 0.8;">
                ${productData.shortDescription || 'Professional automotive part'}
            </div>
        </div>
        <button id="itabs-close-btn" style="
            position: absolute;
            right: 25px;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: ${config.colors.white};
            font-size: 32px;
            cursor: pointer;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            font-weight: bold;
            line-height: 1;
        " title="Close Product Information" aria-label="Close">&times;</button>
    `;

    // Add close button functionality with enhanced interactions
    const closeBtn = header.querySelector('#itabs-close-btn');
    closeBtn.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(255, 255, 255, 0.3)';
        this.style.transform = 'translateY(-50%) scale(1.1)';
    });
    closeBtn.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(255, 255, 255, 0.2)';
        this.style.transform = 'translateY(-50%) scale(1)';
    });
    closeBtn.addEventListener('focus', function() {
        this.style.outline = '3px solid #FFD700';
        this.style.outlineOffset = '2px';
    });
    closeBtn.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
    closeBtn.addEventListener('click', window.iTabs.closePopup);

    return header;
};

// Function to create the tab navigation
window.iTabs.createTabNav = function(productData) {
    const config = window.iTabs.popupConfig;
    const tabNav = document.createElement('div');
    tabNav.style.cssText = `
        display: flex;
        background: ${config.colors.lightGray};
        border-bottom: 2px solid ${config.colors.border};
        overflow-x: auto;
        scrollbar-width: thin;
        scrollbar-color: ${config.colors.border} transparent;
    `;

    // Add scrollbar styling for webkit browsers
    const style = document.createElement('style');
    style.textContent = `
        #itabs-popup .tab-nav::-webkit-scrollbar { height: 4px; }
        #itabs-popup .tab-nav::-webkit-scrollbar-track { background: transparent; }
        #itabs-popup .tab-nav::-webkit-scrollbar-thumb { background: ${config.colors.border}; border-radius: 2px; }
        #itabs-popup .tab-nav::-webkit-scrollbar-thumb:hover { background: ${config.colors.lightText}; }
    `;
    if (!document.getElementById('itabs-scrollbar-style')) {
        style.id = 'itabs-scrollbar-style';
        document.head.appendChild(style);
    }
    tabNav.className = 'tab-nav';

    const tabs = Object.keys(productData.tabs);

    tabs.forEach((tabKey, index) => {
        const tab = productData.tabs[tabKey];
        const tabButton = document.createElement('​​​​​​​​​​​​​​​​
