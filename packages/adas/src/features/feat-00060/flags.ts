// FF가 만든 Flag 상수 — FEAT-00060 2.0.0 「운전자 모니터링 시스템」. 키 문자열은 FF 등록 원장과 대사하므로 바꾸지 않는다.
export const ADAS_00060_ENABLE = 'adas_00060_enable' as const;
export const ADAS_00060_PARAM = 'adas_00060_param' as const;
export const FEAT_00060_FLAGS = [ADAS_00060_ENABLE, ADAS_00060_PARAM] as const;
