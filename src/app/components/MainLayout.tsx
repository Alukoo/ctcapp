import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Heart, MoreHorizontal } from "lucide-react";

export function MainLayout() {
  const location = useLocation();

  const tabs = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/hymns", icon: BookOpen, label: "Hymns" },
    { path: "/favorites", icon: Heart, label: "Favorites" },
    { path: "/resources", icon: MoreHorizontal, label: "More" },
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Content Area */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* iOS-style Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200 safe-area-inset-bottom">
        <div className="max-w-md mx-auto flex justify-around items-center px-4 py-2">
          {tabs.map((tab) => {
            const isActive =
              location.pathname === tab.path ||
              (tab.path !== "/" && location.pathname.startsWith(tab.path));
            const Icon = tab.icon;

            return (
              <Link
                key={tab.path}
                to={tab.path}
                className="flex flex-col items-center justify-center py-1 px-4 min-w-[64px] group"
              >
                <div
                  className={`rounded-2xl px-6 py-2 transition-all duration-300 flex flex-col items-center justify-center ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 scale-105"
                      : "group-hover:bg-blue-50 bg-transparent"
                  }`}
                >
                  <Icon
                    className="w-6 h-6 text-white transition-colors"
                  />
                </div>
                <span
                  className="text-xs mt-1 text-white transition-colors"
                >
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
