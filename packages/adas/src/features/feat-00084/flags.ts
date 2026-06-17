// FF가 만든 Flag 상수 — FEAT-00084 5.4.2 「스마트 크루즈 컨트롤」. 키 문자열은 FF 등록 원장과 대사하므로 바꾸지 않는다.
export const ADAS_00084_ENABLE = 'adas_00084_enable' as const;
export const ADAS_00084_SIGNAL = 'adas_00084_signal' as const;
export const FEAT_00084_FLAGS = [ADAS_00084_ENABLE, ADAS_00084_SIGNAL] as const;
