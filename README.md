# 임대리 브랜드 웹사이트

이 파일 하나에서 구현 정보, 실행·배포 방법, 교체할 항목, 업데이트 이력을 관리합니다.

## 프로젝트 상태

- 제작일: 2026-10-22 (한국 시간)
- 도메인: https://rentwalleet.com
- 저장소: https://github.com/rentwalleet/rentwalleet-website.git
- 운영 대상: Windows 11 / VS Code / Cloudflare Pages
- 최종 작업 경로: `C:\Users\user\Documents\Codex\Projects\rentwalleet\rentwalleet-web`
- 현재 생성 위치: `C:\Users\user\Documents\Codex\Projects\rentwalleet\Images\rentwalleet-web`
- 경로 차이 사유: 현재 세션이 `Images` 하위에만 쓰기를 허용합니다. 최종 폴더로 이동 전 기존 파일을 확인하세요. 기존 최종 폴더는 확인 시 비어 있었습니다.
- 원격 push: 미완료. GitHub 커넥터가 저장소에 `push: false`를 반환했고, 터미널 GitHub 연결은 네트워크 오류로 실패했습니다.
- 브라우저 육안 검증: 미완료. 미리보기 브라우저가 세션 오류를 반환했습니다. 실제 PC/모바일 화면 확인이 남아 있습니다.

## 구성 및 디자인

의존성 없는 HTML/CSS/JavaScript 정적 사이트입니다. Node.js는 로컬 서버와 파일 복사 빌드에만 필요하며, 런타임 npm 패키지나 백엔드는 없습니다. 검색엔진이 JavaScript 없이 본문을 읽을 수 있습니다.

메뉴 없이 로고와 앱 다운로드 버튼만 표시하는 헤더를 사용합니다. 페이지 순서는 다음과 같습니다.

1. 단색 슬라이드 배너 2개: 월세 카드결제 / 친구 초대 리워드
2. 월세 카드결제·리워드·통합 관리 소개
3. 복수 카드 결제 및 할부 안내
4. 친구 초대 포인트와 제휴몰 사용
5. PC 배경 고정 이미지 섹션
6. 계약·결제·송금 관리 앱 화면
7. 조건부 월세 세액공제 안내
8. 계약 등록 → 심사·결제 → 송금 절차
9. FAQ
10. Google Play / App Store 다운로드 영역
11. 회사 정보·고객센터·SNS·약관 푸터

브랜드 포인트는 `#ff6b29`입니다. Pretendard Variable v1.3.9를 로컬에서 제공하며 SIL Open Font License 원문은 `public/assets/Pretendard-LICENSE.txt`에 포함했습니다. 큰 제목과 넓은 여백, 절제한 둥근 모서리, 앱 목업을 중심으로 구성했습니다. PC 주요 제목은 54~76px, 모바일은 약 36~48px, 주요 버튼은 높이 51~60px입니다.

자료 활용: 임대리 브랜드 로고, 앱 아이콘, 회사 로고, 앱 홈·마이·계약관리 목업, 소개서 배경 이미지. 웹용 크기로 리사이즈했습니다. 사업자등록증의 회사명·대표자·사업자번호·사업장 주소를 반영했습니다. 사업자등록증 PDF, 제안서 원본 및 명함 샘플 원본은 공개 파일에 포함하지 않았습니다.

## 실행과 빌드

Node.js 20 이상을 설치하고 프로젝트 폴더에서 실행합니다. `npm install`은 필요 없습니다.

```powershell
npm run dev
```

브라우저에서 http://127.0.0.1:4173 을 여세요. 상대경로와 약관 페이지 때문에 `index.html`을 더블클릭하는 대신 로컬 서버로 확인하세요.

```powershell
npm run check
npm run build
npm run preview
```

`public/`이 원본, `dist/`가 배포 결과입니다. `dist/`는 Git에서 제외합니다. `npm run build`는 정적 파일을 복사하고 JSON-LD의 CSP 해시를 갱신합니다. `npm run check`는 이미지/폰트/내부 링크/앵커, 기본 SEO, 비공개 가격의 텍스트 유입을 검사합니다. 이미지는 OCR 검사가 아니므로 새 목업 추가 시 가격·개인정보 포함 여부도 직접 확인하세요.

| 파일 | 역할 |
| --- | --- |
| `public/index.html` | 랜딩 페이지 본문, 앱·SNS 링크, SEO |
| `public/styles.css` | 반응형 스타일, 배경 고정 효과 |
| `public/app.js` | 배너, 카카오 상담 안내, 앱 주소 설정 |
| `public/terms/index.html` | 제공된 이용약관 원문 |
| `public/privacy/index.html` | 제공된 개인정보처리방침 원문 |
| `public/assets/` | 로고·앱 목업·배경·폰트·공유 이미지 |
| `public/robots.txt`, `public/sitemap.xml` | 검색엔진 크롤링 설정 |
| `public/_headers` | Cloudflare Pages 보안·캐시 헤더 |
| `public/404.html` | 실제 404 응답용 페이지 |

## 임시 주소 및 이미지 교체

- 앱 주소: `public/app.js` 상단 `STORE_URLS`와 `public/index.html`의 `data-store` 링크를 함께 수정합니다. 현재 사용자 지정 자사 앱 드림페이로 연결됩니다. 출시 전임을 화면과 FAQ에 표시했습니다. 임대리로 교체한 뒤 해당 임시 연결 안내도 변경하세요.
- 카카오: `public/app.js`의 `KAKAO_URL`에 실제 채널 URL을 입력합니다. 비어 있으면 준비 중 dialog와 고객센터 번호를 표시합니다. 샘플 아이콘은 `floating-kakao.svg`, `floating-download.svg`입니다.
- 플로팅 다운로드: 하단 `#download` 영역으로 이동합니다.
- SNS: `public/index.html`의 `.social-links`에서 Instagram·YouTube·Blog·Facebook 주소와 기본 SVG 아이콘을 변경합니다. 현재 제공된 임시 계정 주소를 사용합니다.
- 상단 배너: `public/index.html`에서 각 `.hero-slide`의 `--slide-bg`가 단색 코드입니다. PC 권장 2560×1440px (최소 1920×1080px), 모바일 별도 1080×1440px. 실제 이미지에 텍스트를 합성하기보다 HTML 제목을 유지하세요. 교체 위치와 크기는 코드에도 주석으로 남겼습니다.
- 배경 고정: `public/styles.css`의 `.lifestyle`. 첨부된 인물 배경 이미지를 사용했습니다. 모바일 및 동작 줄이기 설정에서는 고정을 해제합니다.
- 공유 이미지: `public/assets/og-image.png`, 1200×630px. 로고·앱 아이콘과 문구를 조합한 기본 이미지입니다.
- 배너는 기본 수동입니다. 재생 버튼으로 6.5초 자동 전환을 시작할 수 있고 포커스·호버·비활성 탭에서는 정지합니다.

## 콘텐츠 기준

- 서비스 수수료율은 HTML, JavaScript, 주석 및 공개 문서에 기재하지 않습니다. 소개서 PDF 자체도 배포하지 않습니다.
- 리워드는 추천 코드로 연결된 회원의 결제에 따른 포인트 적립과 제휴몰 사용을 안내합니다. 과도한 적립률·수익 보장은 하지 않습니다.
- 무이자 할부, 실적, 카드 혜택은 카드사·상품 정책에 따른다는 문구를 함께 표시합니다.
- 월세 세액공제는 '최대 17%'와 함께 소득·주택·계약 등 요건 및 개인별 차이를 표시합니다.
- 약관 TXT는 임의로 법적 문구를 변경하지 않고 HTML 문자만 이스케이프하여 원문을 반영했습니다. 이용약관 부칙의 `<사이트 개설일>`은 제공된 원문의 미확정 값입니다. 실제 시행일 확정 후 수정하세요. 개인정보처리방침의 수탁자 목록·쿠키 설명·담당 연락처는 제공 원문 그대로이며 실제 운영 내용과 일치하는지 최종 확인이 필요합니다.

## 로컬 경로 이동 및 GitHub main push

현재 세션에서는 상위 폴더에 쓸 수 없습니다. VS Code/ChatGPT에서 최종 프로젝트 폴더를 작업 폴더로 열면 후속 수정은 그 위치에서 진행할 수 있습니다. 직접 옮기려면 현재 생성 폴더의 전체 내용(숨김 `.gitignore` 및 생성된 `.git` 포함)을 최종 폴더로 복사하세요. 원본 `Images` 전체와 `informations`는 저장소에 올리지 마세요.

로컬 커밋이 이미 있으면 아래 명령으로 원격에 보냅니다. GitHub 로그인은 대상 저장소 쓰기 권한이 있는 계정으로 진행하세요.

```powershell
Set-Location 'C:\Users\user\Documents\Codex\Projects\rentwalleet\rentwalleet-web'
git status
git remote -v
git push -u origin main
```

새로 초기화해야 한다면 다음을 사용합니다. 이미 `.git`이 있으면 초기화와 원격 추가를 반복하지 마세요.

```powershell
git init -b main
git remote add origin https://github.com/rentwalleet/rentwalleet-website.git
git add .
git commit -m "Build Imdaeri one-page brand website"
git push -u origin main
```

원격에 다른 커밋이 생긴 경우 강제 push하지 말고 먼저 fetch하여 차이를 확인합니다.

## Cloudflare Pages 초기 설정

아래 절차는 GitHub main push 완료 후 진행합니다. 2026-10-22 확인한 Cloudflare 공식 문서를 기준으로 합니다.

1. Cloudflare 대시보드 → **Workers & Pages → Create application → Pages → Import an existing Git repository**.
2. GitHub를 연결하고 `rentwalleet/rentwalleet-website` 저장소를 선택합니다.
3. 아래 값을 입력하고 배포합니다.

| 항목 | 값 |
| --- | --- |
| 프로젝트 이름 | `rentwalleet-website` (다른 이름도 가능) |
| Production branch | `main` |
| Framework preset | `None` |
| Root directory | 비워둠 / 저장소 루트 |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node 환경변수 | `NODE_VERSION=22` |

위 설정은 이 프로젝트 폴더의 내용이 GitHub 저장소 루트에 올라간 경우입니다. 저장소에 `rentwalleet-web/` 하위로 넣었다면 Root directory도 `rentwalleet-web`로 지정해야 합니다.

4. 생성된 실제 `*.pages.dev` 주소로 메인 페이지·폰트·이미지·약관 링크를 확인합니다.
5. 이후 `main`에 push하면 자동으로 새 배포가 진행됩니다.

### rentwalleet.com 연결

1. Cloudflare에 `rentwalleet.com` 도메인을 사이트(Zone)로 추가합니다. 다른 등록업체에서 구매했다면 Cloudflare가 지정한 네임서버를 도메인 등록업체에 설정합니다. 기존 메일을 사용한다면 MX/TXT 레코드가 함께 유지되는지 확인합니다.
2. Pages 프로젝트 → **Custom domains → Set up a domain** → `rentwalleet.com` 입력.
3. 같은 Cloudflare 계정의 Zone에 연결하고 안내되는 DNS 레코드를 승인합니다.
4. 도메인·인증서가 Active가 되면 `https://rentwalleet.com` 접속을 확인합니다.
5. `www.rentwalleet.com`도 사용할 경우 Pages에서 도메인을 별도로 추가하고, Cloudflare Redirect Rule로 `www`를 기본 도메인 `https://rentwalleet.com`으로 301 이동시킵니다. 경로와 쿼리를 유지하도록 설정합니다.
6. DNS CNAME만 수동 생성하는 것으로 끝내지 말고 Pages의 Custom domains 등록도 완료해야 합니다.

### 검색엔진 등록

- 기본 title/description, canonical, OG/Twitter 메타, Organization JSON-LD, 한국어 lang, sitemap, robots 설정을 포함했습니다.
- Google Search Console의 도메인 속성에서 DNS TXT 인증하거나, URL 접두어 속성에서 발급된 HTML 메타태그를 `public/index.html`의 주석 위치에 입력합니다.
- 네이버 서치어드바이저에서도 사이트를 추가하고 발급된 메타태그를 같은 위치에 입력합니다.
- 양쪽에 `https://rentwalleet.com/sitemap.xml`을 제출합니다. 사이트 소유 확인과 검색 노출은 배포만으로 완료되지 않습니다.
- 공개 도메인이 기본 URL로 활성화된 후 필요한 경우 Pages 기본 도메인에도 Redirect Rule/Bulk Redirect를 설정해 중복 URL을 정리합니다.

공식 참고: [Static HTML 배포](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/), [사용자 도메인](https://developers.cloudflare.com/pages/configuration/custom-domains/).

## 검증 기록

- 로컬 정적 서버 HTTP 200 확인.
- `node --check`로 브라우저 JS와 서버·빌드 스크립트 문법 확인.
- `npm run check`로 파일 참조, 링크 앵커, 이미지 alt, 새 창 링크, SEO JSON, 로컬 폰트, 비공개 가격 텍스트 확인.
- `npm run build` 결과 확인.
- PC/모바일 육안 및 실제 브라우저 상호작용 검증은 환경의 브라우저 세션 오류로 남아 있습니다. 360px·390px·768px·1440px에서 가로 넘침, 배너 전환, FAQ, 상담 dialog, 스토어 연결을 최종 확인하세요.

## 업데이트 이력

| 날짜 | 변경 |
| --- | --- |
| 2026-10-22 | 최초 구현: 제공 자료 기반 반응형 원페이지, 배너·리워드·고정 배경·다운로드·푸터·플로팅 버튼, 약관 원문, SEO, 정적 빌드 및 배포 가이드 작성. |

다음 수정부터 이 표에 날짜와 실제 변경 내용을 추가합니다.
