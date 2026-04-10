// FF가 만든 Flag 상수 — FEAT-00026 1.0.0 「급가속 억제」. 키 문자열은 FF 등록 원장과 대사하므로 바꾸지 않는다.
export const CHASSIS_00026_ENABLE = 'chassis_00026_enable' as const;
export const CHASSIS_00026_PARAM = 'chassis_00026_param' as const;
export const FEAT_00026_FLAGS = [CHASSIS_00026_ENABLE, CHASSIS_00026_PARAM] as const;
