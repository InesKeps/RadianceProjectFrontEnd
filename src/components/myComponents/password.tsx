import { useField } from 'formik';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface Props {
  label: string;
  name: string;
  placeholder: string;
}

const Password = ({ label, name , placeholder}: Props) => {
  const [show, setShow] = useState(false);
  const [field, meta] = useField(name);

  return (
    <div className="">
      <label className="font-medium text-sm mb-2">{label}</label>
      <div className="relative">
        <input
          {...field}
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          className="w-full outline-none py-1 px-3 bg-white shadow-sm rounded-full placeholder:text-xs"
          autoComplete='new-password'
        />
         <span
          onClick={() => setShow(!show)}
          className="absolute right-3 top-2 cursor-pointer text-gray-600"
        >
          {show ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
        </span>
      </div>
      {meta.touched && meta.error && <p className="text-red-500 text-xs">{meta.error}</p>}
    </div>
  );
};

export default Password;
