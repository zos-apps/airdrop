import { useState } from 'react';

interface Device {
  id: string;
  name: string;
  type: 'mac' | 'iphone' | 'ipad';
  status: 'available' | 'busy';
}

const AirDrop: React.FC = () => {
  const [devices] = useState<Device[]>([
    { id: '1', name: "Zach's MacBook", type: 'mac', status: 'available' },
    { id: '2', name: "Zach's iPhone", type: 'iphone', status: 'available' },
    { id: '3', name: "iPad Pro", type: 'ipad', status: 'busy' },
  ]);
  const [sending, setSending] = useState<string | null>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case 'mac': return '💻';
      case 'iphone': return '📱';
      case 'ipad': return '📱';
      default: return '📱';
    }
  };

  return (
    <div className="h-full bg-gradient-to-b from-blue-500 to-blue-700 text-white p-6 flex flex-col items-center">
      <div className="text-6xl mb-4">📡</div>
      <h1 className="text-2xl font-light mb-2">AirDrop</h1>
      <p className="text-blue-200 text-sm mb-8">Drop files to share with nearby devices</p>

      <div className="w-full max-w-sm">
        {/* Drop Zone */}
        <div className="border-2 border-dashed border-white/40 rounded-xl p-8 text-center mb-6 hover:border-white/60 transition-colors">
          <div className="text-4xl mb-2">📁</div>
          <div className="text-sm">Drop files here to share</div>
        </div>

        {/* Nearby Devices */}
        <div className="text-sm text-blue-200 mb-3">Nearby Devices</div>
        <div className="space-y-2">
          {devices.map(device => (
            <button
              key={device.id}
              onClick={() => {
                if (device.status === 'available') {
                  setSending(device.id);
                  setTimeout(() => setSending(null), 2000);
                }
              }}
              disabled={device.status === 'busy' || sending !== null}
              className={`w-full p-4 rounded-xl flex items-center gap-3 transition-all ${
                device.status === 'available' 
                  ? 'bg-white/20 hover:bg-white/30' 
                  : 'bg-white/10 opacity-50'
              }`}
            >
              <span className="text-2xl">{getIcon(device.type)}</span>
              <div className="text-left flex-1">
                <div className="font-medium">{device.name}</div>
                <div className="text-xs text-blue-200">
                  {sending === device.id ? 'Sending...' : device.status}
                </div>
              </div>
              {sending === device.id && (
                <div className="animate-spin">🔄</div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AirDrop;
