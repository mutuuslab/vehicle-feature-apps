// FF가 만든 Flag 상수 — FEAT-00015 1.2.0 「지능형 속도 제한 보조」. 키 문자열은 FF 등록 원장과 대사하므로 바꾸지 않는다.
export const ADAS_00015_ENABLE = 'adas_00015_enable' as const;
export const ADAS_00015_PARAM = 'adas_00015_param' as const;
export const FEAT_00015_FLAGS = [ADAS_00015_ENABLE, ADAS_00015_PARAM] as const;
