// FF가 만든 Flag 상수 — FEAT-00185 5.4.2 「스마트 크루즈 컨트롤」. 키 문자열은 FF 등록 원장과 대사하므로 바꾸지 않는다.
export const ADAS_00185_ENABLE = 'adas_00185_enable' as const;
export const ADAS_00185_SIGNAL = 'adas_00185_signal' as const;
export const FEAT_00185_FLAGS = [ADAS_00185_ENABLE, ADAS_00185_SIGNAL] as const;
