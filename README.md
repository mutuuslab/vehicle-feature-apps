# vehicle-feature-apps

차량 기능 앱. Feature Platform(FF)에 등록된 Feature의 Flag를 실제 분기 코드로 구현한 차량 SW 예시 저장소입니다.
기준 데이터(v0.81)와 데모 활동 Feature를 담습니다.

> 시연용 생성 코드입니다. 고객 차량 SW가 아니며, FF 생성기가 등록 데이터로 미리 만든 이력입니다.

## 구조

- `packages/runtime` — Flag 클라이언트(OpenFeature 형태), 로컬 Guard, 시간 초과·오류를 꺼짐으로 돌리는 `flagOn`, 시험 도구
- `packages/<도메인>/src/features/feat-NNNNN/`
  - `flags.ts` — Flag 키 상수(키 문자열의 유일한 위치, FF가 만든다)
  - `flag-guards.ts` — 기본값 OFF 호출 뼈대(FF가 만든다)
  - `feature.ts` — 제어점별 기능 분기(Flag·Parameter·Signal·DTC)
  - `feature.test.ts` — 기본 OFF, 켜짐 분기, Guard 차단, 오류 시 OFF
- `ff-flags.config.json` — FF 연결 정보(비밀 없음)
- `.github/workflows/ff-flag-check.yml` — 시험·타입 검사, FF 연결 시 Flag 스캔 업로드

## 흐름

1. FF에서 Feature Version이 승인되면 FF Flag Bot이 `ff/flags/feat-nnnnn-<버전>` 브랜치에 상수·호출 뼈대를 커밋하고 PR을 연다.
2. 도메인 구현 담당이 같은 PR에 기능 분기와 시험을 더한다. FF Flag 검사가 통과하면 병합한다.
3. 기본 브랜치에 들어온 커밋마다 FF가 Flag 호출을 스캔·서명하고 등록 원장과 대사한다.

## 실행

```sh
npm install
npm test
npm run typecheck
```

Node 24 이상이 TypeScript 파일을 바로 실행합니다.
