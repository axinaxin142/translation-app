const TRANSLATE_URL = 'https://libretranslate.com/translate';

async function translateText() {
    const sourceText = document.getElementById('sourceText').value;
    const sourceLang = document.getElementById('sourceLang').value;
    const targetLang = document.getElementById('targetLang').value;
    const resultDiv = document.getElementById('result');

    if (!sourceText) {
        alert('စာသားရိုက်ထည့်ပါ');
        return;
    }

    try {
        const response = await fetch(TRANSLATE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: sourceText,
                source: sourceLang === 'auto' ? 'en' : sourceLang, // Auto detect အတွက်
                target: targetLang,
                format: 'text'
            })
        });

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        
        const translatedText = data.translatedText;
        resultDiv.innerHTML = translatedText;
    } catch (error) {
        resultDiv.innerHTML = `အမှား: ${error.message}`;
    }
}

function copyResult() {
    const result = document.getElementById('result');
    navigator.clipboard.writeText(result.innerText)
        .then(() => alert('ပြန်ဆိုချက်ကို ကူးယူပြီးပါပြီ!'))
        .catch(err => alert('ပြန်ဆိုချက် ကူးယူရာတွင် အမှားတစ်ခုဖြစ်နေပါသည်'));
}