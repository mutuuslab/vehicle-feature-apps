// FF가 만든 Flag 상수 — FEAT-00175 1.0.0 「증강현실 HUD 내비게이션」. 키 문자열은 FF 등록 원장과 대사하므로 바꾸지 않는다.
export const IVI_00175_ENABLE = 'ivi_00175_enable' as const;
export const IVI_00175_SIGNAL = 'ivi_00175_signal' as const;
export const FEAT_00175_FLAGS = [IVI_00175_ENABLE, IVI_00175_SIGNAL] as const;
