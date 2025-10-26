interface ChartHeaderProps {
  title: string;
  description: string;
}

const ChartHeader = ({ title, description }: ChartHeaderProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-sm text-gray-500 mt-2">{description}</p>
    </div>
  );
};

export default ChartHeader;
