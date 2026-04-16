// FF가 만든 Flag 상수 — FEAT-00032 1.0.0 「급가속 억제」. 키 문자열은 FF 등록 원장과 대사하므로 바꾸지 않는다.
export const CHASSIS_00032_ENABLE = 'chassis_00032_enable' as const;
export const CHASSIS_00032_PARAM = 'chassis_00032_param' as const;
export const FEAT_00032_FLAGS = [CHASSIS_00032_ENABLE, CHASSIS_00032_PARAM] as const;
