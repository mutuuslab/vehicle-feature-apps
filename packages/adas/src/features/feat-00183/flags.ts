// FF가 만든 Flag 상수 — FEAT-00183 5.4.2 「스마트 크루즈 컨트롤」. 키 문자열은 FF 등록 원장과 대사하므로 바꾸지 않는다.
export const ADAS_00183_ENABLE = 'adas_00183_enable' as const;
export const ADAS_00183_SIGNAL = 'adas_00183_signal' as const;
export const FEAT_00183_FLAGS = [ADAS_00183_ENABLE, ADAS_00183_SIGNAL] as const;
