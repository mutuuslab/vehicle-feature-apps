// FF가 만든 Flag 상수 — FEAT-00025 1.0.0 「전방 안전거리 확대」. 키 문자열은 FF 등록 원장과 대사하므로 바꾸지 않는다.
export const ADAS_00025_SIGNAL = 'adas_00025_signal' as const;
export const ADAS_00025_PARAM = 'adas_00025_param' as const;
export const FEAT_00025_FLAGS = [ADAS_00025_SIGNAL, ADAS_00025_PARAM] as const;
