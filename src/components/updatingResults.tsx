const UpdatingResults = () => {
  return (
    <div className="max-h-full h-80 relative">
      <div className="flex items-center justify-center bg-white absolute left-px right-px top-[55px] bottom-[47px] z-50">
        <div className="inline-flex items-center justify-center flex-col">
          <div className="spinner"></div>
          <div className="font-semibold text-primaryColor mt-3">
            Updating Results
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatingResults;
