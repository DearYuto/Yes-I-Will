interface ChartBodyProps {
  children: React.ReactNode;
}

const ChartBody = ({ children }: ChartBodyProps) => {
  return (
    <div className="flex mb-6 gap-6 rounded-lg border border-gray-200 bg-white p-6">
      {children}
    </div>
  );
};

export default ChartBody;
