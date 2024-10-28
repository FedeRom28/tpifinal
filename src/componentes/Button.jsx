// components/Button.jsx

export default function Button({ children, onClick, variant = "primary", className }) {
    const variantClass = variant === "ghost" ? "button--ghost" : "button--primary"
  
    return (
      <button onClick={onClick} className={`button ${variantClass} ${className}`}>
        {children}
      </button>
    )
  }
  