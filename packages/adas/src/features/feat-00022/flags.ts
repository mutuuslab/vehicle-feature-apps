// FF가 만든 Flag 상수 — FEAT-00022 1.0.0 「전방 안전거리 3단계」. 키 문자열은 FF 등록 원장과 대사하므로 바꾸지 않는다.
export const CARE_00022_SIGNAL = 'care_00022_signal' as const;
export const CARE_00022_PARAM = 'care_00022_param' as const;
export const FEAT_00022_FLAGS = [CARE_00022_SIGNAL, CARE_00022_PARAM] as const;
