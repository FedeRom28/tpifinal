// components/Input.jsx

export default function Input({ type = "text", placeholder, className, onChange, value }) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={`input ${className}`}
        onChange={onChange}
        value={value}
      />
    )
  }
  