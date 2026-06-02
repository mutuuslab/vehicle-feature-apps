// FF가 만든 Flag 상수 — FEAT-00067 1.2.0 「지능형 속도 제한 보조」. 키 문자열은 FF 등록 원장과 대사하므로 바꾸지 않는다.
export const ADAS_00067_ENABLE = 'adas_00067_enable' as const;
export const ADAS_00067_PARAM = 'adas_00067_param' as const;
export const FEAT_00067_FLAGS = [ADAS_00067_ENABLE, ADAS_00067_PARAM] as const;
