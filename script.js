let currentTab = 'home';
let currentExpId = 1;
let notebookData = [];

let expState = {
    1: { n1: 1.0, n2: 1.5, angle: 45 },
    2: { type: 'convex', f: 50, do: 120, ho: 40 },
    3: { type: 'concave', f: 40, do: 90 },
    4: { power: 2000, distance: 2.0 },
    5: { wavelength: 550, d: 0.5, L: 2.0 }
};

function switchTab(tabId) {
    currentTab = tabId;
    const navHome = document.getElementById('tab-home');
    const navLab = document.getElementById('tab-lab');
    const navLaws = document.getElementById('tab-laws');
    const navNotebook = document.getElementById('tab-notebook');
    const navReference = document.getElementById('tab-references');

    if (navHome) navHome.className = 'px-4 py-2 rounded-xl text-sm font-medium';
    if (navLab) navLab.className = 'px-4 py-2 rounded-xl text-sm font-medium';
    if (navLaws) navLaws.className = 'px-4 py-2 rounded-xl text-sm font-medium';
    if (navNotebook) navNotebook.className = 'px-4 py-2 rounded-xl text-sm font-medium';
    if (navReference) navReference.className = 'px-4 py-2 rounded-xl text-sm font-medium';

    document.getElementById(`tab-${tabId}`).className = 'px-4 py-2 rounded-xl text-sm font-medium bg-amber-500 text-slate-950 shadow-lg';
    
    if (tabId === 'lab') {
        renderExperiment();
    } else if (tabId === 'laws') {
        renderLaws();
    }
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

function switchExpId(id) {
    currentExpId = id;
    for (let i = 1; i <= 5; i++) {
        const btn = document.getElementById(`btn-exp-${i}`);
        if (i === id) {
            btn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-amber-500 text-slate-950 shadow-md';
        } else {
            btn.className = 'px-4 py-2 rounded-xl text-sm font-medium bg-slate-800 text-slate-300 hover:bg-slate-700';
        }
    }
    renderExperiment();
}

function resetCurrentExp() {
    if (currentExpId === 1) expState[1] = { n1: 1.0, n2: 1.5, angle: 45 };
    if (currentExpId === 2) expState[2] = { type: 'convex', f: 50, do: 120, ho: 40 };
    if (currentExpId === 3) expState[3] = { type: 'concave', f: 40, do: 90 };
    if (currentExpId === 4) expState[4] = { power: 2000, distance: 2.0 };
    if (currentExpId === 5) expState[5] = { wavelength: 550, d: 0.5, L: 2.0 };
    renderExperiment();
}

function renderExperiment() {
    const controlsDiv = document.getElementById('exp-controls');
    const stepsDiv = document.getElementById('exp-steps');
    const expDiv = document.getElementById('exp-explanation');
    const titleDiv = document.getElementById('exp-title');

    controlsDiv.innerHTML = '';
    stepsDiv.innerHTML = '';

    if (currentExpId === 1) {
        titleDiv.innerHTML = '<i class="fas fa-solid fa-angle-right text-amber-400"></i> قانون سنيل لإنكسار الضوء';
        expDiv.innerHTML = 'يصف قانون سنيل كيفية انحراف الضوء عند انتقاله بين وسطين شفافين بمعاملات انكسار مختلفة.';
        
        controlsDiv.innerHTML = `
            <div>
                <label class="text-xs text-gray-400">معامل انكسار الوسط الأول (n1)</label>
                <input type="range" min="1.0" max="2.0" step="0.1" value="${expState[1].n1}" oninput="updateExp1('n1', this.value)" class="w-full accent-amber-500">
            </div>
            <div>
                <label class="text-xs text-gray-400">معامل انكسار الوسط الثاني (n2)</label>
                <input type="range" min="1.0" max="2.0" step="0.1" value="${expState[1].n2}" oninput="updateExp1('n2', this.value)" class="w-full accent-amber-500">
            </div>
            <div>
                <label class="text-xs text-gray-400">زاوية السقوط (°)</label>
                <input type="range" min="0" max="90" step="1" value="${expState[1].angle}" oninput="updateExp1('angle', this.value)" class="w-full accent-amber-500">
            </div>
        `;
    } else if (currentExpId === 5) {
        titleDiv.innerHTML = '<i class="fas fa-solid fa-wave-square text-amber-400"></i> التداخل والحيود (تجربة يونغ)';
        expDiv.innerHTML = 'دراسة تداخل الضوء ونمط الأهداب المضيئة والمظلمة الناتجة من شقين مزدوجين.';
        
        controlsDiv.innerHTML = `
            <div>
                <label class="text-xs text-gray-400">الطول الموجي (نانومتر)</label>
                <input type="range" min="400" max="700" step="10" value="${expState[5].wavelength}" oninput="updateExp5('wavelength', this.value)" class="w-full accent-amber-500">
            </div>
            <div>
                <label class="text-xs text-gray-400">المسافة بين الشقين (مم)</label>
                <input type="range" min="0.1" max="2.0" step="0.1" value="${expState[5].d}" oninput="updateExp5('d', this.value)" class="w-full accent-amber-500">
            </div>
        `;
    }
    drawSimulation();
}

function updateExp1(param, val) {
    expState[1][param] = parseFloat(val);
    drawSimulation();
}

function updateExp5(param, val) {
    expState[5][param] = parseFloat(val);
    drawSimulation();
}

function drawSimulation() {
    const canvas = document.getElementById('simCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (currentExpId === 1) {
        drawRefraction(ctx, canvas);
    } else if (currentExpId === 5) {
        drawInterference(ctx, canvas);
    }
}

function drawRefraction(ctx, canvas) {
    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = '#0b132b';
    ctx.fillRect(0, 0, w, h / 2);
    ctx.fillStyle = '#1c2541';
    ctx.fillRect(0, h / 2, w, h / 2);

    // رسم شعاع السقوط والانكسار البسيط
    ctx.strokeStyle = '#f6ad55';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 100, 50);
    ctx.lineTo(w / 2, h / 2);
    ctx.lineTo(w / 2 + 100, h - 50);
    ctx.stroke();
}

function drawInterference(ctx, canvas) {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    
    // حاجز الشقين
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(100, 50, 10, h - 100);

    // حساب تباعد الأهداب بناءً على المدخلات المحدثة
    const fringeSpacing = (expState[5].wavelength * (h - 100)) / (expState[5].d * 1000); 

    for (let i = 0; i < 10; i++) {
        let alpha = Math.abs(Math.sin(i * fringeSpacing / 20));
        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(w - 80, 50 + i * fringeSpacing);
        ctx.lineTo(w - 80, 50 + i * fringeSpacing + 20);
        ctx.stroke();
    }
}

function renderLaws() {
    // عرض القوانين إذا احتجت لتعبئتها
}
