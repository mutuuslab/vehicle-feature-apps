// FF가 만든 Flag 상수 — FEAT-00004 4.1.0 「고속도로 주행 보조 2」. 키 문자열은 FF 등록 원장과 대사하므로 바꾸지 않는다.
export const ADAS_00004_ENABLE = 'adas_00004_enable' as const;
export const ADAS_00004_PARAM = 'adas_00004_param' as const;
export const FEAT_00004_FLAGS = [ADAS_00004_ENABLE, ADAS_00004_PARAM] as const;
