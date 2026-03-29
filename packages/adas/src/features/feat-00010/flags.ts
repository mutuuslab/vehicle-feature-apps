// FF가 만든 Flag 상수 — FEAT-00010 2.0.0 「운전자 모니터링 시스템」. 키 문자열은 FF 등록 원장과 대사하므로 바꾸지 않는다.
export const ADAS_00010_ENABLE = 'adas_00010_enable' as const;
export const ADAS_00010_PARAM = 'adas_00010_param' as const;
export const FEAT_00010_FLAGS = [ADAS_00010_ENABLE, ADAS_00010_PARAM] as const;
