// FF가 만든 Flag 상수 — FEAT-00003 3.2.0 「서라운드 뷰 모니터」. 키 문자열은 FF 등록 원장과 대사하므로 바꾸지 않는다.
export const ADAS_00003_ENABLE = 'adas_00003_enable' as const;
export const ADAS_00003_SIGNAL = 'adas_00003_signal' as const;
export const FEAT_00003_FLAGS = [ADAS_00003_ENABLE, ADAS_00003_SIGNAL] as const;
