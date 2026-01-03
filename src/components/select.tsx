import { useField } from "formik";

interface Props {
  label: string;
  name: string;
  options: { value: string; label: string }[];
}

const Select = ({ label, options, ...props }: Props) => {
  const [field, meta] = useField(props);

  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-sm">{label}</label>
      <select
        {...field}
        {...props}
        className="w-full outline-none py-1 px-3 shadow-sm bg-white rounded-full text-sm"
      >
        <option value="" disabled>
          -- Sélectionnez une option --
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error && (
        <p className="text-red-500 text-xs">{meta.error}</p>
      )}
    </div>
  );
};

export default Select;
