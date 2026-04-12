// FF가 만든 Flag 상수 — FEAT-00028 1.0.0 「전방 안전거리 확대」. 키 문자열은 FF 등록 원장과 대사하므로 바꾸지 않는다.
export const ADAS_00028_SIGNAL = 'adas_00028_signal' as const;
export const ADAS_00028_PARAM = 'adas_00028_param' as const;
export const FEAT_00028_FLAGS = [ADAS_00028_SIGNAL, ADAS_00028_PARAM] as const;
