// FF가 만든 Flag 상수 — FEAT-00005 5.5.0 「스마트 크루즈 컨트롤」. 키 문자열은 FF 등록 원장과 대사하므로 바꾸지 않는다.
export const ADAS_00005_ENABLE = 'adas_00005_enable' as const;
export const ADAS_00005_SIGNAL = 'adas_00005_signal' as const;
export const FEAT_00005_FLAGS = [ADAS_00005_ENABLE, ADAS_00005_SIGNAL] as const;
