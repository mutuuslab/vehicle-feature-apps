# runtime

모든 기능 패키지가 쓰는 Flag 클라이언트 경계입니다.

- `FlagClient` — OpenFeature 형태. 차량에서는 서명 검증된 스냅샷을 읽는 클라이언트가 구현한다(`SignedSnapshotSource`).
- `flagOn` — 오류·시간 초과는 꺼짐(false)으로 돌린다.
- `LocalGuard` — 안전 관련 Feature(F2 이상)는 차량의 로컬 Guard가 허용해야 켠다.
- `testing.ts` — 기능 시험용 가짜 클라이언트·신호·고장 코드 기록기.
