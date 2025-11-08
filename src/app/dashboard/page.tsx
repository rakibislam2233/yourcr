export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-medium text-gray-700">Total Users</h3>
          <p className="text-3xl font-bold text-primary mt-2">1,248</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-medium text-gray-700">Revenue</h3>
          <p className="text-3xl font-bold text-secondary mt-2">$12,458</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-medium text-gray-700">Orders</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">248</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center p-3 border-b border-gray-100">
            <div className="bg-primary w-2 h-2 rounded-full mr-3"></div>
            <div>
              <p className="font-medium">New user registration</p>
              <p className="text-sm text-gray-500">John Doe joined 10 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 border-b border-gray-100">
            <div className="bg-secondary w-2 h-2 rounded-full mr-3"></div>
            <div>
              <p className="font-medium">Order completed</p>
              <p className="text-sm text-gray-500">Order #4521 was completed</p>
            </div>
          </div>
          <div className="flex items-center p-3">
            <div className="bg-primary w-2 h-2 rounded-full mr-3"></div>
            <div>
              <p className="font-medium">Payment received</p>
              <p className="text-sm text-gray-500">$245 payment received</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}