import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Calendar,
  MessageSquare,
  Award,
  Settings,
  Users,
  BarChart3,
  FileText,
  Home,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type UserRole = "admin" | "instructor" | "learner";

interface SidebarProps {
  userRole?: UserRole;
  userName?: string;
  userAvatar?: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar = ({
  userRole = "learner",
  userName = "John Doe",
  userAvatar = "",
  collapsed = false,
  onToggleCollapse = () => {},
}: SidebarProps) => {
  const [open, setOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({
    courses: false,
    users: false,
    reports: false,
  });

  const toggleSubmenu = (key: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const navItems = [
    {
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      href: "/",
      roles: ["admin", "instructor", "learner"],
    },
    {
      label: "Courses",
      icon: <BookOpen className="h-5 w-5" />,
      href: "/courses",
      roles: ["admin", "instructor", "learner"],
      submenu:
        userRole === "admin" || userRole === "instructor"
          ? [
              { label: "All Courses", href: "/courses" },
              { label: "Create Course", href: "/courses/create" },
              { label: "Categories", href: "/courses/categories" },
            ]
          : [
              { label: "My Courses", href: "/courses" },
              { label: "Enrolled Courses", href: "/courses/enrolled" },
              { label: "Completed Courses", href: "/courses/completed" },
            ],
    },
    {
      label: "Calendar",
      icon: <Calendar className="h-5 w-5" />,
      href: "/calendar",
      roles: ["admin", "instructor", "learner"],
    },
    {
      label: "Messages",
      icon: <MessageSquare className="h-5 w-5" />,
      href: "/messages",
      roles: ["admin", "instructor", "learner"],
    },
    {
      label: "Grades",
      icon: <Award className="h-5 w-5" />,
      href: "/grades",
      roles: ["instructor", "learner"],
    },
    {
      label: "Users",
      icon: <Users className="h-5 w-5" />,
      href: "/users",
      roles: ["admin"],
      submenu: [
        { label: "All Users", href: "/users" },
        { label: "Add User", href: "/users/add" },
        { label: "Roles & Permissions", href: "/users/roles" },
      ],
    },
    {
      label: "Reports",
      icon: <BarChart3 className="h-5 w-5" />,
      href: "/reports",
      roles: ["admin", "instructor"],
      submenu:
        userRole === "admin"
          ? [
              { label: "System Analytics", href: "/reports/system" },
              { label: "User Activity", href: "/reports/activity" },
              { label: "Course Completion", href: "/reports/completion" },
            ]
          : [
              { label: "Student Progress", href: "/reports/progress" },
              { label: "Course Analytics", href: "/reports/course-analytics" },
            ],
    },
    {
      label: "Content",
      icon: <FileText className="h-5 w-5" />,
      href: "/content",
      roles: ["admin", "instructor"],
    },
    {
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/settings",
      roles: ["admin", "instructor", "learner"],
    },
  ];

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(userRole),
  );

  const renderNavItems = () => {
    return filteredNavItems.map((item, index) => {
      if (item.submenu) {
        return (
          <Collapsible
            key={index}
            open={openSubmenus[item.label.toLowerCase()]}
            onOpenChange={() => toggleSubmenu(item.label.toLowerCase())}
            className="w-full"
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 px-3 py-2 text-left",
                  openSubmenus[item.label.toLowerCase()] && "bg-accent",
                )}
              >
                {item.icon}
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {openSubmenus[item.label.toLowerCase()] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-10">
              {item.submenu.map((subItem, subIndex) => (
                <Link key={subIndex} to={subItem.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start py-1 text-sm font-normal"
                  >
                    {subItem.label}
                  </Button>
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>
        );
      }

      return (
        <Link key={index} to={item.href}>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 px-3 py-2 text-left"
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </Button>
        </Link>
      );
    });
  };

  // Mobile sidebar using Sheet component
  const MobileSidebar = () => (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0">
        <div className="flex h-full flex-col bg-background">
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {userRole}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2">{renderNavItems()}</div>
        </div>
      </SheetContent>
    </Sheet>
  );

  // Desktop sidebar
  const DesktopSidebar = () => (
    <div
      className={cn(
        "hidden h-full flex-col border-r bg-background transition-all duration-300 md:flex",
        collapsed ? "w-[70px]" : "w-[280px]",
      )}
    >
      <div className="flex items-center justify-between border-b p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {userRole}
              </p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className={collapsed ? "mx-auto" : ""}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-2">{renderNavItems()}</div>
    </div>
  );

  return (
    <>
      <MobileSidebar />
      <DesktopSidebar />
    </>
  );
};

// Missing ChevronLeft icon definition
const ChevronLeft = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

export default Sidebar;
