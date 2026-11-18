const search = document.querySelector('.faq-search');
const query = document.getElementById('faq-query');
const status = document.getElementById('faq-status');
const entries = [...document.querySelectorAll('.faq-list details')];

const normalize = text => text.normalize('NFKC').toLowerCase().replace(/\s+/g, '');
const searchable = entries.map(entry => normalize(entry.textContent));

function filterFaq() {
  const words = query.value.trim().split(/\s+/).map(normalize).filter(Boolean);
  let matches = 0;
  entries.forEach((entry, index) => {
    const visible = words.every(word => searchable[index].includes(word));
    entry.hidden = !visible;
    if (visible) matches++;
  });
  status.textContent = matches ? `${matches}개 질문` : '검색 결과가 없습니다. 다른 검색어를 입력해 주세요.';
}

query.addEventListener('input', filterFaq);
filterFaq();
search.hidden = false;
