interface CustomTooltipProps {
  active: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
  customLabel?: string;
  showMultiple?: boolean;
}

const CustomTooltip = ({
  active,
  payload,
  customLabel,
  showMultiple = false,
}: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  if (!showMultiple) {
    const item = payload[0];

    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        {customLabel ? (
          <p className="font-semibold text-gray-500 mb-2">{customLabel}</p>
        ) : (
          <p>{payload[0].payload.name}</p>
        )}
        <div className="flex items-center gap-2">
          <CustomTooltipItem item={item} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
      {customLabel && (
        <p className="font-semibold text-gray-500 mb-2">{customLabel}</p>
      )}
      <div className="space-y-1">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {payload.map((item: any, index: number) => (
          <CustomTooltipItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const CustomTooltipItem = ({ item }: { item: any }) => {
  return (
    <div className="flex items-center gap-2 py-0.5">
      <div
        className="w-3 h-3 rounded-full"
        style={{
          backgroundColor: item.color || item.payload?.fill || item.fill,
        }}
      />
      <span className="text-sm text-gray-600">{item.name}:</span>
      <span className="text-sm font-medium text-gray-500">{item.value}</span>
    </div>
  );
};

export default CustomTooltip;
