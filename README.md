# player

## 소개
Player는 웹 환경에서 HLS(HTTP Live Streaming) 프로토콜을 이용해 미디어 스트리밍을 재생할 수 있는 라이브러리 입니다
Vite, TypeScript, Preact 등의 기술을 사용하고 있습니다

## 시작하기
### 설치
Player를 설치하려면 터미널에서 다음 명령어를 실행하세요 (아직 설정 전)
```
npm install @momogoyo/player
```

## 사용법
사용하고자 하는 프로젝트에 Player를 다음과 같이 `import` 합니다
```javascript
import Player from '@momogoyo/player'
```

### 실행
다음 명령어로 프로젝트를 실행합니다. 파일 변경을 감지하기 때문에 변경에 따라 다시 자동으로 빌드됩니다.
```
npm run dev
```

## 의존성
해당 패키지는 다음 의존성을 가지고 있습니다
- `@momogoyo/shared`: utils 집합
- `eventemitter3`
- `hls.js`: HLS 프로토콜을 이용한 미디어 스트리밍 라이브러리
- `preact`

그리고 다음 개발 의존성을 가지고 있습니다
- `@emotion/css`: 스타일링을 위한 CSS 라이브러리
- `@preact/preset-vite`: Preact 통합을 위한 Vite 프리셋
- `@types/css`: CSS에 대한 TypeScript 타입 정의
- `@types/hls.js`: hls.js에 대한 TypeScript 타입 정의
- `@types/node`: Node.js에 대한 TypeScript 타입 정의
- `typescript`
- `vite`: 빌드 도구

## 버전
현재 버전은 1.0.0입니다.
