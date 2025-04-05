import React, { useState } from "react";
import { Menu, X, Bell, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardContent from "@/components/dashboard/DashboardContent";

interface DashboardLayoutProps {
  children?: React.ReactNode;
  userRole?: "admin" | "instructor" | "learner";
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
}

const DashboardLayout = ({
  children,
  userRole = "learner",
  userName = "John Doe",
  userAvatar = "",
  notificationCount = 3,
}: DashboardLayoutProps) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <div
        className={`hidden md:block ${sidebarCollapsed ? "w-[70px]" : "w-[280px]"} transition-all duration-300 h-full`}
      >
        <Sidebar
          userRole={userRole}
          userName={userName}
          userAvatar={userAvatar}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden absolute top-4 left-4 z-10"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-[280px]">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">LMS Dashboard</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <Sidebar
            userRole={userRole}
            userName={userName}
            userAvatar={userAvatar}
          />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-4 md:px-6 bg-background">
          <div className="flex items-center md:hidden">
            {/* Spacer for mobile to account for the absolute positioned menu button */}
            <div className="w-8"></div>
          </div>

          <div className="hidden md:block">
            <h1 className="text-xl font-semibold">
              {userRole === "admin" && "Admin Dashboard"}
              {userRole === "instructor" && "Instructor Dashboard"}
              {userRole === "learner" && "Learning Dashboard"}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                  variant="destructive"
                >
                  {notificationCount}
                </Badge>
              )}
            </Button>

            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {userRole}
                </p>
              </div>
            </div>

            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children || <DashboardContent userRole={userRole} />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
