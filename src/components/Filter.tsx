interface FilterProps {
  handleUserIdChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[] | number[];
  value?: string | number;
}

const Filter: React.FC<FilterProps> = ({
  handleUserIdChange,
  options,
  value,
}) => {
  return (
    <>
      <select onChange={handleUserIdChange} value={value || ''}>
        <option value=''>All</option>
        {options.map((id) => (
          <option key={id} value={id || ''}>
            User {id}
          </option>
        ))}
      </select>
    </>
  );
};

export default Filter;
