// FF가 만든 Flag 상수 — FEAT-00001 2.1.0 「원격 스마트 주차 보조」. 키 문자열은 FF 등록 원장과 대사하므로 바꾸지 않는다.
export const ADAS_00001_ENABLE = 'adas_00001_enable' as const;
export const ADAS_00001_PARAM = 'adas_00001_param' as const;
export const ADAS_00001_SIGNAL = 'adas_00001_signal' as const;
export const FEAT_00001_FLAGS = [ADAS_00001_ENABLE, ADAS_00001_PARAM, ADAS_00001_SIGNAL] as const;
