// FF가 만든 Flag 상수 — FEAT-00030 1.0.1 「고속도로 IC·JC 상세 안내」. 키 문자열은 FF 등록 원장과 대사하므로 바꾸지 않는다.
export const IVI_00030_ENABLE = 'ivi_00030_enable' as const;
export const IVI_00030_SIGNAL = 'ivi_00030_signal' as const;
export const IVI_00030_DETAIL = 'ivi_00030_detail' as const;
export const FEAT_00030_FLAGS = [IVI_00030_ENABLE, IVI_00030_SIGNAL, IVI_00030_DETAIL] as const;
