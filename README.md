# 🌿 여백 (Yeobaek)

> 여행의 빈 공간을 채워드립니다  
> AI 기반 맞춤 일정 · 숙소 비교 · 커뮤니티를 하나로 통합한 감성 여행 플래너

여백(Yeobaek)은 여행 준비 과정에서 발생하는  
**정보 과부하, 반복 검색, 의사결정 피로도**를 해결하기 위해 만들어진  
올인원 여행 계획 플랫폼입니다.

AI 성향 분석부터 일정 생성, 숙소 탐색 및 비교, 여행 후기 공유까지  
모든 과정을 하나의 흐름으로 연결하여  
“생각하는 여행”이 아닌 **“즐기는 여행 준비”**를 목표로 합니다.

---

## 📅 프로젝트 정보

- **프로젝트명**: 여백 (Yeobaek)
- **기간**: 2026.01.23 ~ 2026.01.29
- **팀명**: AIBE5 Team2\_간단하게
- **슬로건**: _여행의 빈 공간을 채워드립니다_

---

## 👥 팀 구성

| 이름   | 역할      | 담당                |
| ------ | --------- | ------------------- |
| 김준우 | PM / 팀장 | 프로젝트 총괄       |
| 김진필 | 팀원      | AI 추천 기능        |
| 안 현  | 팀원      | 일정 플래너         |
| 김한비 | 팀원      | 숙소 검색 및 비교   |
| 김재준 | 팀원      | 커뮤니티            |
| 유상진 | 팀원      | CSS UI & 인터랙션   |
| 최윤석 | 팀원      | 프로필 / 마이페이지 |
| 형성빈 | 팀원      | 사용자 추천 로직    |

---

## 🎯 프로젝트 목표

- 여행 준비 과정에서의 **정보 탐색 스트레스 최소화**
- AI 기반으로 **개인 성향 맞춤 여행 경험 제공**
- 여행 일정 → 숙소 → 후기 → 공유로 이어지는 **자연스러운 사용자 흐름 구축**
- 하나의 플랫폼 안에서 여행 준비를 완결시키는 **통합 여행 서비스**

---

## 🚀 핵심 기능

### ✅ 1. AI 여행 일정 생성

**AI Wizard** (`/ai-wizard`)  
7단계 질문형 AI 플로우로 사용자 맞춤 일정 생성

- 기간 / 날짜 선택
- 동행 유형 (혼자, 연인, 가족, 친구)
- 여행 테마 (힐링, 맛집, 문화, 액티비티, 카페, 사진 명소)
- 예산 범위
- 이동 수단
- 일정 강도
- 가장 중요한 것

→ 성향 분석 결과 기반으로  
**완성형 여행 일정 + 추천 여행지 + 일정 구조 자동 생성**

---

### ✅ 2. 일정 플래너

**Planner** (`/planner/:id`)

- Drag & Drop 일정 정렬
- 장소 추가 / 삭제
- 시간 · 비용 · 이동 시간 편집
- 체크리스트 관리
- 지도 기반 시각화
    - 핀 + 경로 라인
    - Day별 일정 분리
- PDF 출력 및 일정 공유 기능

---

### ✅ 3. 여행지 검색 및 결과

**Results** (`/results`)

- 조건 검색
    - 목적지, 날짜, 인원, 테마, 예산
- 필터링
    - 예산 범위
    - 일정 밀도
    - 이동량
    - 운영시간 검증
- 정렬
    - 인기순, 평점순, 가격순, 이동시간순
- 최근 검색 기록
    - LocalStorage 저장

---

### ✅ 4. AI 추천 시스템

- 태그 기반 추천
- 홈 화면
    - 이달의 추천 일정
    - 가성비 여행 코스
- 성향 + 커뮤니티 데이터 기반 추천 고도화 가능

---

### ✅ 5. 숙소 검색 & 비교

- 목적지 기반 인근 역 자동 추천
- 최대 **3개 숙소 동시 비교**
- 제공 정보
    - 가격
    - 평점
    - 거리
    - 객실 타입
    - 후기
- 플래너와 즉시 연동
    - 선택한 숙소를 일정에 바로 반영

---

### ✅ 6. 커뮤니티

**Community** (`/community`)

- 여행 후기 공유
- 사진/영상 포함 게시글
- 좋아요 / 댓글
- 일정 복사 기능
- 지역별 필터링
- 성향 기반 추천 커뮤니티 환경 구축

---

### ✅ 7. 사진 · 영상 업로드

**Upload** (`/upload`)

- 이미지 / 비디오 멀티 업로드
- Drag & Drop 지원
- 일정 연결
- 설명 입력 가능

---

### ✅ 8. 여행지별 후기 시스템

**Reviews** (`/reviews`)

- 지역 필터링
- 별점 평가 (5점 척도)
- 사진 첨부
- 일정 연동
- “도움됨” 기능

---

### ✅ 9. 인증 시스템

**Auth** (`/auth`)

- 회원가입 / 로그인
- 로그인 유지
- 아이디 / 비밀번호 찾기
- 임시 비밀번호 발송
- 소셜 로그인 (Google, Kakao)

---

### ✅ 10. 마이페이지

**MyPage** (`/mypage`)

- 저장한 일정
- 업로드한 사진 / 영상
- 작성한 후기
- 통계 대시보드
- 성향 카드 UI

---

### ✅ 11. 상세 일정 페이지

**Plan Detail** (`/plan/:id`)

- 타임라인 + 지도 동시 시각화
- Day 탭 전환
- 운영시간 검증 결과 표시
- 비용 상세 계산
- 저장 / 공유 기능

---

## 🗺 지도 기능 (Google Maps API)

- 장소 마커 + 번호
- Polyline 경로 표시
- 자동 중심 / 줌
- InfoWindow 제공
- 커스텀 마커 스타일

---

## 🎨 디자인 컨셉

- 감성 미니멀 UI
- 베이지 / 크림 컬러 팔레트  
  `#C4B5A0`, `#F5F1EC`
- 둥근 카드 UI (`rounded-3xl`)
- 부드러운 hover 애니메이션
- TailwindCSS 기반 디자인 시스템 구축

---

## 🛠 기술 스택

| 영역         | 기술                            |
| ------------ | ------------------------------- |
| Frontend     | HTML5, Vanilla JavaScript (ES6) |
| Styling      | Tailwind CSS v4 + Custom Theme  |
| State 관리   | LocalStorage                    |
| UI Animation | CSS Transition, Transform       |
| 지도         | Google Maps JavaScript API      |
| 아이콘       | Lordicon, Material Symbols      |
| 반응형       | Mobile First Responsive Design  |

---

## 🔄 사용자 플로우

### A 루트 (목적지가 있는 경우)

사용자가 이미 여행지를 정해둔 상태에서  
조건 기반 검색 → 숙소 → 일정 확정으로 빠르게 이어지는 흐름입니다.

세부 흐름:

1. 메인 페이지에서 여행지, 날짜, 인원, 테마 입력
2. Results 페이지에서 조건에 맞는 여행 일정 후보 탐색
3. 여행지 선택 후 숙소 추천 자동 연결
4. 숙소 카드에서:
    - 가격
    - 평점
    - 거리
    - 객실 타입
    - 후기 확인 가능
5. 숙소 3개까지 비교 가능
6. 선택한 숙소를 일정 플래너에 바로 반영
7. 일정 플래너에서 세부 일정 조정
8. 일정 완성 및 저장 / 공유

---

### B 루트 (목적지가 없는 경우)

여행지가 정해지지 않은 사용자를 위한  
AI 성향 기반 추천 루트입니다.

세부 흐름:

1. AI Wizard 시작
2. 7단계 질문 진행
    - 여행 기간
    - 동행 유형
    - 테마
    - 예산
    - 이동 수단
    - 일정 강도
    - 가장 중요한 것
3. AI 성향 분석 결과 생성
4. 추천 여행지 + 기본 일정 구조 생성
5. 추천 일정 중 하나 선택
6. 숙소 자동 추천
7. 숙소 비교 후 선택
8. 일정 플래너에 자동 반영
9. 일정 완성 및 저장

---

📦 Yeobaek
├─ 📁 images
│ ├─ 📁 main
│ │ ├─ ArrowIcon.png
│ │ ├─ ButtonIcon.png
│ │ └─ ButtonIcon2.png
│ ├─ 📁 profile
│ │ ├─ Login_Background_image01.jpg
│ │ ├─ Login_Background_image02.jpg
│ │ ├─ Login_Background_image03.jpg
│ │ ├─ Logo_Google.png
│ │ └─ Logo.png
│
├─ 📁 js
│ ├─ auth.js
│ ├─ data.js
│ ├─ enneagram-recommendations.js
│ ├─ main.js
│ ├─ profile-functions.js
│ ├─ trips.js
│ └─ utils.js
│
├─ 📁 pages
│ ├─ 📁 auth
│ │ ├─ SignIn.html
│ │ └─ SignUp.html
│
│ ├─ 📁 community
│ │ ├─ 📁 community-image
│ │ │ ├─ 교토.JPG
│ │ │ ├─ 교토음식.JPG
│ │ │ ├─ 나고야성.JPG
│ │ │ ├─ 대만.JPG
│ │ │ ├─ 세부.JPG
│ │ │ ├─ 파리.JPG
│ │ │ └─ 프라하.JPG
│ │ ├─ community-main.html
│ │ └─ community-post.html
│
│ ├─ 📁 main
│ │ ├─ AI_Personality_test.html
│ │ ├─ AI_Travel_planner.html
│ │ ├─ AI_Travel_planner_list.html
│ │ ├─ ai-personality-test.html
│ │ ├─ ai-travel-recommend.html
│ │ └─ Main.html
│
│ ├─ 📁 plan
│ │ ├─ flight.html
│ │ ├─ planner.html
│ │ └─ schedule.html
│
│ ├─ 📁 profile
│ │ ├─ profile.html
│ │ ├─ view_personality_card.html
│ │ └─ view-personality-card.html
│
│ └─ 📁 stay
│ ├─ detail.html
│ ├─ search.html
│ └─ table.html
│
├─ 📄 styles.css
├─ 📄 README.md

---
