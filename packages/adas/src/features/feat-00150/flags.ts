// FF가 만든 Flag 상수 — FEAT-00150 5.5.0 「스마트 크루즈 컨트롤」. 키 문자열은 FF 등록 원장과 대사하므로 바꾸지 않는다.
export const ADAS_00150_ENABLE = 'adas_00150_enable' as const;
export const ADAS_00150_SIGNAL = 'adas_00150_signal' as const;
export const FEAT_00150_FLAGS = [ADAS_00150_ENABLE, ADAS_00150_SIGNAL] as const;
