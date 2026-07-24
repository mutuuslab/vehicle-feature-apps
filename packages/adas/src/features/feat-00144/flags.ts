// FF가 만든 Flag 상수 — FEAT-00144 3.3.0 「서라운드 뷰 모니터」. 키 문자열은 FF 등록 원장과 대사하므로 바꾸지 않는다.
export const ADAS_00144_ENABLE = 'adas_00144_enable' as const;
export const ADAS_00144_SIGNAL = 'adas_00144_signal' as const;
export const FEAT_00144_FLAGS = [ADAS_00144_ENABLE, ADAS_00144_SIGNAL] as const;
