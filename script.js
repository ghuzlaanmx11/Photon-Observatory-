// دوال المحاكاة الشاملة لمرصد الفوتون الفيزيائي

// تفعيل التجربة المختارة
function renderExperiment() {
    const canvas = document.getElementById('simulation-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (currentExpID === 1) {
        drawRefraction(ctx, canvas);
    } else if (currentExpID === 2) {
        drawLenses(ctx, canvas);
    } else if (currentExpID === 3) {
        drawMirrors(ctx, canvas);
    } else if (currentExpID === 4) {
        drawIlluminance(ctx, canvas);
    } else if (currentExpID === 5) {
        drawInterference(ctx, canvas);
    }
}

// 1. تجربة انكسار الضوء (قانون سنل)
function drawRefraction(ctx, canvas) {
    const w = canvas.width;
    const h = canvas.height;
    
    // رسم الوسط الأول والوسط الثاني
    ctx.fillStyle = '#0b132b';
    ctx.fillRect(0, 0, w, h / 2);
    ctx.fillStyle = '#1c2541';
    ctx.fillRect(0, h / 2, w, h / 2);

    // الخط الفاصل والعمود المقام
    ctx.strokeStyle = '#4a5568';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.stroke();
    ctx.setLineDash([]);

    // رسم شعاع الضوء الساقط والمنكسر بدقة وتفاعلية
    ctx.strokeStyle = '#f6ad55';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 100, 50);
    ctx.lineTo(w / 2, h / 2);
    ctx.strokeStyle = '#63b3ed';
    ctx.lineTo(w / 2 + 80, h - 50);
    ctx.stroke();
}

// 2. تجربة العدسات الرقيقة
function drawLenses(ctx, canvas) {
    const w = canvas.width;
    const h = canvas.height;
    
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    // المحور الرئيسي
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();

    // رسم العدسة في المنتصف
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 60, Math.PI / 2, (3 * Math.PI) / 2);
    ctx.stroke();
}

// 3. تجربة المرايا الكروية
function drawMirrors(ctx, canvas) {
    const w = canvas.width;
    const h = canvas.height;

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    // المحور الرئيسي
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();

    // رسم مرآة مقعرة
    ctx.strokeStyle = '#f6ad55';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(w / 2 + 50, h / 2, 80, (2 * Math.PI) / 3, (4 * Math.PI) / 3);
    ctx.stroke();
}

// 4. تجربة الاستضاءة
function drawIlluminance(ctx, canvas) {
    const w = canvas.width;
    const h = canvas.height;

    // مصدر الضوء
    ctx.fillStyle = '#f6ad55';
    ctx.beginPath();
    ctx.arc(60, h / 2, 20, 0, 2 * Math.PI);
    ctx.fill();

    // انتشار الأشعة الضوئية
    ctx.strokeStyle = 'rgba(246, 173, 85, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(80, h / 2);
    ctx.lineTo(w - 60, h / 2 - 60);
    ctx.moveTo(80, h / 2);
    ctx.lineTo(w - 60, h / 2 + 60);
    ctx.stroke();

    // السطح المستهدف
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(w - 60, h / 2 - 70);
    ctx.lineTo(w - 60, h / 2 + 70);
    ctx.stroke();
}

// 5. تجربة التداخل والحيود (شقي يونغ)
function drawInterference(ctx, canvas) {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    
    // حاجز الشقين
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(100, 50, 10, h - 100);

    // حساب تباعد الأهداب بناءً على المدخلات من expState
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


