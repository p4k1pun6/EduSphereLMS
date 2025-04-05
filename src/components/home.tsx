import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DashboardLayout from "./layout/DashboardLayout";
import DashboardContent from "./dashboard/DashboardContent";

interface UserProfile {
  name: string;
  role: "admin" | "instructor" | "learner";
  avatar?: string;
}

const Home = () => {
  // Mock user data - in a real app, this would come from authentication
  const [user, setUser] = useState<UserProfile>({
    name: "Jane Doe",
    role: "learner",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
  });

  // Function to switch roles for demo purposes
  const switchRole = (role: "admin" | "instructor" | "learner") => {
    setUser({ ...user, role });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Role Switcher for Demo Purposes */}
      <div className="fixed top-2 right-2 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Switch Role <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => switchRole("admin")}>
              Admin
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => switchRole("instructor")}>
              Instructor
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => switchRole("learner")}>
              Learner
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <DashboardLayout
        userRole={user.role}
        userName={user.name}
        userAvatar={user.avatar}
        notificationCount={3}
      >
        <DashboardContent userRole={user.role} />
      </DashboardLayout>
    </div>
  );
};

export default Home;
