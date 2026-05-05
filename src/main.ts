import { createClient } from '@supabase/supabase-js'

// جلب الإعدادات من ملف .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// تحديد العناصر من الواجهة
const form = document.querySelector<HTMLFormElement>('#tmcForm');
const dataBody = document.querySelector<HTMLTableSectionElement>('#dataBody');

// وظيفة لجلب البيانات وعرضها في الجدول
async function fetchTmcData() {
    const { data, error } = await supabase
        .from('tmc')
        .select('*')
        .order('created_at', { ascending: false }); // ترتيب الأحدث أولاً

    if (error) {
        console.error('Error fetching data:', error.message);
        return;
    }

    if (dataBody) {
        dataBody.innerHTML = ''; // مسح الجدول قبل إعادة التعبئة
        data.forEach((row: any) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.program}</td>
                <td>${row.initiative}</td>
                <td>${row.startdate}</td>
            `;
            dataBody.appendChild(tr);
        });
    }
}

// معالجة إرسال النموذج
form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const programInput = document.querySelector<HTMLInputElement>('#program');
    const initiativeInput = document.querySelector<HTMLInputElement>('#initiative');
    const dateInput = document.querySelector<HTMLInputElement>('#startdate');

    if (programInput && initiativeInput && dateInput) {
        const { error } = await supabase
            .from('tmc')
            .insert([{
                program: programInput.value,
                initiative: initiativeInput.value,
                startdate: dateInput.value
            }]);

        if (error) {
            alert('خطأ في الإضافة: ' + error.message);
        } else {
            alert('تمت الإضافة بنجاح!');
            form.reset();
            fetchTmcData(); // تحديث الجدول فوراً بعد الإضافة
        }
    }
});

// تشغيل جلب البيانات عند تحميل الصفحة لأول مرة
fetchTmcData();