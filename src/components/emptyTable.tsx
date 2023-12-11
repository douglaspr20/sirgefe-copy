import Image from 'next/image';

const EmptyTable = () => {
  return (
    <div className="flex flex-col justify-center items-center justify-center py-20 px-5">
      <div className="mb-2">
        <Image
          src="./images/empty-fable-img.svg"
          alt="Empty table"
          width={10}
          height={10}
        />
      </div>
      <h5 className="h5 mb-3 text-textSecondaryColor">
        We can’t find results with the selected filters
      </h5>
      <p className="text-textTeriraryColor text-center mb-3">
        Reset filters or change to try again
      </p>
      <button className="btn">Reset filters</button>
    </div>
  );
};

export default EmptyTable;
