const Toast = ({ message }) => {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 
      bg-green-600 text-white px-5 py-2 rounded-lg shadow-lg 
      animate-slideDown"
    >
      {message}
    </div>
  );
};

export default Toast;
