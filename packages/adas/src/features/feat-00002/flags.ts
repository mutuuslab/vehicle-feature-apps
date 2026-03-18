// FF가 만든 Flag 상수 — FEAT-00002 1.6.0 「주차 충돌방지 보조」. 키 문자열은 FF 등록 원장과 대사하므로 바꾸지 않는다.
export const ADAS_00002_ENABLE = 'adas_00002_enable' as const;
export const ADAS_00002_SIGNAL = 'adas_00002_signal' as const;
export const FEAT_00002_FLAGS = [ADAS_00002_ENABLE, ADAS_00002_SIGNAL] as const;
