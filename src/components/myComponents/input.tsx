import { useField } from 'formik';

interface Props {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
}

const Input = ({ label, ...props }: Props) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-sm">{label}</label>
      <input {...field} {...props} className="w-full outline-none py-1 px-3 shadow-sm bg-white rounded-full placeholder:text-xs" autoComplete='off'/>
      {meta.touched && meta.error && <p className="text-red-500 text-xs">{meta.error}</p>}
    </div>
  );
};

export default Input;
