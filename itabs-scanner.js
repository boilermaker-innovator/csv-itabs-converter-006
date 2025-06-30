// iTabs Code Scanner for Alliance AMS
// Automatically finds product codes on web pages and adds “i” indicators
// Upload this file to WordPress Media Library

window.iTabs = window.iTabs || {};

// Configuration for Alliance AMS product code detection
window.iTabs.config = {

```
// Product code patterns - specifically for Alliance AMS automotive parts
productCodePatterns: [
    /\b(NWP-[A-Z0-9]+)\b/g,        // NAPA codes like NWP-B4C
    /\b(RDA-[0-9]+)\b/g,           // RDA codes like RDA-7945
    /\b(NAPA-[A-Z0-9]+)\b/g,       // NAPA codes like NAPA-F45
    /\b(GATES-[A-Z0-9]+)\b/g,      // Gates codes like GATES-5PK1190
    /\b(NGK-[0-9]+)\b/g,           // NGK codes like NGK-4424
    /\b(WIX-[0-9]+)\b/g,           // WIX codes
    /\b(FRAM-[A-Z0-9]+)\b/g,       // FRAM codes
    /\b(MANN-[A-Z0-9/]+)\b/g,      // Mann codes
    /\b(ACDelco-[0-9-]+)\b/g,      // ACDelco codes
    /\b(MONROE-[0-9]+)\b/g,        // Monroe codes
    /\b(BOSCH-[0-9]+)\b/g,         // Bosch codes
    /\b(BENDIX-[A-Z0-9]+)\b/g,     // Bendix codes
    /\b(LUCAS-[A-Z0-9]+)\b/g,      // Lucas codes
    /\b(TRW-[A-Z0-9]+)\b/g,        // TRW codes
    /\b(KYB-[A-Z0-9]+)\b/g,        // KYB codes
    /\b(DENSO-[A-Z0-9]+)\b/g       // Denso codes
],

// Elements to scan for product codes
scanSelectors: [
    'p',           // Paragraphs
    'td',          // Table cells
    'li',          // List items
    'span',        // Span elements
    'div',         // Div elements
    'h1, h2, h3, h4, h5, h6',  // Headings
    '.product-title',          // Common product title classes
    '.product-name',
    '.product-code',
    '.part-number',
    '.product-description',
    '.product-details'
],

// Elements to avoid scanning (to prevent breaking functionality)
avoidSelectors: [
    'script',      // Script tags
    'style',       // Style tags
    'input',       // Input fields
    'textarea',    // Text areas
    'button',      // Buttons
    '.itabs-indicator', // Existing iTabs indicators
    '.no-itabs',   // Elements marked to skip
    'nav',         // Navigation menus
    'header',      // Page headers
    'footer',      // Page footers
    '.menu',       // Menu elements
    '.navigation', // Navigation elements
    '.admin-bar',  // WordPress admin bar
    '.wp-admin',   // WordPress admin areas
    'noscript'     // No-script tags
],

// Alliance AMS brand colors
brandColors: {
    primary: '#0066CC',        // Alliance AMS corporate blue
    secondary: '#003366',      // Darker blue for accents
    orange: '#FF6600',         // Safety/warning orange
    gray: '#555555',           // Professional gray
    lightGray: '#F5F5F5',      // Background gray
    white: '#FFFFFF'           // Clean white
},

// Styling for the "i" indicators - matches Alliance AMS branding
indicatorStyle: {
    backgroundColor: '#0066CC',  // Alliance AMS corporate blue
    color: 'white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    fontSize: '12px',
    fontStyle: 'italic',
    fontWeight: 'bold',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '6px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    top: '-2px',
    zIndex: '1000',
    border: '2px solid #003366',  // Darker border for definition
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1',
    textAlign: 'center'
}
```

};

// Function to create an “i” indicator element
window.iTabs.createIndicator = function(productCode) {
const indicator = document.createElement(‘span’);
indicator.className = ‘itabs-indicator’;
indicator.textContent = ‘i’;
indicator.setAttribute(‘data-product-code’, productCode);
indicator.setAttribute(‘title’, ’Click for detailed product information - ’ + productCode);
indicator.setAttribute(‘aria-label’, ’Product information for ’ + productCode);
indicator.setAttribute(‘role’, ‘button’);
indicator.setAttribute(‘tabindex’, ‘0’);

```
// Apply styling
Object.assign(indicator.style, window.iTabs.config.indicatorStyle);

// Add hover effect - uses Alliance AMS darker blue
indicator.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.2)';
    this.style.backgroundColor = '#003366';  // Alliance AMS darker blue
    this.style.borderColor = '#0066CC';
    this.style.boxShadow = '0 3px 10px rgba(0, 102, 204, 0.4)';
});

indicator.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.backgroundColor = '#0066CC';  // Back to Alliance AMS primary blue
    this.style.borderColor = '#003366';
    this.style.boxShadow = 'none';
});

// Add focus styling for accessibility
indicator.addEventListener('focus', function() {
    this.style.outline = '3px solid #FFD700';
    this.style.outlineOffset = '2px';
});

indicator.addEventListener('blur', function() {
    this.style.outline = 'none';
});

// Add click and keyboard handlers for popup display
const handleActivation = function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Alliance AMS iTabs: Activating product info for', productCode);
    
    // Connect to the popup system (loaded in Part 3)
    if (window.iTabs.showProductPopup) {
        window.iTabs.showProductPopup(productCode);
    } else {
        console.warn('Alliance AMS iTabs: Popup system not loaded yet. Product:', productCode);
        
        // Show user-friendly message
        const message = `Loading product information for ${productCode}...\n\nPlease ensure all iTabs files are properly loaded on this website.`;
        alert(message);
    }
};

indicator.addEventListener('click', handleActivation);

// Keyboard support
indicator.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        handleActivation(e);
    }
});

return indicator;
```

};

// Function to check if an element should be avoided
window.iTabs.shouldAvoidElement = function(element) {
// Skip if element is null or undefined
if (!element || !element.matches) {
return true;
}

```
// Check if element matches avoid selectors
for (let selector of window.iTabs.config.avoidSelectors) {
    try {
        if (element.matches(selector)) {
            return true;
        }
    } catch (e) {
        // Invalid selector, skip it
        continue;
    }
}

// Check if element is inside an avoided parent
let parent = element.parentElement;
while (parent) {
    for (let selector of window.iTabs.config.avoidSelectors) {
        try {
            if (parent.matches && parent.matches(selector)) {
                return true;
            }
        } catch (e) {
            // Invalid selector, skip it
            continue;
        }
    }
    parent = parent.parentElement;
}

// Skip elements that are not visible
if (element.offsetParent === null && element.style.display !== 'none') {
    return true;
}

return false;
```

};

// Function to scan text content for product codes
window.iTabs.scanTextForCodes = function(text) {
const foundCodes = [];

```
for (let pattern of window.iTabs.config.productCodePatterns) {
    // Reset regex lastIndex to ensure proper scanning
    pattern.lastIndex = 0;
    
    let match;
    while ((match = pattern.exec(text)) !== null) {
        const productCode = match[0];
        
        // Check if we have data for this product
        if (window.iTabs.hasProduct && window.iTabs.hasProduct(productCode)) {
            // Check for duplicates at the same position
            const isDuplicate = foundCodes.some(code => 
                code.code === productCode && code.index === match.index
            );
            
            if (!isDuplicate) {
                foundCodes.push({
                    code: productCode,
                    index: match.index,
                    length: productCode.length
                });
            }
        }
        
        // Prevent infinite loops with zero-width matches
        if (match.index === pattern.lastIndex) {
            pattern.lastIndex++;
        }
    }
}

// Sort by position in text
return foundCodes.sort((a, b) => a.index - b.index);
```

};

// Function to replace text with enhanced version including indicators
window.iTabs.enhanceTextWithIndicators = function(element) {
// Skip if element should be avoided
if (window.iTabs.shouldAvoidElement(element)) {
return;
}

```
// Only process text nodes
const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    {
        acceptNode: function(node) {
            // Skip text nodes in script, style, or other excluded elements
            let parent = node.parentElement;
            while (parent) {
                if (window.iTabs.shouldAvoidElement(parent)) {
                    return NodeFilter.FILTER_REJECT;
                }
                parent = parent.parentElement;
            }
            return NodeFilter.FILTER_ACCEPT;
        }
    },
    false
);

const textNodes = [];
let node;
while (node = walker.nextNode()) {
    // Only process text nodes with actual content
    if (node.textContent && node.textContent.trim()) {
        textNodes.push(node);
    }
}

// Process each text node
textNodes.forEach(textNode => {
    const text = textNode.textContent;
    const foundCodes = window.iTabs.scanTextForCodes(text);
    
    if (foundCodes.length > 0) {
        try {
            // Create a document fragment to hold the new content
            const fragment = document.createDocumentFragment();
            let lastIndex = 0;
            
            foundCodes.forEach(codeInfo => {
                // Add text before the product code
                if (codeInfo.index > lastIndex) {
                    const beforeText = text.substring(lastIndex, codeInfo.index);
                    fragment.appendChild(document.createTextNode(beforeText));
                }
                
                // Add the product code text
                fragment.appendChild(document.createTextNode(codeInfo.code));
                
                // Add the "i" indicator
                const indicator = window.iTabs.createIndicator(codeInfo.code);
                fragment.appendChild(indicator);
                
                lastIndex = codeInfo.index + codeInfo.length;
            });
            
            // Add remaining text after last product code
            if (lastIndex < text.length) {
                const afterText = text.substring(lastIndex);
                fragment.appendChild(document.createTextNode(afterText));
            }
            
            // Replace the original text node with the enhanced version
            textNode.parentNode.replaceChild(fragment, textNode);
            
            console.log('Alliance AMS iTabs: Enhanced', foundCodes.length, 'product codes in element');
            
        } catch (e) {
            console.warn('Alliance AMS iTabs: Could not enhance text node:', e);
        }
    }
});
```

};

// Main function to scan the entire page for product codes
window.iTabs.scanPage = function() {
console.log(‘Alliance AMS iTabs: Starting page scan for product codes…’);

```
// Remove any existing indicators first to prevent duplicates
const existingIndicators = document.querySelectorAll('.itabs-indicator');
existingIndicators.forEach(indicator => {
    try {
        indicator.remove();
    } catch (e) {
        // Ignore removal errors
    }
});

let totalEnhanced = 0;

// Scan each type of element
window.iTabs.config.scanSelectors.forEach(selector => {
    try {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            const beforeCount = element.querySelectorAll('.itabs-indicator').length;
            window.iTabs.enhanceTextWithIndicators(element);
            const afterCount = element.querySelectorAll('.itabs-indicator').length;
            totalEnhanced += (afterCount - beforeCount);
        });
    } catch (e) {
        console.warn('Alliance AMS iTabs: Error scanning selector', selector, ':', e);
    }
});

console.log('Alliance AMS iTabs: Page scan complete. Enhanced', totalEnhanced, 'product codes.');

// Show brief notification if codes were found
if (totalEnhanced > 0) {
    window.iTabs.showSuccessNotification(totalEnhanced);
}

return totalEnhanced;
```

};

// Function to show success notification
window.iTabs.showSuccessNotification = function(count) {
// Don’t show notification if disabled or if one already exists
if (window.iTabs.config.showNotifications === false || document.getElementById(‘itabs-notification’)) {
return;
}

```
const notification = document.createElement('div');
notification.id = 'itabs-notification';
notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
    color: #155724;
    padding: 15px 20px;
    border-radius: 8px;
    border: 1px solid #c3e6cb;
    z-index: 10001;
    font-size: 14px;
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(0,0,0,0.15);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
    max-width: 300px;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.4s ease;
`;

notification.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 18px;">🎯</span>
        <div>
            <div style="font-weight: bold;">Alliance AMS iTabs Active</div>
            <div style="font-size: 12px; opacity: 0.8;">Enhanced ${count} product code${count !== 1 ? 's' : ''}</div>
        </div>
    </div>
`;

document.body.appendChild(notification);

// Animate in
requestAnimationFrame(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
});

// Remove notification after 4 seconds
setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 400);
}, 4000);
```

};

// Function to initialize auto-scanning with debouncing
window.iTabs.initializeAutoScan = function() {
// Scan immediately when page is ready
window.iTabs.scanPage();

```
// Watch for dynamic content changes (AJAX, WordPress updates, etc.)
if (window.MutationObserver) {
    let scanTimeout;
    
    const observer = new MutationObserver(function(mutations) {
        let shouldRescan = false;
        
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Check if any added nodes contain text content
                for (let node of mutation.addedNodes) {
                    if (node.nodeType === Node.ELEMENT_NODE && 
                        node.textContent && 
                        node.textContent.trim() &&
                        !node.classList?.contains('itabs-indicator')) {
                        shouldRescan = true;
                        break;
                    }
                }
            }
        });
        
        if (shouldRescan) {
            console.log('Alliance AMS iTabs: Content changed, scheduling rescan...');
            
            // Debounce rescanning to avoid excessive calls
            clearTimeout(scanTimeout);
            scanTimeout = setTimeout(() => {
                window.iTabs.scanPage();
            }, 1000); // Wait 1 second after last change
        }
    });
    
    // Start observing changes to the page
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    console.log('Alliance AMS iTabs: Auto-scan initialized with content change detection');
}

// Rescan when window loads (for late-loading content)
window.addEventListener('load', function() {
    setTimeout(window.iTabs.scanPage, 2000);
});

// Handle WordPress AJAX completion
if (window.jQuery) {
    jQuery(document).ajaxComplete(function() {
        setTimeout(window.iTabs.scanPage, 500);
    });
}
```

};

// Initialize when DOM is ready
if (document.readyState === ‘loading’) {
document.addEventListener(‘DOMContentLoaded’, window.iTabs.initializeAutoScan);
} else {
// DOM is already ready, start immediately
setTimeout(window.iTabs.initializeAutoScan, 100);
}

// Handle page visibility changes (when user returns to tab)
document.addEventListener(‘visibilitychange’, function() {
if (!document.hidden) {
setTimeout(window.iTabs.scanPage, 500);
}
});

console.log(‘Alliance AMS iTabs Code Scanner loaded and ready for automotive parts detection’);
