# 🌿 여백 (Yeobaek)

> 여행의 빈 공간을 채워주는 AI 기반 맞춤 여행 일정 플래너

여백은 여행 준비 과정에서 발생하는 정보 과부하와 심리적 피로도를 줄이고,  
AI 추천 · 일정 플래너 · 숙소 비교 · 커뮤니티 기능을 하나의 플랫폼으로 통합한  
올인원 여행 계획 서비스입니다. :contentReference[oaicite:0]{index=0}

---

## 📅 프로젝트 정보

- **프로젝트 기간**: 2026.01.23 ~ 2026.01.29 :contentReference[oaicite:1]{index=1}
- **프로젝트명**: 여백
- **팀 구성**
  | 이름 | 역할 | 담당 |
  |------|------|------|
  | 김준우 | 팀장(PM) | 전체 기획 및 관리 |
  | 김재준 | 팀원 | 커뮤니티 |
  | 김진필 | 팀원 | AI 추천 기능 |
  | 김한비 | 팀원 | 숙소 |
  | 안현 | 팀원 | 플래너 |
  | 유상진 | 팀원 | CSS UI 및 인터랙션 |
  | 최윤석 | 팀원 | 프로필 |
  | 형성빈 | 팀원 | 사용자 추천 |

    :contentReference[oaicite:2]{index=2}

---

## 🎯 기획 배경

- 여행 준비 시 과도한 정보 탐색과 의사결정으로 인한 피로도 증가 :contentReference[oaicite:3]{index=3}
- 지도, 숙소, 메모, 스프레드시트 등 여러 도구를 동시에 사용하는 비효율적 구조 :contentReference[oaicite:4]{index=4}
- SNS/커뮤니티의 인기 장소 위주 정보 편중 문제 :contentReference[oaicite:5]{index=5}

→ **여백은 하나의 플랫폼에서 여행 성향 분석부터 일정, 숙소, 후기까지 모두 해결**하는 것을 목표로 합니다.

---

## 🛠 기술 스택

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla JS)**

:contentReference[oaicite:6]{index=6}

---

## 🗂 협업 및 개발 규칙

- Git을 이용한 버전 관리
- 브랜치에서 작업 후 commit → push → main merge 방식
- main 브랜치는 항상 배포 가능한 상태 유지  
  :contentReference[oaicite:7]{index=7}

---

## 🚀 주요 기능

### 1. 사용자 인증 및 권한 관리

- localStorage 기반 회원가입 / 로그인 :contentReference[oaicite:8]{index=8}
- 로그인 상태에 따른 접근 제어 (성향 테스트, 일정 관리 등) :contentReference[oaicite:9]{index=9}
- 자동 로그인 및 아이디 저장 기능 :contentReference[oaicite:10]{index=10}
- 성향 테스트 결과 사용자별 저장 및 메인 페이지 연동 :contentReference[oaicite:11]{index=11}

---

### 2. 메인 홈 & 마이페이지

- 일정 카드 기반 시각화 :contentReference[oaicite:12]{index=12}
- 성향 테스트 결과 카드 UI 제공 :contentReference[oaicite:13]{index=13}
- 방문한 국가/지역 표시 :contentReference[oaicite:14]{index=14}
- 작성한 커뮤니티 후기 확인 가능 :contentReference[oaicite:15]{index=15}

---

### 3. AI 기반 맞춤 여행 추천

- 9가지 여행 성향 테스트 기반 분석 :contentReference[oaicite:16]{index=16}
- 사용자 성향에 맞는 여행지 및 일정 추천 :contentReference[oaicite:17]{index=17}
- 각 여행지별 상세 정보 제공  
  (명소, 이미지, 추천 항공편 등) :contentReference[oaicite:18]{index=18}

---

### 4. 일정 플래너

- 항공권 · 숙소 · 일정 통합 관리 :contentReference[oaicite:19]{index=19}
- Drag & Drop 방식 일정 편집 :contentReference[oaicite:20]{index=20}
- 지도 기반 핀 + 라인으로 이동 동선 시각화 :contentReference[oaicite:21]{index=21}

---

### 5. 숙소 검색 및 비교

- 탐색 단계 50% 이상 감소 :contentReference[oaicite:22]{index=22}
- 최대 3개 숙소 동시 비교 UI 제공 :contentReference[oaicite:23]{index=23}
- 가격, 평점, 거리, 객실 타입 통합 제공 :contentReference[oaicite:24]{index=24}
- 플래너와 직접 연동 가능 :contentReference[oaicite:25]{index=25}

---

### 6. 커뮤니티

- 여행 후기 및 일정 공유 게시판 :contentReference[oaicite:26]{index=26}
- 사진 업로드 및 별점 후기 :contentReference[oaicite:27]{index=27}
- 성향 기반 필터링 가능 :contentReference[oaicite:28]{index=28}

---

### 7. UI/UX 통합 디자인

- 메인, 숙소, 커뮤니티 페이지 통일된 디자인 :contentReference[oaicite:29]{index=29}
- 카드 Hover 효과 및 녹색 포인트 컬러 통일 :contentReference[oaicite:30]{index=30}

---

## 🔮 향후 개선 방향

- 성향 테스트 + 플래너 사용 기록 + 커뮤니티 활동 데이터 통합 추천 고도화 :contentReference[oaicite:31]{index=31}
- 사용자 피드백(좋아요, 저장, 건너뛰기 등) 반영 추천 시스템 강화 :contentReference[oaicite:32]{index=32}

---

## 🌟 기대 효과

- 개인 맞춤형 여행 경험 제공 → 서비스 만족도 상승 :contentReference[oaicite:33]{index=33}
- 일정 → 실행 → 후기 공유로 이어지는 사용자 사이클 형성 :contentReference[oaicite:34]{index=34}
- 숙소 탐색부터 일정 관리까지 단일 서비스 내 해결 → 이탈률 감소 :contentReference[oaicite:35]{index=35}

---

## ✨ 요약

여백은  
**AI 추천 + 일정 플래너 + 숙소 비교 + 커뮤니티**를 하나로 묶어  
“여행 준비의 피로를 줄이고, 나에게 맞는 여행을 가장 쉽게 만드는 서비스”를 목표로 합니다.
