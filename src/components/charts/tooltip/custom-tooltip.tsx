interface CustomTooltipProps {
  active: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
  customLabel?: string;
}

const CustomTooltip = ({
  active,
  payload,
  customLabel,
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        <p className="font-semibold text-gray-500 mb-1">
          {payload[0].payload.brand}
        </p>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded"
            style={{ backgroundColor: payload[0].payload.fill }}
          />
          <span className="text-sm text-gray-600">
            {customLabel ?? payload[0].name}:
          </span>
          <span className="text-sm font-medium text-gray-500">
            {payload[0].value}%
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
