// FF가 만든 Flag 상수 — FEAT-00163 3.7.0 「차로 유지 보조」. 키 문자열은 FF 등록 원장과 대사하므로 바꾸지 않는다.
export const ADAS_00163_ENABLE = 'adas_00163_enable' as const;
export const ADAS_00163_SIGNAL = 'adas_00163_signal' as const;
export const FEAT_00163_FLAGS = [ADAS_00163_ENABLE, ADAS_00163_SIGNAL] as const;
