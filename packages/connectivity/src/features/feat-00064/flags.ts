// FF가 만든 Flag 상수 — FEAT-00064 1.3.0 「스마트폰 디지털 키」. 키 문자열은 FF 등록 원장과 대사하므로 바꾸지 않는다.
export const CONNECTIVITY_00064_ENABLE = 'connectivity_00064_enable' as const;
export const CONNECTIVITY_00064_DTC = 'connectivity_00064_dtc' as const;
export const FEAT_00064_FLAGS = [CONNECTIVITY_00064_ENABLE, CONNECTIVITY_00064_DTC] as const;
