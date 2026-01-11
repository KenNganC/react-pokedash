import { Bug, RefreshCw } from "lucide-react";

const Error = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) => (
  <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
    <div className="bg-red-50 p-4 rounded-full mb-4">
      <Bug className="w-8 h-8 text-red-500" />
    </div>
    <h3 className="text-lg font-semibold text-slate-800 mb-2">
      Oops! Something went wrong
    </h3>
    <p className="mb-6 max-w-sm">{message}</p>
    <button
      onClick={onRetry}
      className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-700 transition-colors"
    >
      <RefreshCw className="w-4 h-4" />
      Try Again
    </button>
  </div>
);

export default Error;
