// FF가 만든 Flag 상수 — FEAT-00033 1.0.0 「고속도로 IC·JC 상세 안내」. 키 문자열은 FF 등록 원장과 대사하므로 바꾸지 않는다.
export const IVI_00033_ENABLE = 'ivi_00033_enable' as const;
export const IVI_00033_SIGNAL = 'ivi_00033_signal' as const;
export const FEAT_00033_FLAGS = [IVI_00033_ENABLE, IVI_00033_SIGNAL] as const;
