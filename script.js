// ==========================================
// ALEXCAM · SCRIPT PRINCIPAL - VERSIÓN CORREGIDA
// Productos actualizados · Carrito se limpia al enviar WhatsApp
// ==========================================

let products = [];
let cotizacion = JSON.parse(localStorage.getItem('alexcam_cotizacion')) || [];
const WHATSAPP_NUMBER = '59167866604';
let productoEnEspera = null;

const productosData = [
    // ==========================================
    // 📦 KITS COMPLETOS
    // ==========================================
    {
        id: 1,
        name: "Kit Básico 2 Cámaras",
        category: "kit",
        desc: " 2MP ·  4MP ·  5MP\nIncluye: 2 cámaras + DVR 4ch + Disco 1TB + Fuente + Cables",
        img: "kits/kit-basico.jpg",
        icon: "📦",
        badge: "RECOMENDADO",
        resoluciones: ["2MP", "4MP", "5MP"],
        active: true
    },
    {
        id: 2,
        name: "Kit 4 Cámaras",
        category: "kit",
        desc: " 2MP ·  4MP ·  5MP\nIncluye: 4 cámaras + DVR 4ch + Disco 1TB + Fuente + Cables",
        img: "kits/kit-4cam.jpg",
        icon: "📦",
        badge: "MÁS VENDIDO",
        resoluciones: ["2MP", "4MP", "5MP"],
        active: true
    },
    {
        id: 3,
        name: "Kit 8 Cámaras",
        category: "kit",
        desc: " 2MP ·  4MP ·  5MP\nIncluye: 8 cámaras + DVR 8ch + Disco 2TB + Fuente + Cables",
        img: "kits/kit-8cam.jpg",
        icon: "📦",
        badge: "POPULAR",
        resoluciones: ["2MP", "4MP", "5MP"],
        active: true
    },
    {
        id: 4,
        name: "Kit 16 Cámaras",
        category: "kit",
        desc: " 2MP ·  4MP ·  5MP\nIncluye: 16 cámaras + DVR/NVR 16ch + Disco 4TB + Fuente + Cables",
        img: "kits/kit-16cam.jpg",
        icon: "🏢",
        badge: "EMPRESARIAL",
        resoluciones: ["2MP", "4MP", "5MP"],
        active: true
    },
    {
        id: 5,
        name: "Kit 32 Cámaras",
        category: "kit",
        desc: " 2MP ·  4MP ·  5MP\nIncluye: 32 cámaras + NVR 32ch + Disco 8TB + Cables",
        img: "kits/kit-32cam.jpg",
        icon: "🏭",
        badge: "INDUSTRIAL",
        resoluciones: ["2MP", "4MP", "5MP"],
        active: true
    },

    // ==========================================
    // 📹 CÁMARAS
    // ==========================================
    { id: 6, name: "Cámara Domo 4MP", category: "camara", desc: "Cámara IP domo 4MP, PoE, IR 30m, H.265", img: "camaras/domo-4mp.jpg", icon: "🔵", badge: "IP", active: true },
    { id: 7, name: "Cámara Bullet 5MP", category: "camara", desc: "Cámara IP bullet 5MP, exterior, IR 50m, PoE", img: "camaras/bullet-5mp.jpg", icon: "🔴", badge: "Alta definición", active: true },
    { id: 8, name: "Cámara PTZ 4MP", category: "camara", desc: "Cámara PTZ IP 4MP, zoom óptico 4x, seguimiento", img: "camaras/ptz-4mp.jpg", icon: "🎥", badge: "PTZ", active: true },
    { id: 9, name: "Cámara Domo 2MP", category: "camara", desc: "Cámara analógica 2MP, IR 20m, económico", img: "camaras/domo-2mp.jpg", icon: "⭕", badge: "", active: true },
    { id: 10, name: "Cámara Bullet 4MP", category: "camara", desc: "Cámara analógica 4MP, exterior, IR 40m", img: "camaras/bullet-4mp.jpg", icon: "🔴", badge: "Más vendida", active: true },
    { id: 11, name: "Cámara pin hole 2MP", category: "camara", desc: "CÁMARA PIN HOLE 2MP ANALÓGICA CON AUDIO", img: "camaras/pinhole.jpeg", icon: "🔴", badge: "Especial", active: true },
    { id: 12, name: "Cámara Wifi Inalambrica EZVIZ 2mp", category: "camara", desc: "Camara wifi inalámbrica EZVIZ 2mp. 360º interior, comunicacion bidireccional", img: "camaras/ezviz2mp.jpg", icon: "🔴", badge: "EZVIZ", active: true },
    { id: 13, name: "Cámara Wifi Inalambrica EZVIZ 4k", category: "camara", desc: "Camara wifi inalámbrica EZVIZ 4k. 360º interior, comunicacion bidireccional", img: "camaras/ezviz4k.jpg", icon: "🔴", badge: "EZVIZ 4K", active: true },
    { id: 14, name: "Cámara Wifi Inalambrica IMOU CUISER 4MP", category: "camara", desc: "Camara wifi inalámbrica IMOU CUISER tipo PTZ para exteriores Full Color 3MP. 4MP. 5MP. Comunicación bidireccional y alarma detección de humanos y rastreo inteligente.", img: "camaras/imoucruiser.png", icon: "🔴", badge: "IMOU", active: true },
    { id: 15, name: "Cámara Dahua ip bala 6MP", category: "camara", desc: "CAMARA DAHUA IP BALA 6MP WIZCOLOR WIZSENSE METALICA", img: "camaras/wizcolor.png", icon: "🔴", badge: "Dahua", active: true },
    { id: 16, name: "Cámara dahua domo metalica cvi de 2MP", category: "camara", desc: "CAMARA DAHUA DOMO METALICA CVI DE 2MP (1080P) IR 30MT IP67", img: "camaras/dahuadomometalicacvi.png", icon: "🔴", active: true },
    { id: 17, name: "Cámara dahua domo plastica cvi de 2MP", category: "camara", desc: "CAMARA DAHUA DOMO PLASTICA CVI DE 2MP (1080P) IR 25M C/AUDIO", img: "camaras/dahuadomomic.jpg", icon: "🔴", active: true },
    { id: 18, name: "Cámara dahua bala metal+plastico cvi 2MP", category: "camara", desc: "CAMARA DAHUA BALA METAL+PLÁSTICO CVI 2MP FULL COLOR IP67", img: "camaras/dahuametal+plastico.jpg", icon: "🔴", active: true },
    { id: 19, name: "Cámara dahua domo de 2MP", category: "camara", desc: "CÁMARA DAHUA DOMO DE 2 MP 1080P, HDCVI X PLUS, AUDIO BIDIRECCIONAL, ILUMINADOR DUAL INTELIGENTE, 2.8MM APERTURA DE HASTA 111°, ILUMINACIÓN DE HASTA 40M, FABRICADA EN METAL + PLASTICO", img: "camaras/dahuadomo2mp.png", icon: "🔴", active: true },
    { id: 20, name: "Cámara hikvision bala 2 MP", category: "camara", desc: "CAMARA HIKVISION BALA 2 MP, IP67, F1.0, COLORVU, LUZ HIBRIDA INTELIGENTE 40M, IR 40M, MIC INCORPORADO", img: "camaras/hikvisionbalacolorvu.png", icon: "🔴", active: true },
    { id: 21, name: "Cámara hikvision tetrahibri", category: "camara", desc: "CAMARA HIKVISION TETRAHIBRIDA BALA 3K(~5MP), 2.8MM, IP67, METALICA, LUZ20M, COLORVU, C/AUDIO", img: "camaras/hikvisiontetrahibridabala3k.png", icon: "🔴", active: true },
    { id: 22, name: "Cámara hikvision torreta 2MP", category: "camara", desc: "CAMARA HIKVISION TETRAHIBRIDA TORRETA 2MP, 2.8MM, METALICA, IR20M", img: "camaras/hikvisiontetahibridatorreta.png", icon: "🔴", active: true },
    { id: 23, name: "Cámara hikvision pt fija 2mp 350 grados", category: "camara", desc: "CÁMARA HIKVISION PT FIJA 350 GRADOS 2MP CON AUDIO BIDIRECCIONAL, 2.8MM, IR 25M, LUZ 20M, MICR Y ALTAVOZ INT", img: "camaras/hikvision350grados.png", icon: "🔴", active: true },

    // ==========================================
    // 💾 DVR/NVR
    // ==========================================
    {
        id: 24,
        name: "DVR 4 Canales",
        category: "dvr",
        desc: "DVR 4 canales, 5MP, económico",
        img: "dvr/dvr-4ch.jpg",
        icon: "💾",
        badge: "",
        resoluciones: ["2MP", "5MP"],
        active: true
    },
    {
        id: 25,
        name: "DVR 8 Canales",
        category: "dvr",
        desc: "DVR 8 canales, 5MP, H.265, 1 SATA",
        img: "dvr/dvr-8ch.jpg",
        icon: "💿",
        badge: "RECOMENDADO",
        resoluciones: ["2MP", "5MP"],
        active: true
    },
    {
        id: 26,
        name: "NVR 16 Canales",
        category: "dvr",
        desc: "NVR 16 canales PoE, 4K, IA",
        img: "dvr/nvr-16ch.jpg",
        icon: "🖥️",
        badge: "PROFESIONAL",
        resoluciones: ["2MP", "4MP", "5MP"],
        active: true
    },

    // ==========================================
    // 🔌 ACCESORIOS
    // ==========================================
    { id: 27, name: "Fuente 12V 10A", category: "accesorio", desc: "Fuente conmutada 12V 10A, para 8 cámaras", img: "accesorios/fuente-10a.jpg", icon: "⚡", badge: "", active: true },
    { id: 28, name: "Disco WD Purple 2TB", category: "accesorio", desc: "Disco duro para videovigilancia, 2TB", img: "accesorios/disco-2tb.jpg", icon: "💽", badge: "WD Purple", active: true },
    { id: 29, name: "Cable UTP Cat6", category: "accesorio", desc: "Caja de cable UTP Cat6, 305m", img: "accesorios/cable-utp.jpg", icon: "🔌", badge: "Premium", active: true },
    { id: 30, name: "Fuente 12V 5A", category: "accesorio", desc: "Fuente conmutada 12V 5A, para 4 cámaras", img: "accesorios/fuente-5a.jpg", icon: "⚡", badge: "", active: true },
    { id: 31, name: "Balum", category: "accesorio", desc: "Balum para video, par trenzado, transmisión HD", img: "accesorios/balum.jpg", icon: "🔌", badge: "", active: true },
    { id: 32, name: "Balum 4K audio/video", category: "accesorio", desc: "BALUN HDCVI/TVI/AHD/CVBS, SOPORTA HASTA 8MP", img: "accesorios/balum2.jpeg", icon: "📦", badge: "", active: true },
    { id: 33, name: "Conector BNC x10", category: "accesorio", desc: "Conector BNC macho para cable coaxial, paquete x10", img: "accesorios/conector-bnc.jpg", icon: "🔌", badge: "", active: true },
    { id: 34, name: "Conector DC x10", category: "accesorio", desc: "Conector DC macho/hembra, paquete x10", img: "accesorios/conector-dc.jpg", icon: "🔌", badge: "", active: true },
    { id: 35, name: "Caja Sobreponer 4x4", category: "accesorio", desc: "Caja plástica para montaje superficial", img: "accesorios/caja-4x4.jpg", icon: "📦", badge: "", active: true },
    { id: 36, name: "Cable Utp cat 5E Exterior 305Mts", category: "accesorio", desc: "Cable Utp Cat. 5E Exterior X 305Mts Glc", img: "accesorios/Cable-cat5e2.jpeg", icon: "📦", badge: "", active: true },
    { id: 37, name: "DAHUA UTP CAT5e 100% Cobre. Diámetro 0,5mm. 100mts", category: "accesorio", desc: "DAHUA UTP CAT5e 100% Cobre. Diámetro 0,5mm. 100mts. PVC en color BLANCO para instalaciones exigentes.", img: "accesorios/Cable-cat5e100.jpeg", icon: "📦", badge: "", active: true },
    { id: 38, name: "Cable UTP Cat5e 305m", category: "accesorio", desc: "Caja de cable UTP Cat5e, 305 metros", img: "accesorios/cable-cat5e.jpg", icon: "🔌", badge: "", active: true },
    { id: 39, name: "Disco WD Purple 1TB", category: "accesorio", desc: "Disco duro para videovigilancia, 1TB", img: "accesorios/disco-1tb.jpg", icon: "💽", badge: "WD Purple", active: true },
    { id: 40, name: "Disco WD Purple 4TB", category: "accesorio", desc: "Disco duro para videovigilancia, 4TB", img: "accesorios/disco-4tb.jpg", icon: "💽", badge: "WD Purple", active: true },
    { id: 41, name: "Disco WD Purple 6TB", category: "accesorio", desc: "Disco duro para videovigilancia, 6TB", img: "accesorios/disco-6tb.jpg", icon: "💽", badge: "WD Purple", active: true },
    { id: 42, name: "Disco WD Purple 8TB", category: "accesorio", desc: "Disco duro para videovigilancia, 8TB", img: "accesorios/disco-8tb.jpg", icon: "💽", badge: "WD Purple", active: true },

    // ==========================================
    // 📡 INTERNET
    // ==========================================
    { id: 43, name: "Internet portátil para eventos", category: "internet", desc: "Router 4G + batería para ferias, congresos", img: "internet/portatil.jpg", icon: "📡", badge: "4G", active: true },
    { id: 44, name: "Instalación de router TP-Link", category: "internet", desc: "Configuración de routers domésticos y empresariales", img: "internet/router-4g.jpg", icon: "📶", badge: "Hogar", active: true },
    { id: 45, name: "Ampliación de señal (Repetidores/Extensores)", category: "internet", desc: "Eliminar zonas muertas en casa u oficina", img: "internet/repetidores.jpg", icon: "🔄", badge: "PoE", active: true },
    { id: 46, name: "Switch PoE 4 Puertos", category: "internet", desc: "Switch Dahua para Escritorio 5 Puertos/ Fast Ethernet 10/100", img: "internet/switch.jpeg", icon: "🔄", badge: "PoE", active: true },
    { id: 47, name: "Switch PoE 8 Puertos", category: "internet", desc: "Switch 8 puertos PoE, 10/100Mbps", img: "internet/switch-poe-8.jpg", icon: "🔄", badge: "PoE", active: true },
    { id: 48, name: "Switch PoE 16 Puertos", category: "internet", desc: "Switch 16 puertos PoE, Gigabit", img: "internet/switch-poe-16.jpg", icon: "🔄", badge: "Gigabit", active: true },
    { id: 49, name: "Ubiquiti NanoStation", category: "internet", desc: "Radio enlace punto a punto, 5GHz, 5km", img: "internet/nanostation.jpg", icon: "📡", badge: "Ubiquiti", active: true },
    { id: 50, name: "Repetidor WiFi Mesh", category: "internet", desc: "Repetidor WiFi, cobertura 360°, hasta 10 dispositivos", img: "internet/mesh.jpeg", icon: "🔄", badge: "Mesh", active: true },
    { id: 51, name: "UPS", category: "internet", desc: "UPS Dahua de 600VA/360W/ Linea Iteractiva/ Entrada y Salida de 110 Vac +-10%/ Estabilizador de Voltaje AVR", img: "internet/ups.jpeg", icon: "🔄", badge: "Ups", active: true },

    // ==========================================
    // 🗄️ RACKS
    // ==========================================
    { id: 52, name: "Rack de Piso 6U", category: "rack", desc: "Rack metálico de piso, 6U, incluye bandeja", img: "racks/rack-6u.jpg", icon: "🗄️", badge: "", active: true },
    { id: 53, name: "Rack de Piso 9U", category: "rack", desc: "Rack metálico de piso, 9U, incluye bandeja", img: "racks/rack-9u.jpg", icon: "🗄️", badge: "", active: true },
    { id: 54, name: "Rack de Piso 12U", category: "rack", desc: "Rack metálico de piso, 12U, incluye bandeja", img: "racks/rack-12u.jpg", icon: "🗄️", badge: "", active: true },
    { id: 55, name: "Rack de Piso 22U", category: "rack", desc: "Rack metálico de piso, 22U, puerta vidrio", img: "racks/rack-22u.jpg", icon: "🗄️", badge: "Profesional", active: true },

    // ==========================================
    // 🔧 SERVICIOS PROFESIONALES
    // ==========================================
    { id: 56, name: "Instalación de Cámaras", category: "servicio", desc: "Instalación profesional de cámaras y sistemas de videovigilancia", img: "servicios/instalacion.jpg", icon: "🔧", badge: "Servicio", active: true },
    { id: 57, name: "Soporte Técnico", category: "servicio", desc: "Soporte técnico remoto y presencial, mantenimiento correctivo", img: "servicios/soporte.jpg", icon: "🔧", badge: "Servicio", active: true },
    { id: 58, name: "Instalación de Racks", category: "servicio", desc: "Instalación y organización profesional de racks y gabinetes", img: "servicios/instalacion-racks.jpg", icon: "🗄️", badge: "Servicio", active: true },
    { id: 59, name: "Mantenimiento de Racks", category: "servicio", desc: "Mantenimiento preventivo y correctivo de racks", img: "servicios/mantenimiento-racks.jpg", icon: "🔧", badge: "Servicio", active: true },
    { id: 60, name: "Proyectos a Medida", category: "servicio", desc: "Diseño y desarrollo de sistemas de seguridad personalizados", img: "servicios/proyectos.jpg", icon: "📐", badge: "Servicio", active: true },
    {
        id: 61,
        name: "Instalación de Redes Domiciliarias/WiFi",
        category: "servicio",
        desc: "Instalación profesional de redes WiFi para hogares y oficinas. Cobertura total, optimización de señal y configuración de equipos.",
        img: "servicios/redes-wifi.jpg",
        icon: "📶",
        badge: "Servicio",
        active: true
    }
];

// ==========================================
// CARGAR PRODUCTOS
// ==========================================
async function cargarProductosDesdeJSON() {
    console.log('📦 Cargando productos...');

    try {
        const response = await fetch('data/productos.json');
        if (!response.ok) throw new Error('No se pudo cargar el archivo JSON');

        const data = await response.json();
        products = data.productos.filter(p => p.active === true);
        console.log(`✅ ${products.length} productos activos cargados desde JSON`);
    } catch (error) {
        console.error('Error cargando productos:', error);
        console.warn('⚠️ Usando datos de respaldo (hardcoded)');
        products = productosData.filter(p => p.active === true);
    }

    const loader = document.getElementById('loading-indicator');
    if (loader) loader.style.display = 'none';

    const path = window.location.pathname.split('/').pop() || 'index.html';

    if (path === 'productos.html') {
        if (document.getElementById('productos-grid')) {
            renderProductos('productos-grid', 'all');
            setTimeout(() => initFiltros(), 200);
        }
    }

    if (path === 'index.html' || path === '') {
        if (document.getElementById('kits-destacados')) renderKitsDestacados();
        if (document.getElementById('servicios-grid')) renderServiciosGrid();
    }

    if (path === 'cotizacion.html') renderCotizacionPage();

    return products;
}

// ==========================================
// RENDERIZAR SERVICIOS EN INDEX.HTML
// ==========================================
function renderServiciosGrid() {
    const container = document.getElementById('servicios-grid');
    if (!container) return;

    const servicios = [
        { icon: "fas fa-camera", title: "Venta de equipos", desc: "Cámaras, DVR/NVR, discos, fuentes, cables." },
        { icon: "fas fa-tools", title: "Instalación profesional", desc: "Técnicos certificados, trabajo limpio y ordenado." },
        { icon: "fas fa-headset", title: "Soporte y mantenimiento", desc: "Asistencia remota y visitas técnicas." },
        { icon: "fas fa-chart-line", title: "Proyectos a medida", desc: "Diseño de sistemas según necesidad." },
        { icon: "fas fa-wifi", title: "Redes e Internet", desc: "Antenas, radio enlaces, switches PoE." },
        { icon: "fas fa-server", title: "Racks y organización", desc: "Instalación y mantenimiento de racks." },
        {
            icon: "fas fa-home",
            title: "Redes Domiciliarias/WiFi",
            desc: "Instalación de redes WiFi para hogares y oficinas. Cobertura total y optimización.",
            badge: "NUEVO"
        }
    ];

    container.innerHTML = servicios.map(s => `
        <div class="service-item" style="position: relative;">
            ${s.badge ? `<span style="position: absolute; top: 15px; right: 15px; background: var(--accent); color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.7rem; font-weight: 700;">${s.badge}</span>` : ''}
            <i class="${s.icon}"></i>
            <h4>${s.title}</h4>
            <p>${s.desc}</p>
        </div>
    `).join('');
}

// ==========================================
// RENDERIZAR PRODUCTOS (CON IMÁGENES)
// ==========================================
function renderProductos(containerId, filter = 'all') {
    const container = document.getElementById(containerId);
    if (!container) return;

    let filtered = filter === 'all' ? [...products] : products.filter(p => p.category === filter);

    if (filtered.length === 0) {
        container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:60px;"><h3>No hay productos en esta categoría</h3></div>`;
        return;
    }

    container.innerHTML = filtered.map(p => {
        let categoryIcon = '';
        let categoryText = '';
        switch (p.category) {
            case 'kit': categoryIcon = '📦'; categoryText = 'KIT'; break;
            case 'camara': categoryIcon = '📹'; categoryText = 'CÁMARA'; break;
            case 'dvr': categoryIcon = '💾'; categoryText = 'GRABADOR'; break;
            case 'accesorio': categoryIcon = '🔌'; categoryText = 'ACCESORIO'; break;
            case 'internet': categoryIcon = '📡'; categoryText = 'INTERNET'; break;
            case 'rack': categoryIcon = '🗄️'; categoryText = 'RACK'; break;
            case 'servicio': categoryIcon = '🔧'; categoryText = 'SERVICIO'; break;
            default: categoryIcon = '📦'; categoryText = p.category.toUpperCase();
        }

        const descHTML = p.desc.replace(/\n/g, '<br>');

        // Verificar si tiene imagen
        const tieneImagen = p.img && p.img.trim() !== '';

        return `
        <div class="product-card">
            ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
            
            <!-- IMAGEN DEL PRODUCTO -->
            <div class="product-img" style="
                ${tieneImagen
                ? `background-image: url('images/${p.img}'); background-size: cover; background-position: center;`
                : `background: var(--gray-100); display: flex; align-items: center; justify-content: center; font-size: 3rem;`
            }">
                ${!tieneImagen ? (p.icon || categoryIcon) : ''}
            </div>
            
            <span class="product-category-tag">${categoryIcon} ${categoryText}</span>
            <h3 style="font-size: 1.1rem; margin-bottom: 8px;">${p.name}</h3>
            <div style="color: var(--gray-500); font-size: 0.85rem; margin-bottom: 16px; min-height: 60px; line-height: 1.5;">
                ${descHTML}
            </div>
            ${p.resoluciones ? `
                <div style="display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap;">
                    ${p.resoluciones.map(res => `<span style="background: var(--gray-100); padding: 4px 12px; border-radius: 40px; font-size: 0.75rem; font-weight: 600; color: var(--primary);">${res}</span>`).join('')}
                </div>
            ` : ''}
            <div style="display: flex; justify-content: center;">
                <button class="cotizar-btn" data-id="${p.id}" onclick="agregarACotizacion(${p.id})" style="background: var(--primary); color: white; border: none; padding: 12px 24px; border-radius: 60px; font-weight: 600; display: flex; align-items: center; gap: 8px; cursor: pointer; width: 100%; justify-content: center;">
                    <i class="fas fa-file-invoice"></i> Agregar a cotización
                </button>
            </div>
        </div>
    `}).join('');
}

// ==========================================
// RENDERIZAR KITS DESTACADOS (CON IMÁGENES)
// ==========================================
function renderKitsDestacados() {
    const container = document.getElementById('kits-destacados');
    if (!container) return;
    const kits = products.filter(p => p.category === 'kit').slice(0, 4);

    container.innerHTML = kits.map(p => {
        const tieneImagen = p.img && p.img.trim() !== '';

        return `
        <div class="product-card" style="position: relative;">
            ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
            
            <!-- IMAGEN DEL KIT -->
            <div class="product-img" style="
                ${tieneImagen
                ? `background-image: url('images/${p.img}'); background-size: cover; background-position: center;`
                : `background: var(--gray-100); display: flex; align-items: center; justify-content: center; font-size: 3rem;`
            }">
                ${!tieneImagen ? '📦' : ''}
            </div>
            
            <span class="product-category-tag">📦 KIT</span>
            <h3>${p.name}</h3>
            <div style="color: var(--gray-500); font-size: 0.85rem; margin-bottom: 16px; line-height: 1.5;">
                ${p.desc.split('\n')[0]}<br>
                <span style="color: var(--primary); font-weight: 600;">${p.resoluciones.join(' · ')}</span>
            </div>
            <div style="display: flex; justify-content: center;">
                <button class="cotizar-btn" data-id="${p.id}" onclick="agregarACotizacion(${p.id})" style="background: var(--primary); color: white; border: none; padding: 12px 24px; border-radius: 60px; font-weight: 600; display: flex; align-items: center; gap: 8px; cursor: pointer; width: 100%; justify-content: center;">
                    <i class="fas fa-file-invoice"></i> Cotizar kit
                </button>
            </div>
        </div>
    `}).join('');
}

// ==========================================
// MODAL DE RESOLUCIÓN
// ==========================================
function crearModalResolucion(product) {
    const modalExistente = document.getElementById('modal-resolucion');
    if (modalExistente) modalExistente.remove();

    const backdrop = document.createElement('div');
    backdrop.id = 'modal-resolucion';
    backdrop.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
        animation: fadeIn 0.3s ease;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        border-radius: 24px;
        padding: 40px;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 25px 50px rgba(0,0,0,0.3);
        animation: slideUp 0.4s ease;
        border: 1px solid var(--gray-200);
    `;

    let titulo = '';
    let opciones = '';

    if (product.category === 'kit') {
        titulo = 'Seleccioná la resolución de las cámaras';
        opciones = `
            <button onclick="seleccionarResolucion('2MP')" class="resolucion-btn" style="background: linear-gradient(145deg, #e8f5e9, #c8e6c9); border: 2px solid #2e7d32;">
                <span style="font-size: 2rem;">🔵</span>
                <div>
                    <h4 style="margin:0; color:#2e7d32; font-size:1.3rem;">2MP</h4>
                    <p style="margin:5px 0 0; color:#2e7d32; opacity:0.8;">Económico · 1080p</p>
                </div>
            </button>
            <button onclick="seleccionarResolucion('4MP')" class="resolucion-btn" style="background: linear-gradient(145deg, #e3f2fd, #bbdefb); border: 2px solid #1565c0;">
                <span style="font-size: 2rem;">🔷</span>
                <div>
                    <h4 style="margin:0; color:#1565c0; font-size:1.3rem;">4MP</h4>
                    <p style="margin:5px 0 0; color:#1565c0; opacity:0.8;">Full HD · 1440p</p>
                </div>
            </button>
            <button onclick="seleccionarResolucion('5MP')" class="resolucion-btn" style="background: linear-gradient(145deg, #fff3e0, #ffe0b2); border: 2px solid #e65100;">
                <span style="font-size: 2rem;">🔶</span>
                <div>
                    <h4 style="margin:0; color:#e65100; font-size:1.3rem;">5MP</h4>
                    <p style="margin:5px 0 0; color:#e65100; opacity:0.8;">Alta definición · 2592p</p>
                </div>
            </button>
        `;
    } else {
        titulo = 'Seleccioná la resolución del grabador';
        if (product.name.includes('NVR')) {
            opciones = `
                <button onclick="seleccionarResolucion('2MP')" class="resolucion-btn" style="background: linear-gradient(145deg, #e8f5e9, #c8e6c9); border: 2px solid #2e7d32;">
                    <span style="font-size: 2rem;">🖥️</span>
                    <div>
                        <h4 style="margin:0; color:#2e7d32; font-size:1.3rem;">2MP</h4>
                        <p style="margin:5px 0 0; color:#2e7d32; opacity:0.8;">Económico · 1080p</p>
                    </div>
                </button>
                <button onclick="seleccionarResolucion('4MP')" class="resolucion-btn" style="background: linear-gradient(145deg, #e3f2fd, #bbdefb); border: 2px solid #1565c0;">
                    <span style="font-size: 2rem;">🖥️</span>
                    <div>
                        <h4 style="margin:0; color:#1565c0; font-size:1.3rem;">4MP</h4>
                        <p style="margin:5px 0 0; color:#1565c0; opacity:0.8;">Full HD · 1440p</p>
                    </div>
                </button>
                <button onclick="seleccionarResolucion('5MP')" class="resolucion-btn" style="background: linear-gradient(145deg, #fff3e0, #ffe0b2); border: 2px solid #e65100;">
                    <span style="font-size: 2rem;">🖥️</span>
                    <div>
                        <h4 style="margin:0; color:#e65100; font-size:1.3rem;">5MP</h4>
                        <p style="margin:5px 0 0; color:#e65100; opacity:0.8;">Alta definición · 2592p</p>
                    </div>
                </button>
            `;
        } else {
            opciones = `
                <button onclick="seleccionarResolucion('2MP')" class="resolucion-btn" style="background: linear-gradient(145deg, #e8f5e9, #c8e6c9); border: 2px solid #2e7d32;">
                    <span style="font-size: 2rem;">💿</span>
                    <div>
                        <h4 style="margin:0; color:#2e7d32; font-size:1.3rem;">2MP</h4>
                        <p style="margin:5px 0 0; color:#2e7d32; opacity:0.8;">Económico · 1080p</p>
                    </div>
                </button>
                <button onclick="seleccionarResolucion('5MP')" class="resolucion-btn" style="background: linear-gradient(145deg, #fff3e0, #ffe0b2); border: 2px solid #e65100;">
                    <span style="font-size: 2rem;">💿</span>
                    <div>
                        <h4 style="margin:0; color:#e65100; font-size:1.3rem;">5MP</h4>
                        <p style="margin:5px 0 0; color:#e65100; opacity:0.8;">Alta definición · 2592p</p>
                    </div>
                </button>
            `;
        }
    }

    modalContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
            <div style="font-size: 4rem; margin-bottom: 10px;">📦</div>
            <h2 style="color: var(--primary); margin-bottom: 10px; font-size: 1.8rem;">${product.name}</h2>
            <p style="color: var(--gray-500); font-size: 1.1rem;">${titulo}</p>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 30px;">
            ${opciones}
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--gray-200); padding-top: 25px;">
            <button onclick="cerrarModalResolucion()" style="background: none; border: 1px solid var(--gray-300); padding: 12px 25px; border-radius: 60px; font-weight: 600; color: var(--gray-500); cursor: pointer;">
                Cancelar
            </button>
            <p style="color: var(--gray-400); font-size: 0.9rem;">
                <i class="fas fa-info-circle"></i> Podés cambiar la cantidad después
            </p>
        </div>
    `;

    backdrop.appendChild(modalContent);
    document.body.appendChild(backdrop);

    const style = document.createElement('style');
    style.textContent = `
        .resolucion-btn {
            display: flex;
            align-items: center;
            gap: 20px;
            padding: 20px;
            border-radius: 16px;
            background: white;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
            text-align: left;
            border: 2px solid transparent;
        }
        .resolucion-btn:hover {
            transform: translateX(10px) scale(1.02);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// ==========================================
// SELECCIONAR RESOLUCIÓN
// ==========================================
window.seleccionarResolucion = function (resolucion) {
    if (!productoEnEspera) {
        cerrarModalResolucion();
        return;
    }

    const product = productoEnEspera;
    const nombreConResolucion = `${product.name} - ${resolucion}`;

    const existing = cotizacion.find(item =>
        item.id === product.id && item.resolucion === resolucion
    );

    if (existing) {
        existing.qty += 1;
    } else {
        cotizacion.push({
            ...product,
            name: nombreConResolucion,
            resolucion: resolucion,
            qty: 1
        });
    }

    guardarCotizacion();
    actualizarContadorCotizacion();
    showNotification('✅ Agregado a tu cotización');

    const btn = document.querySelector(`.cotizar-btn[data-id="${product.id}"]`);
    if (btn) {
        btn.innerHTML = '<i class="fas fa-check"></i> Agregado';
        btn.style.background = '#1e8f5e';
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-file-invoice"></i> Agregar a cotización';
            btn.style.background = 'var(--primary)';
        }, 1500);
    }

    cerrarModalResolucion();
};

// ==========================================
// CERRAR MODAL
// ==========================================
window.cerrarModalResolucion = function () {
    const modal = document.getElementById('modal-resolucion');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    }
    productoEnEspera = null;
};

// ==========================================
// AGREGAR A COTIZACIÓN
// ==========================================
function agregarACotizacion(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    if (product.resoluciones && product.resoluciones.length > 0) {
        productoEnEspera = product;
        crearModalResolucion(product);
    } else {
        const existing = cotizacion.find(item => item.id === id);
        if (existing) {
            existing.qty += 1;
        } else {
            cotizacion.push({ ...product, qty: 1 });
        }

        guardarCotizacion();
        actualizarContadorCotizacion();
        showNotification('✅ Agregado a tu cotización');

        const btn = document.querySelector(`.cotizar-btn[data-id="${id}"]`);
        if (btn) {
            btn.innerHTML = '<i class="fas fa-check"></i> Agregado';
            btn.style.background = '#1e8f5e';
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-file-invoice"></i> Agregar a cotización';
                btn.style.background = 'var(--primary)';
            }, 1500);
        }
    }
}

// ==========================================
// FUNCIONES DEL COTIZADOR
// ==========================================
function guardarCotizacion() {
    localStorage.setItem('alexcam_cotizacion', JSON.stringify(cotizacion));
}

function eliminarDeCotizacion(id) {
    cotizacion = cotizacion.filter(item => item.id !== id);
    guardarCotizacion();
    actualizarContadorCotizacion();
    if (document.getElementById('cotizacion-items')) renderCotizacionPage();
    showNotification('🗑️ Producto eliminado');
}

function actualizarCantidad(id, delta) {
    const item = cotizacion.find(i => i.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            cotizacion = cotizacion.filter(i => i.id !== id);
        }
        guardarCotizacion();
        actualizarContadorCotizacion();
        if (document.getElementById('cotizacion-items')) renderCotizacionPage();
    }
}

function limpiarCotizacion() {
    if (confirm('¿Eliminar todos los productos de la cotización?')) {
        cotizacion = [];
        guardarCotizacion();
        actualizarContadorCotizacion();
        if (document.getElementById('cotizacion-items')) renderCotizacionPage();
        showNotification('🗑️ Cotización vacía');
    }
}

function actualizarContadorCotizacion() {
    const totalItems = cotizacion.reduce((acc, i) => acc + i.qty, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = totalItems;
    });
}

function showNotification(msg) {
    const notif = document.createElement('div');
    notif.textContent = msg;
    notif.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--primary);
        color: white;
        padding: 14px 32px;
        border-radius: 60px;
        font-weight: 600;
        z-index: 10001;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        animation: slideUp 0.3s ease;
    `;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2500);
}

// ==========================================
// WHATSAPP - VERSIÓN CORREGIDA (VACÍA EL CARRITO)
// ==========================================
function enviarCotizacionWhatsApp(nombre = '', telefono = '', zona = '', notas = '') {
    if (cotizacion.length === 0) {
        showNotification('❌ Agregá productos para cotizar');
        return;
    }

    // Generar mensaje
    let msg = '🚨 *NUEVA SOLICITUD DE COTIZACIÓN - ALEXCAM* 🚨%0A%0A';
    msg += '📋 *PRODUCTOS SELECCIONADOS:*%0A';
    msg += '─────────────────────%0A';

    cotizacion.forEach(item => {
        msg += `• ${item.name}%0A`;
        msg += `  Cantidad: ${item.qty}%0A`;
        if (item.resolucion) msg += `  Resolución: ${item.resolucion}%0A`;
        msg += `  ${item.desc.split('\n')[0]}%0A%0A`;
    });

    msg += '─────────────────────%0A%0A';
    msg += '👤 *DATOS DEL CLIENTE:*%0A';
    if (nombre) msg += `Nombre: ${nombre}%0A`;
    if (telefono) msg += `Teléfono: ${telefono}%0A`;
    if (zona) msg += `Zona: ${zona}%0A`;
    if (notas) msg += `%0A📝 *Notas:*%0A${notas}%0A%0A`;

    msg += '✅ *Gracias por contactarnos. Te responderemos a la brevedad.*';

    // Abrir WhatsApp
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');

    // 🟢 NUEVO: Vaciar carrito después de enviar
    setTimeout(() => {
        cotizacion = [];
        guardarCotizacion();
        actualizarContadorCotizacion();
        
        // Si estamos en la página de cotización, recargar la vista
        if (document.getElementById('cotizacion-items')) {
            renderCotizacionPage();
        }
        
        showNotification('🧹 Cotización enviada. Carrito limpio.');
    }, 1500); // Espera 1.5 segundos para que abra WhatsApp
}

// ==========================================
// HEADER Y FOOTER
// ==========================================
function loadHeader() {
    const placeholder = document.getElementById('header-placeholder');
    if (!placeholder) return;

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    placeholder.innerHTML = `
        <header>
            <div class="container navbar">
                <div class="logo-container" onclick="window.location.href='index.html'" style="cursor: pointer;">
                    <img src="images/logo-alexcam.png" alt="AlexCam" class="logo-img" onerror="this.src='https://via.placeholder.com/80x80/0a2540/ffffff?text=AC'">
                    <span class="logo-text">AlexCam</span>
                </div>
                <div class="nav-links">
                    <a href="index.html" class="${currentPage === 'index.html' ? 'active' : ''}">Inicio</a>
                    <a href="productos.html" class="${currentPage === 'productos.html' ? 'active' : ''}">Productos</a>
                    <a href="cotizacion.html" class="${currentPage === 'cotizacion.html' ? 'active' : ''}">Cotizar</a>
                    <a href="contacto.html" class="${currentPage === 'contacto.html' ? 'active' : ''}">Contacto</a>
                    <a href="admin.html" class="${currentPage === 'admin.html' ? 'active' : ''}">Admin</a>
                </div>
                <div class="cart-icon" onclick="window.location.href='cotizacion.html'">
                    <i class="fas fa-file-invoice"></i>
                    <span class="cart-count">0</span>
                </div>
            </div>
        </header>
    `;
    actualizarContadorCotizacion();
}

function loadFooter() {
    const placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return;

    placeholder.innerHTML = `
        <footer>
            <div class="container footer-grid">
                <div>
                    <h3 style="font-size: 1.8rem; margin-bottom: 16px;">AlexCam</h3>
                    <p style="opacity: 0.9;">Seguridad profesional con tecnología de punta.</p>
                </div>
                <div>
                    <h4><i class="fas fa-phone-alt"></i> Contacto directo</h4>
                    <p><i class="fas fa-phone"></i> +591 67866604</p>
                    <p><i class="fab fa-whatsapp"></i> +591 67866604</p>
                    <p><i class="fas fa-envelope"></i> alexserviciocharagua.com</p>
                </div>
                <div>
                    <h4><i class="fas fa-clock"></i> Horario</h4>
                    <p>Lunes a viernes: 8am - 6pm</p>
                    <p>Sábados: 9am - 2pm</p>
                    <p style="margin-top: 16px;"><i class="fas fa-map-marker-alt"></i> Charagua · Santa Cruz · Bolivia</p>
                </div>
            </div>
        </footer>
    `;
}

// ==========================================
// RENDERIZAR COTIZACIÓN
// ==========================================
function renderCotizacionPage() {
    const container = document.getElementById('cotizacion-items');
    if (!container) return;

    if (cotizacion.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 60px; background: white; border-radius: var(--radius-lg);">
                <i class="fas fa-file-invoice" style="font-size: 4rem; color: var(--gray-400); margin-bottom: 20px;"></i>
                <h3 style="margin-bottom: 16px; color: var(--gray-500);">No hay productos en tu cotización</h3>
                <a href="productos.html" class="btn-hero" style="display: inline-block; margin-top: 16px;">Ver productos</a>
            </div>
        `;
        return;
    }

    let html = '';
    cotizacion.forEach(item => {
        let categoryIcon = '📦';
        switch (item.category) {
            case 'kit': categoryIcon = '📦'; break;
            case 'camara': categoryIcon = '📹'; break;
            case 'dvr': categoryIcon = '💾'; break;
            case 'accesorio': categoryIcon = '🔌'; break;
            case 'internet': categoryIcon = '📡'; break;
            case 'rack': categoryIcon = '🗄️'; break;
            case 'servicio': categoryIcon = '🔧'; break;
        }

        html += `
            <div style="display: grid; grid-template-columns: 80px 1fr auto auto; gap: 20px; align-items: center; padding: 20px 0; border-bottom: 1px solid var(--gray-200);">
                <div style="width: 80px; height: 80px; background: var(--gray-100); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 2.5rem;">
                    ${categoryIcon}
                </div>
                <div>
                    <h4 style="margin-bottom: 6px; color: var(--primary);">${item.name}</h4>
                    <p style="color: var(--gray-500); font-size: 0.85rem; margin-bottom: 4px;">${item.desc.split('\n')[0]}</p>
                    ${item.resolucion ? `<p style="color: var(--accent); font-size: 0.8rem; font-weight: 600;">🔹 Resolución: ${item.resolucion}</p>` : ''}
                </div>
                <div style="display: flex; align-items: center; gap: 12px; background: var(--gray-100); padding: 8px 16px; border-radius: 40px;">
                    <button onclick="actualizarCantidad(${item.id}, -1); renderCotizacionPage();" style="background: white; border: 1px solid var(--gray-300); width: 32px; height: 32px; border-radius: 50%; cursor: pointer;">−</button>
                    <span style="font-weight: 700; min-width: 30px; text-align: center;">${item.qty}</span>
                    <button onclick="actualizarCantidad(${item.id}, 1); renderCotizacionPage();" style="background: white; border: 1px solid var(--gray-300); width: 32px; height: 32px; border-radius: 50%; cursor: pointer;">+</button>
                </div>
                <button onclick="eliminarDeCotizacion(${item.id}); renderCotizacionPage();" style="background: none; border: none; color: #c23b3b; font-size: 1.3rem; cursor: pointer;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });

    container.innerHTML = html;
}

// ==========================================
// FILTROS
// ==========================================
function initFiltros() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        const nuevoBtn = btn.cloneNode(true);
        if (btn.parentNode) btn.parentNode.replaceChild(nuevoBtn, btn);
    });

    const nuevosBtns = document.querySelectorAll('.filter-btn');

    nuevosBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            nuevosBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderProductos('productos-grid', this.dataset.filter);
        });
    });

    const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
    if (allBtn && !document.querySelector('.filter-btn.active')) allBtn.classList.add('active');
}

// ==========================================
// FORMULARIO DE CONTACTO
// ==========================================
function initContactoForm() {
    const btn = document.getElementById('enviar-cotizacion-wa');
    if (!btn) return;
    btn.addEventListener('click', () => {
        const nombre = document.getElementById('contacto-nombre')?.value || '';
        const telefono = document.getElementById('contacto-telefono')?.value || '';
        const zona = document.getElementById('contacto-zona')?.value || '';
        const notas = document.getElementById('contacto-notas')?.value || '';
        enviarCotizacionWhatsApp(nombre, telefono, zona, notas);
    });
}

// ==========================================
// INICIALIZACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Iniciando AlexCam - Versión actualizada');

    if (typeof loadHeader === 'function') loadHeader();
    if (typeof loadFooter === 'function') loadFooter();

    await cargarProductosDesdeJSON();

    const path = window.location.pathname.split('/').pop() || 'index.html';

    if (path === 'cotizacion.html') renderCotizacionPage();
    if (path === 'contacto.html') initContactoForm();

    actualizarContadorCotizacion();
    console.log('✅ AlexCam inicializado correctamente');
});

// ==========================================
// EXPORTAR FUNCIONES
// ==========================================
window.agregarACotizacion = agregarACotizacion;
window.eliminarDeCotizacion = eliminarDeCotizacion;
window.actualizarCantidad = actualizarCantidad;
window.limpiarCotizacion = limpiarCotizacion;
window.enviarCotizacionWhatsApp = enviarCotizacionWhatsApp;
window.renderProductos = renderProductos;
window.renderCotizacionPage = renderCotizacionPage;
window.initFiltros = initFiltros;
window.cargarProductosDesdeJSON = cargarProductosDesdeJSON;
window.renderKitsDestacados = renderKitsDestacados;
window.renderServiciosGrid = renderServiciosGrid;
window.crearModalResolucion = crearModalResolucion;
window.seleccionarResolucion = seleccionarResolucion;
window.cerrarModalResolucion = cerrarModalResolucion;
window.loadFooter = loadFooter;
window.loadHeader = loadHeader;
window.actualizarContadorCotizacion = actualizarContadorCotizacion;
window.showNotification = showNotification;