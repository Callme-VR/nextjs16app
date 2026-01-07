import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface FormFieldProps {
  label: string;
  name: string;
  id: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  helperText?: string;
  textarea?: boolean;
  value?: string;
}

export const FormField = ({
  label,
  name,
  id,
  placeholder,
  required = false,
  onChange,
  error,
  helperText,
  textarea = false,
  value = "",
}: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          value={value}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      ) : (
        <Input
          type="text"
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          value={value}
        />
      )}
      {helperText && <p className="text-gray-500 text-sm">{helperText}</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
