// FF가 만든 Flag 상수 — FEAT-00011 1.3.0 「스마트폰 디지털 키」. 키 문자열은 FF 등록 원장과 대사하므로 바꾸지 않는다.
export const CONNECTIVITY_00011_ENABLE = 'connectivity_00011_enable' as const;
export const CONNECTIVITY_00011_DTC = 'connectivity_00011_dtc' as const;
export const FEAT_00011_FLAGS = [CONNECTIVITY_00011_ENABLE, CONNECTIVITY_00011_DTC] as const;
