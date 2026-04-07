// FF가 만든 Flag 상수 — FEAT-00023 1.0.0 「급가속 억제」. 키 문자열은 FF 등록 원장과 대사하므로 바꾸지 않는다.
export const CHASSIS_00023_ENABLE = 'chassis_00023_enable' as const;
export const CHASSIS_00023_PARAM = 'chassis_00023_param' as const;
export const FEAT_00023_FLAGS = [CHASSIS_00023_ENABLE, CHASSIS_00023_PARAM] as const;
