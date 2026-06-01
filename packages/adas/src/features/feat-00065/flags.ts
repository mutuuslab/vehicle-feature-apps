// FF가 만든 Flag 상수 — FEAT-00065 1.2.0 「지능형 속도 제한 보조」. 키 문자열은 FF 등록 원장과 대사하므로 바꾸지 않는다.
export const ADAS_00065_ENABLE = 'adas_00065_enable' as const;
export const FEAT_00065_FLAGS = [ADAS_00065_ENABLE] as const;
