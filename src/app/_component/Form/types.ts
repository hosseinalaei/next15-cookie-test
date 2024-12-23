interface Input {
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  labelClassName?: string;
  required?: boolean;
  onchange?: (value: any) => void;
  name?: string;
  register?: () => void;
  validationSchema?: any;
  id?: string;
  fieldName?: string;
  // [key: string]: any;
}
