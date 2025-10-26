# 유토 대시보드

Next.js 기반의 게시판 및 데이터 시각화 대시보드 애플리케이션

## 목차

- [프로젝트 실행 방법](#프로젝트-실행-방법)
- [사용 기술 스택](#사용-기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [주요 기능](#주요-기능)
- [아키텍쳐 설계](#아키텍쳐-설계)
- [디자인 패턴](#디자인-패턴)
- [트러블슈팅](#트러블슈팅)

## 프로젝트 실행 방법

### 요구사항

- Node.js 20.x 이상
- pnpm 9.x 이상

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

### 환경 변수 설정

`.env.local` 파일이 존재하지 않는 경우 생성 후 아래 환경 변수를 설정해주세요.

```env
NEXT_PUBLIC_API_URL=https://fe-hiring-rest-api.vercel.app
```

## 사용 기술 스택

### Core

- **Next.js 16.0** - React 프레임워크 (App Router)
- **React 19.2** - UI 라이브러리
- **TypeScript 5.x** - 타입 안정성

### Form & State Management

- **TanStack Form** - 폼 상태 관리 및 유효성 검사

### UI & Styling

- **Tailwind CSS 4.x** - 유틸리티 기반 CSS 프레임워크
- **shadcn/ui** - 재사용 가능한 컴포넌트 라이브러리
- **Radix UI** - 접근성이 보장된 헤드리스 UI 컴포넌트
- **Lucide React** - 아이콘 라이브러리
- **class-variance-authority** - 조건부 스타일링

### Data Visualization

- **Recharts** - React 기반 차트 라이브러리

### Code Quality

- **ESLint** - 코드 린팅
- **TypeScript** - 정적 타입 검사

## 프로젝트 구조

```
src/
├── app/                          # Next.js App Router
│   ├── (guest)/                 # 비인증 라우트 그룹
│   │   └── login/               # 로그인 페이지
│   ├── (user)/                  # 인증 라우트 그룹
│   │   ├── layout.tsx           # 사이드바 레이아웃
│   │   ├── posts/               # 게시판 기능
│   │   │   ├── page.tsx        # 게시글 목록
│   │   │   ├── new/            # 게시글 작성
│   │   │   ├── [id]/edit/      # 게시글 수정
│   │   │   └── details/[id]/   # 게시글 상세
│   │   └── charts/             # 차트 대시보드
│   ├── error.tsx               # 전역 에러 바운더리
│   ├── global-error.tsx        # 루트 에러 바운더리
│   └── not-found.tsx           # 404 페이지
│
├── components/
│   ├── ui/                     # shadcn/ui 컴포넌트
│   ├── features/               # 기능별 컴포넌트
│   │   ├── posts/             # 게시판 관련
│   │   │   ├── post-form.tsx          # 폼 로직
│   │   │   ├── post-form-container.tsx # 폼 컨테이너
│   │   │   ├── post-detail.tsx        # 상세 뷰
│   │   │   ├── post-table-row.tsx     # 테이블 행
│   │   │   ├── post-cursor-pagination.tsx
│   │   │   ├── post-search-bar.tsx
│   │   │   ├── post-filters.tsx
│   │   │   ├── post-toolbar.tsx
│   │   │   └── form-fields/          # 폼 필드 컴포넌트
│   │   │       ├── post-title-field.tsx
│   │   │       ├── post-category-field.tsx
│   │   │       ├── post-content-field.tsx
│   │   │       └── post-tags-field.tsx
│   │   ├── charts/            # 차트 관련
│   │   │   ├── chart-header.tsx      # 차트 헤더
│   │   │   ├── chart-body.tsx        # 차트 바디
│   │   │   ├── mood/                 # 감정 차트
│   │   │   │   ├── mood-stack-bar-chart.tsx
│   │   │   │   └── mood-stack-area-chart.tsx
│   │   │   ├── team/                 # 팀 차트
│   │   │   │   └── team-multi-line-chart.tsx
│   │   │   └── coffee/               # 커피 차트
│   │   │       ├── coffee-bar-chart.tsx
│   │   │       └── coffee-donut-chart.tsx
│   │   └── layout/            # 레이아웃 관련
│   │       └── app-sidebar.tsx
│   ├── charts/                # 재사용 차트 컴포넌트
│   │   └── tooltip/
│   │       └── custom-tooltip.tsx    # 커스텀 툴팁
│   └── common/                # 공통 컴포넌트
│       └── page-container.tsx
│
├── lib/
│   ├── client/                # API 클라이언트
│   │   └── api-client.ts
│   ├── services/              # 서비스 레이어
│   │   ├── post-service.ts
│   │   ├── login-service.ts
│   │   └── chart-service.ts
│   ├── strategies/            # 전략 패턴
│   │   └── post-form.strategies.ts
│   ├── validators/            # 유효성 검사
│   │   └── post-field.validators.ts
│   ├── constants/             # 상수
│   │   ├── post-categories.ts
│   │   └── chart-colors.ts
│   ├── types/                 # 타입 정의
│   │   ├── post.ts
│   │   └── chart.ts
│   └── utils/                 # 유틸리티
│       ├── cn.ts
│       └── query-string.ts
│
└── hooks/                     # 커스텀 훅
    └── use-mobile.ts
```

## 주요 기능

### 1. 인증 시스템

- JWT 토큰 기반 인증
- Cookie를 이용한 토큰 저장 (24시간 유효)
- 로그인/로그아웃 기능
- 라우트 보호 (인증된 사용자만 접근 가능)

### 2. 게시판 기능

#### 게시글 CRUD

- **작성**: TanStack Form을 이용한 유효성 검사
- **조회**: 커서 기반 페이지네이션
- **수정**: 기존 데이터 프리필 및 수정
- **삭제**: AlertDialog를 통한 확인 후 삭제

#### 검색 & 필터링

- 제목/본문 내용 검색
- 카테고리별 필터링 (NOTICE, QNA, FREE)
- 정렬 기능 (제목/작성일, 오름차순/내림차순)

#### 유효성 검사

- **제목**: 2-100자
- **내용**: 10-5,000자
- **태그**: 최대 5개, 중복 불가, 각 24자 이내
- **IME 조합 처리**: 한글 입력 시 조합 완료 후 태그 추가

### 3. 차트 기능

#### 감정 트렌드 차트

- **스택형 바 차트**: 주간별 감정 분포 (happy, tired, stressed)
- **스택형 면적 차트**: 주간별 감정 트렌드 시각화
- **범례 상호작용**: 클릭으로 데이터 시리즈 show/hide 토글
- **커스텀 툴팁**: 모든 데이터 포인트 정보 표시

#### 팀별 성과 차트

- **멀티라인 차트**: 커피 섭취량 대비 버그 수 & 생산성 시각화
- **이중 Y축**: 버그 수(왼쪽) / 생산성(오른쪽)
- **팀별 색상 구분**: Frontend, Backend, AI, Design
- **라인 스타일**: 실선(버그) / 점선(생산성)
- **데이터 마커**: 원형(버그) / 사각형(생산성)

#### 커피 브랜드 차트

- **바 차트**: 브랜드별 인기도 비교
- **도넛 차트**: 브랜드별 점유율 시각화
- **브랜드별 커스텀 색상**: 일관된 시각적 아이덴티티

### 4. UI/UX

- 반응형 디자인 (모바일/데스크톱)
- 스켈레톤 로더를 통한 레이아웃 시프트(CLS) 방지
- 실시간 에러 메시지 표시
- 인터랙티브 차트 (범례 클릭, 호버 툴팁)

## 아키텍쳐 설계

### 1. Layered Architecture

```
┌─────────────────────────────────────┐
│         Presentation Layer          │  (React Components)
│  - Pages (RSC/Client Components)    │
│  - Feature Components               │
│  - UI Components (shadcn/ui)        │
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│          Business Layer             │  (Strategies, Validators)
│  - Form Strategies                  │
│  - Validation Logic                 │
│  - Business Rules                   │
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│          Service Layer              │  (API Services)
│  - Post Service                     │
│  - Login Service                    │
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│        Data Access Layer            │  (API Client)
│  - HTTP Client (Fetch API)          │
│  - Request/Response Handling        │
└─────────────────────────────────────┘
```

### 2. 컴포넌트 설계 원칙

#### Presentational/Container Pattern

- **Container**: 비즈니스 로직, 상태 관리 (`PostFormContainer`)
- **Presentational**: UI 렌더링 (`PostForm`)

#### Compound Components Pattern

- 복잡한 UI를 작은 컴포넌트로 분해
- 각 필드를 독립적인 컴포넌트로 분리 (`PostTitleField`, `PostCategoryField`)

#### Feature-Sliced Design (FSD) 영감

- 기능별로 컴포넌트 그룹화 (`features/posts/`, `features/layout/`)
- 재사용 가능한 UI는 별도 분리 (`ui/`, `common/`)

### 3. 상태 관리 전략

- **URL State**: 검색/필터/정렬 상태 (`searchParams`)
- **Form State**: TanStack Form (`useForm`)
- **Server State**: Next.js Server Components (자동 캐싱)
- **Client State**: `useState` (최소한으로 사용)

## 디자인 패턴

### 1. Strategy Pattern (전략 패턴)

폼 제출 로직을 전략 객체로 캡슐화하여 재사용성 향상

```typescript
// src/lib/strategies/post-form.strategies.ts
export interface PostFormStrategy {
  submit: (data: PostFormData) => Promise<void>;
  onSuccess?: (callback: () => void) => void;
  onError?: (error: Error) => void;
}

export const PostFormStrategies = {
  create: createPostStrategy,
  update: updatePostStrategy,
};
```

**장점:**

- 생성/수정 로직을 동일한 폼에서 재사용
- 새로운 제출 전략 추가 용이
- 테스트 용이성

### 2. Composition Pattern (조합 패턴)

필드별 컴포넌트를 조합하여 복잡한 폼 구성

```typescript
// form-fields/index.ts
export { PostTitleField } from "./post-title-field";
export { PostCategoryField } from "./post-category-field";
export { PostContentField } from "./post-content-field";
export { PostTagsField } from "./post-tags-field";
```

**장점:**

- 필드 재사용성 향상
- 각 필드의 책임 분리
- 유지보수 용이

### 3. Dependency Injection (의존성 주입)

API 클라이언트를 서비스에 주입하여 결합도 감소

```typescript
// lib/services/post-service.ts
import { apiClient } from "@/lib/client/api-client";

const postService = {
  get: (params) => apiClient.get(POSTS_ENDPOINT, params),
  // ...
};
```

**장점:**

- 테스트 시 목(mock) 객체 주입 가능
- API 클라이언트 변경 시 서비스 코드 수정 불필요

## 트러블슈팅

### 1. 한글 입력(IME) 처리 문제

**문제:** 한글 입력 시 조합 중에 Enter를 누르면 미완성 글자가 태그로 추가됨

**해결:**

```typescript
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter" && !e.nativeEvent.isComposing) {
    e.preventDefault();
    handleAddTag((e.target as HTMLInputElement).value);
  }
};
```

- `isComposing` 플래그로 조합 중인지 확인
- 조합 완료 후에만 태그 추가 처리

### 2. Hydration Mismatch 에러

**문제:** 서버 렌더링과 클라이언트 렌더링 시 `aria-controls` 속성 불일치

**해결:**

```typescript
// next/dynamic으로 클라이언트 전용 렌더링
const PostSearchBar = dynamic(
  () =>
    import("./post-search-bar").then((mod) => ({ default: mod.PostSearchBar })),
  {
    ssr: false,
    loading: () => <SearchBarSkeleton />,
  }
);
```

- `ssr: false`로 클라이언트 전용 렌더링
- 스켈레톤 로더로 레이아웃 시프트 방지

### 3. `next/headers` 사용 제약

**문제:** `cookies()`는 Server Component에서만 사용 가능

**현재 상태:**

- API 클라이언트에서 직접 `cookies()` 호출
- Client Component에서 사용 시 에러 발생

**향후 개선 방안:**

- Server Actions를 통한 토큰 전달
- Middleware에서 헤더에 토큰 주입
- Context API를 통한 클라이언트 토큰 관리

### 4. TanStack Form 타입 추론 문제

**문제:** `FieldApi` 제네릭 타입이 복잡하여 타입 에러 발생

**해결:**

```typescript
interface PostTitleFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
}
```

- 실용적 접근: 필드 컴포넌트의 `field` prop을 `any`로 처리
- 런타임 안정성은 TanStack Form이 보장

### 5. 커서 기반 페이지네이션 UX 개선

**문제:** 게시글 개수에 따라 페이지네이션 위치가 달라짐

**해결:**

```css
/* Fixed height table container */
.table-container {
  height: 600px;
  display: flex;
  flex-direction: column;
}

/* Sticky header */
.table-header {
  position: sticky;
  top: 0;
  z-index: 10;
}

/* Fixed pagination footer */
.pagination-footer {
  margin-top: auto;
  flex-shrink: 0;
}
```

- 고정 높이 컨테이너로 페이지네이션 위치 고정
- Flexbox로 헤더/바디/푸터 레이아웃 구성

### 6. 차트 범례 인터랙션 구현

**문제:** Recharts는 범례 클릭으로 데이터 토글 기능을 기본 제공하지 않음

**해결:**

```typescript
const [hiddenDataKeys, setHiddenDataKeys] = useState<Set<string>>(new Set());

const handleLegendClick = (dataKey: string) => {
  setHiddenDataKeys((prev) => {
    const newSet = new Set(prev);
    if (newSet.has(dataKey)) {
      newSet.delete(dataKey);
      return newSet;
    }

    newSet.add(dataKey);
    return newSet;
  });
};

// Legend 설정
<Legend
  formatter={(value, entry) => {
    const dataKey = entry.dataKey as string;
    const isHidden = hiddenDataKeys.has(dataKey);
    return (
      <span
        className={`text-sm cursor-pointer ${
          isHidden ? "text-gray-300 line-through" : "text-gray-600"
        }`}
      >
        {value}
      </span>
    );
  }}
  onClick={(e) => handleLegendClick(e.dataKey as string)}
/>

// 각 데이터 시리즈에 hide prop 적용
<Bar
  dataKey="happy"
  hide={hiddenDataKeys.has("happy")}
  // ... other props
/>
```

**장점:**

- 사용자가 원하는 데이터만 선택적으로 확인 가능
- 시각적 피드백(회색 + 취소선)으로 상태 명확히 표시
- `Set` 자료구조로 효율적인 토글 상태 관리

# 기능 요구 사항

#### 1. 게시판 기능

- [x] 게시판 기능을 구현한다.
- [x] 게시글 작성을 할 수 있어야 한다.
  - [x] 게시글 제목은 최대 80자까지 입력할 수 있다.
  - [x] 게시글 본문은 최대 2000자, 금칙어 필터가 적용되어야 한다.
  - [x] 카테고리는 NOTICE, QNA, FREE로 구성되어 있다.
  - [x] 태그를 작성할 수 있다.
    - [x] 태그 최대 5개
    - [x] 중복 불가
    - [x] 각 24자 이내
- [x] 게시글을 수정할 수 있어야 한다.
- [x] 게시글을 삭제할 수 있어야 한다.
- [x] 게시글 검색을 할 수 있어야 한다.
  - [x] 제목 및 본문 내용을 검색할 수 있다.
- [x] 게시글 페이지네이션은 커서 기반으로 prev, next로 구현한다.
- [x] 정렬은 title 또는 createdAt을 기준으로 내림차순, 오름차순이 가능해야 한다.
- [x] 카테고리별 필터링(NOTICE, QNA, FREE)이 가능해야 한다.
- [x] 금칙어 필터가 포함되는 경우 게시글을 등록할 수 없어야 한다. (금칙어 목록: 캄보디아, 프놈펜, 불법체류, 텔레그램)

#### 2. 차트 기능

- [x] 스택형 바, 면적 차트를 구현한다.
  - [x] X축은 Week, Y축은 백분율로 각 항목은(happy, tired, stressed)이 누적(Stacked) 형태로 표시되어야 한다.
- [x] 멀티라인 차트를 구현한다.
  - [x] X축은 커피 섭취량(잔/일), 왼쪽 Y축: 버그 수(bugs), 오른쪽 Y축: 생산성 점수(productivity)
  - [x] 범례(Legend): 팀별 라인 구분
  - [x] 각 팀(Frontend, Backend, AI 등)에 대해 두 개의 라인 표시
  - [x] 실선: 버그 수
  - [x] 점선: 생산성
  - [x] 동일 팀은 동일 색상 유지
- [ ] 데이터 포인트 마커 표시
  - [x] 원형: 버그 수
  - [x] 사각형: 생산성
- [x] 데이터 포인트 호버 시 툴팁에 호버된 라인의 포인트 X축에 해당하는 커피 잔수와 버그 수, 생산성 점수가 함께 표시되어야 한다.
- [x] 인기 커피 브랜드의 바 차트를 구현한다.
- [x] 인기 커피 브랜드의 도넛 차트를 구현한다.
