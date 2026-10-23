const Sidebar = () => {
  return (
    <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-gray-800 text-white p-4">
      
      <ul className="space-y-2">

        <li>
          <a
            href="#overview"
            className="block p-3 text-lg rounded-lg hover:bg-gray-700 hover:text-gray-300"
          >
            Overview
          </a>
        </li>

        <li>
          <a
            href="#mylinks"
            className="block p-3 text-lg rounded-lg hover:bg-gray-700 hover:text-gray-300"
          >
            My Links
          </a>
        </li>

        <li>
          <a
            href="#analytics"
            className="block p-3 text-lg rounded-lg hover:bg-gray-700 hover:text-gray-300"
          >
            Analytics
          </a>
        </li>

        <li>
          <a
            href="#appearance"
            className="block p-3 text-lg rounded-lg hover:bg-gray-700 hover:text-gray-300"
          >
            Appearance
          </a>
        </li>

        <li>
          <a
            href="#settings"
            className="block p-3 text-lg rounded-lg hover:bg-gray-700 hover:text-gray-300"
          >
            Settings
          </a>
        </li>

      </ul>

    </aside>
  );
};

export default Sidebar;