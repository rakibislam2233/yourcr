import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-primary">Dashboard</h2>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link href="#" className="block p-2 rounded hover:bg-gray-100 text-primary">Home</Link>
          </li>
          <li>
            <Link href="#" className="block p-2 rounded hover:bg-gray-100 text-primary">Profile</Link>
          </li>
          <li>
            <Link href="#" className="block p-2 rounded hover:bg-gray-100 text-primary">Settings</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;