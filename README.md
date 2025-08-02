# 종합 자원 관리 시스템

React로 구현된 종합 자원 관리 시스템입니다. 사용자 관리, 콘텐츠 관리, 통계 분석 등의 기능을 제공합니다.

## 주요 기능

### 🏠 대시보드
- 시스템 전체 현황 요약
- 주요 지표 카드 (사용자 수, 게시글 수, 매출액 등)
- 최근 활동 로그
- DAU 추이 차트
- 퀵 링크

### 👥 사용자 관리
- **회원 목록**: 검색, 필터링, 정렬 기능이 있는 회원 목록  (/operation/users/list)
- **회원 상세**: 개별 회원의 상세 정보 조회  (/operation/users/list/:id)
- **로그 기록**: 사용자 활동 로그 조회 (/operation/users/logs)

### 📝 콘텐츠 관리 (개발 예정)
- 게시글 관리
- 댓글 관리

### 📊 통계 및 분석 (개발 예정)
- 일간/월간 활성 사용자 분석
- 매출 현황 분석

## 기술 스택

- **Frontend**: React 18.2.0
- **Routing**: React Router DOM 6.3.0
- **Styling**: Vanilla CSS
- **Development**: React Scripts 5.0.1

## 설치 및 실행

### 필수 요구사항
- Node.js 16.0.0 이상
- npm 또는 yarn

### 설치
```bash
# 의존성 설치
npm install

# 또는 yarn 사용시
yarn install
```

### 개발 서버 실행
```bash
# 개발 서버 시작
npm start

# 또는 yarn 사용시
yarn start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 확인할 수 있습니다.

### 빌드
```bash
# 프로덕션 빌드
npm run build

# 또는 yarn 사용시
yarn build
```

## 폴더 구조

```
src/
├── components/           # 재사용 가능한 컴포넌트
│   ├── Layout/          # 레이아웃 관련 컴포넌트
│   │   ├── Layout.js
│   │   ├── Header.js
│   │   ├── LNB.js
│   │   └── Footer.js
│   └── Modals/          # 모달 컴포넌트
│       ├── UserModal.js
│       └── DeleteConfirmModal.js
├── pages/               # 페이지 컴포넌트
│   ├── Dashboard/       # 대시보드
│   ├── Users/          # 사용자 관리
│   ├── Contents/       # 콘텐츠 관리
│   └── Analysis/       # 통계 분석
├── App.js              # 메인 앱 컴포넌트
└── index.js            # 엔트리 포인트
```

## 주요 특징

### 반응형 디자인
- 데스크톱에 최적화된 레이아웃
- 모바일/태블릿 환경 지원

### 모듈화된 구조
- 컴포넌트 기반 아키텍처
- 재사용 가능한 UI 컴포넌트
- 페이지별 분리된 구조

### 사용자 친화적 인터페이스
- 직관적인 네비게이션
- 검색 및 필터링 기능
- 모달을 통한 CRUD 작업
- 상태 표시 및 피드백

### 확장 가능한 설계
- 새로운 기능 추가 용이
- 컴포넌트 재사용성
- 일관된 디자인 시스템

## 개발 예정 기능

- [ ] 게시글 관리 시스템
- [ ] 댓글 관리 기능
- [ ] 실시간 통계 차트
- [ ] 사용자 권한 관리
- [ ] 파일 업로드 기능
- [ ] 이메일 알림 시스템

## 라이선스

MIT License

## 기여하기

프로젝트에 기여하고 싶으시다면 Pull Request를 보내주세요.

1. Fork the Project
2. Create your Feature Branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your Changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the Branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request 