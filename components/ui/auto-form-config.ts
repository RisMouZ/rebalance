import {
  AutoFormCheckbox,
  AutoFormDate,
  AutoFormEnum,
  AutoFormEnumMultiInput,
  AutoFormFile,
  AutoFormInput,
  AutoFormNumber,
  AutoFormRadioGroup,
  AutoFormSwitch,
  AutoFormTextarea,
} from "@/components/ui/auto-form-fields";

export const INPUT_COMPONENTS = {
  checkbox: AutoFormCheckbox,
  date: AutoFormDate,
  select: AutoFormEnum,
  radio: AutoFormRadioGroup,
  switch: AutoFormSwitch,
  textarea: AutoFormTextarea,
  number: AutoFormNumber,
  file: AutoFormFile,
  fallback: AutoFormInput,

  selectmultiinput: AutoFormEnumMultiInput,
};

/**
 * Define handlers for specific Zod types.
 * You can expand this object to support more types.
 */
export const DEFAULT_ZOD_HANDLERS: {
  [key: string]: keyof typeof INPUT_COMPONENTS;
} = {
  ZodBoolean: "checkbox",
  ZodDate: "date",
  ZodEnum: "select",
  ZodNativeEnum: "select",
  ZodNumber: "number",
};
