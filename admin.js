// ==========================================
// ALEXCAM · ADMIN.JS - 91 PRODUCTOS
// Gestión de catálogo SIN PRECIOS
// 7 categorías: Kits, Cámaras, DVR, Accesorios, Internet, Racks, Servicios
// ==========================================

let productosData = [];
let currentFilter = 'all';

// ==========================================
// 1. CARGAR PRODUCTOS DESDE JSON
// ==========================================
async function cargarProductosAdmin() {
    try {
        const response = await fetch('data/productos.json');
        const data = await response.json();
        productosData = data.productos;
        console.log(`✅ ${productosData.length} productos cargados en el panel`);

        // Actualizar estadísticas de categorías
        const kits = productosData.filter(p => p.category === 'kit').length;
        const camaras = productosData.filter(p => p.category === 'camara').length;
        const dvr = productosData.filter(p => p.category === 'dvr').length;
        const accesorios = productosData.filter(p => p.category === 'accesorio').length;
        const internet = productosData.filter(p => p.category === 'internet').length;
        const racks = productosData.filter(p => p.category === 'rack').length;
        const servicios = productosData.filter(p => p.category === 'servicio').length;

        console.log(`📊 Distribución: Kits:${kits} Cámaras:${camaras} DVR:${dvr} Acc:${accesorios} Internet:${internet} Racks:${racks} Servicios:${servicios}`);

        renderizarTabla();
        actualizarEstadisticas();
        initFiltrosAdmin();

    } catch (error) {
        console.error('Error cargando productos:', error);
        alert('❌ Error al cargar los productos. Verificá que exista data/productos.json');
    }
}

// ==========================================
// 2. RENDERIZAR TABLA (SIN PRECIOS)
// ==========================================
function renderizarTabla() {
    const tbody = document.getElementById('productos-tbody');
    if (!tbody) return;

    let filtered = [...productosData];

    // Aplicar filtros
    if (currentFilter !== 'all') {
        if (currentFilter === 'active') {
            filtered = filtered.filter(p => p.active === true);
        } else if (currentFilter === 'inactive') {
            filtered = filtered.filter(p => p.active === false);
        } else {
            filtered = filtered.filter(p => p.category === currentFilter);
        }
    }

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr>
            <td colspan="6" style="text-align: center; padding: 60px;">
                <i class="fas fa-box-open" style="font-size: 3rem; color: var(--gray-400);"></i>
                <p style="margin-top: 16px; color: var(--gray-500);">No hay productos en esta categoría</p>
            </td>
        </tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(p => {
        let categoryClass = '';
        let categoryName = '';

        switch (p.category) {
            case 'kit':
                categoryClass = 'category-kit';
                categoryName = '📦 KIT';
                break;
            case 'camara':
                categoryClass = 'category-camara';
                categoryName = '📹 CÁMARA';
                break;
            case 'dvr':
                categoryClass = 'category-dvr';
                categoryName = '💾 DVR/NVR';
                break;
            case 'accesorio':
                categoryClass = 'category-accesorio';
                categoryName = '🔌 ACCESORIO';
                break;
            case 'internet':
                categoryClass = 'category-internet';
                categoryName = '📡 INTERNET';
                break;
            case 'rack':
                categoryClass = 'category-rack';
                categoryName = '🗄️ RACK';
                break;
            case 'servicio':
                categoryClass = 'category-servicio';
                categoryName = '🔧 SERVICIO';
                break;
            default:
                categoryClass = '';
                categoryName = p.category;
        }

        return `
        <tr>
            <td style="font-weight: 600; color: var(--gray-500);">${p.id}</td>
            <td>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 40px; height: 40px; background: var(--gray-100); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                        ${p.icon || '📦'}
                    </div>
                    <div>
                        <strong style="color: var(--primary);">${p.name}</strong>
                        <div style="font-size: 0.8rem; color: var(--gray-400);">${p.desc.substring(0, 50)}...</div>
                    </div>
                </div>
            </td>
            <td>
                <span class="category-badge ${categoryClass}">${categoryName}</span>
            </td>
            <td>
                <input type="text" id="badge-${p.id}" value="${p.badge || ''}" placeholder="Ej: Recomendado" style="padding: 8px 12px; border: 1.5px solid var(--gray-200); border-radius: var(--radius-md); width: 120px;">
            </td>
            <td>
                <label class="status-badge ${p.active ? 'status-active' : 'status-inactive'}" style="display: inline-flex; align-items: center; gap: 8px; cursor: pointer;">
                    <input type="checkbox" id="active-${p.id}" ${p.active ? 'checked' : ''} style="width: 16px; height: 16px;" onchange="toggleProductStatus(${p.id}, this.checked)">
                    <span>${p.active ? 'Activo' : 'Inactivo'}</span>
                </label>
            </td>
            <td>
                <div style="display: flex; gap: 8px;">
                    <button onclick="window.open('images/${p.img}', '_blank')" style="background: none; border: none; color: var(--accent); cursor: pointer; font-size: 1.2rem;" title="Ver imagen">
                        <i class="fas fa-image"></i>
                    </button>
                    <button onclick="editarProducto(${p.id})" style="background: none; border: none; color: var(--primary); cursor: pointer; font-size: 1.2rem;" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="duplicarProducto(${p.id})" style="background: none; border: none; color: var(--gray-500); cursor: pointer; font-size: 1.2rem;" title="Duplicar">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>
            </td>
        </tr>
    `}).join('');
}

// ==========================================
// 3. ACTUALIZAR ESTADÍSTICAS
// ==========================================
function actualizarEstadisticas() {
    const total = productosData.length;
    const activos = productosData.filter(p => p.active).length;
    const inactivos = total - activos;

    document.getElementById('total-productos').textContent = total;
    document.getElementById('total-activos').textContent = activos;
    document.getElementById('total-inactivos').textContent = inactivos;
    document.getElementById('total-categorias').textContent = '7';
}

// ==========================================
// 4. CAMBIAR ESTADO DEL PRODUCTO
// ==========================================
window.toggleProductStatus = function (id, checked) {
    const producto = productosData.find(p => p.id === id);
    if (producto) {
        producto.active = checked;
        console.log(`🔄 Producto ${id}: ${producto.name} - ${checked ? 'Activado' : 'Desactivado'}`);
    }
};

// ==========================================
// 5. EDITAR PRODUCTO (MODAL SIMPLE)
// ==========================================
window.editarProducto = function (id) {
    const producto = productosData.find(p => p.id === id);
    if (!producto) return;

    const nuevoNombre = prompt('Editar nombre del producto:', producto.name);
    if (nuevoNombre && nuevoNombre.trim() !== '') {
        producto.name = nuevoNombre.trim();
    }

    const nuevaDesc = prompt('Editar descripción:', producto.desc);
    if (nuevaDesc && nuevaDesc.trim() !== '') {
        producto.desc = nuevaDesc.trim();
    }

    renderizarTabla();
    showNotification('✅ Producto actualizado');
};

// ==========================================
// 6. DUPLICAR PRODUCTO
// ==========================================
window.duplicarProducto = function (id) {
    const producto = productosData.find(p => p.id === id);
    if (producto) {
        const newId = Math.max(...productosData.map(p => p.id)) + 1;
        const nuevoProducto = {
            ...producto,
            id: newId,
            name: `${producto.name} (copia)`,
            active: false,
            badge: 'Nuevo'
        };

        productosData.push(nuevoProducto);
        renderizarTabla();
        actualizarEstadisticas();
        showNotification('✅ Producto duplicado');
    }
};

// ==========================================
// 7. AGREGAR PRODUCTO NUEVO
// ==========================================
window.agregarProductoNuevo = function () {
    const newId = Math.max(...productosData.map(p => p.id), 91) + 1;

    const categoria = prompt('Categoría del producto:\n1. kit\n2. camara\n3. dvr\n4. accesorio\n5. internet\n6. rack\n7. servicio', 'kit');
    let category = 'kit';

    switch (categoria) {
        case '2': category = 'camara'; break;
        case '3': category = 'dvr'; break;
        case '4': category = 'accesorio'; break;
        case '5': category = 'internet'; break;
        case '6': category = 'rack'; break;
        case '7': category = 'servicio'; break;
    }

    const nuevoProducto = {
        id: newId,
        name: "Producto Nuevo",
        category: category,
        desc: "Descripción del producto",
        img: `${category}/placeholder.jpg`,
        icon: "📦",
        badge: "Nuevo",
        active: true
    };

    productosData.push(nuevoProducto);
    renderizarTabla();
    actualizarEstadisticas();
    showNotification('✅ Producto agregado. Completá los datos.');
};

// ==========================================
// 8. GUARDAR CAMBIOS
// ==========================================
async function guardarCambios() {
    // Actualizar badges desde inputs
    productosData.forEach(p => {
        const badgeInput = document.getElementById(`badge-${p.id}`);
        if (badgeInput) {
            p.badge = badgeInput.value || '';
        }
    });

    const dataToSave = {
        productos: productosData,
        config: {
            whatsapp_number: "584121234567",
            empresa: "AlexCam",
            email: "ventas@alexcam.com",
            horario: "Lunes a viernes 8am-6pm",
            cobertura: "Caracas · Valencia · Maracaibo · Todo el país"
        }
    };

    const btn = document.querySelector('.save-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';
    btn.disabled = true;

    try {
        localStorage.setItem('alexcam_productos_backup', JSON.stringify(dataToSave));

        const dataStr = JSON.stringify(dataToSave, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'productos-alexcam-actualizado.json';
        a.click();

        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Guardado! Archivo descargado';
            btn.style.background = '#1e8f5e';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = 'var(--primary)';
                btn.disabled = false;
            }, 2000);
        }, 1000);

        actualizarEstadisticas();
        showNotification('✅ Cambios guardados correctamente');

    } catch (error) {
        console.error('Error al guardar:', error);
        btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
        btn.style.background = '#c23b3b';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = 'var(--primary)';
            btn.disabled = false;
        }, 2000);
    }
}

// ==========================================
// 9. EXPORTAR CATÁLOGO
// ==========================================
window.exportarCatalogo = function () {
    const activos = productosData.filter(p => p.active);

    let texto = "📹 ALEXCAM - CATÁLOGO DE PRODUCTOS\n";
    texto += "====================================\n\n";
    texto += `📅 Fecha: ${new Date().toLocaleDateString()}\n`;
    texto += `📦 Total productos: ${productosData.length}\n`;
    texto += `✅ Activos: ${activos.length}\n\n`;

    const categorias = ['kit', 'camara', 'dvr', 'accesorio', 'internet', 'rack', 'servicio'];
    const nombresCat = {
        kit: '📦 KITS COMPLETOS',
        camara: '📹 CÁMARAS',
        dvr: '💾 GRABADORES',
        accesorio: '🔌 ACCESORIOS',
        internet: '📡 INTERNET / WIFI',
        rack: '🗄️ RACKS Y GABINETES',
        servicio: '🔧 SERVICIOS PROFESIONALES'
    };

    categorias.forEach(cat => {
        const items = activos.filter(p => p.category === cat);
        if (items.length > 0) {
            texto += `\n${nombresCat[cat]}\n`;
            texto += `────────────────────\n`;
            items.forEach(p => {
                texto += `• ${p.name}\n`;
                texto += `  ${p.desc}\n`;
                if (p.badge) texto += `  🏷️ ${p.badge}\n`;
                texto += '\n';
            });
        }
    });

    texto += "\n====================================\n";
    texto += "🔐 Panel de administración AlexCam\n";
    texto += "📞 WhatsApp: +591 67866604\n";

    const blob = new Blob([texto], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alexcam-catalogo-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();

    setTimeout(() => URL.revokeObjectURL(url), 100);
    showNotification('📁 Catálogo exportado');
};

// ==========================================
// 10. FILTROS DEL PANEL
// ==========================================
function initFiltrosAdmin() {
    const filterBtns = document.querySelectorAll('.admin-filters .filter-btn');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            renderizarTabla();
        });
    });
}

// ==========================================
// 11. NOTIFICACIONES
// ==========================================
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
        z-index: 9999;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        animation: slideUp 0.3s ease;
    `;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

// ==========================================
// 12. INICIALIZAR
// ==========================================
window.cargarProductosAdmin = cargarProductosAdmin;
window.guardarCambios = guardarCambios;
window.agregarProductoNuevo = agregarProductoNuevo;
window.duplicarProducto = duplicarProducto;
window.editarProducto = editarProducto;
window.toggleProductStatus = toggleProductStatus;
window.showNotification = showNotification;