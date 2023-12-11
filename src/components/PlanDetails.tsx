const PlanDetails: React.FunctionComponent<{ list: string[] }> = ({ list }) => (
  <>
    {list.map((item, i) => (
      <li
        className="marker-list-item font-medium text-darkGrade100 mb-3"
        key={i}
      >
        {item}
      </li>
    ))}
  </>
);

export default PlanDetails;
