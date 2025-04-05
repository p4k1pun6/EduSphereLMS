import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  BookOpenIcon,
  GraduationCapIcon,
  BarChart3Icon,
  ClockIcon,
  TrophyIcon,
  UsersIcon,
} from "lucide-react";
import CourseCard from "./CourseCard";

interface DashboardContentProps {
  userRole?: "admin" | "instructor" | "learner";
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  userRole = "learner",
}) => {
  return (
    <div className="p-6 bg-background w-full">
      <div className="flex flex-col space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back,{" "}
              {userRole === "admin"
                ? "Admin"
                : userRole === "instructor"
                  ? "Professor Smith"
                  : "Alex"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {userRole === "admin"
                ? "Manage your learning platform and monitor system performance."
                : userRole === "instructor"
                  ? "Manage your courses and track student progress."
                  : "Continue your learning journey and track your progress."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" />
              <span>Today: {new Date().toLocaleDateString()}</span>
            </Badge>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {userRole === "admin" && (
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            )}
            <TabsTrigger value="courses">Courses</TabsTrigger>
            {userRole !== "admin" && (
              <TabsTrigger value="progress">Progress</TabsTrigger>
            )}
            {userRole === "instructor" && (
              <TabsTrigger value="students">Students</TabsTrigger>
            )}
          </TabsList>

          {/* Overview Tab Content */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {userRole === "admin" && (
                <>
                  <StatsCard
                    title="Total Users"
                    value="1,248"
                    description="+12% from last month"
                    icon={
                      <UsersIcon className="h-5 w-5 text-muted-foreground" />
                    }
                  />
                  <StatsCard
                    title="Active Courses"
                    value="86"
                    description="+4 new this week"
                    icon={
                      <BookOpenIcon className="h-5 w-5 text-muted-foreground" />
                    }
                  />
                  <StatsCard
                    title="Completion Rate"
                    value="68%"
                    description="+5% from last month"
                    icon={
                      <BarChart3Icon className="h-5 w-5 text-muted-foreground" />
                    }
                  />
                  <StatsCard
                    title="System Uptime"
                    value="99.9%"
                    description="Last 30 days"
                    icon={
                      <ClockIcon className="h-5 w-5 text-muted-foreground" />
                    }
                  />
                </>
              )}

              {userRole === "instructor" && (
                <>
                  <StatsCard
                    title="Active Students"
                    value="248"
                    description="Across all courses"
                    icon={
                      <UsersIcon className="h-5 w-5 text-muted-foreground" />
                    }
                  />
                  <StatsCard
                    title="Your Courses"
                    value="12"
                    description="3 currently active"
                    icon={
                      <BookOpenIcon className="h-5 w-5 text-muted-foreground" />
                    }
                  />
                  <StatsCard
                    title="Avg. Completion"
                    value="72%"
                    description="+8% from last month"
                    icon={
                      <BarChart3Icon className="h-5 w-5 text-muted-foreground" />
                    }
                  />
                  <StatsCard
                    title="Pending Grades"
                    value="18"
                    description="Assignments to review"
                    icon={
                      <GraduationCapIcon className="h-5 w-5 text-muted-foreground" />
                    }
                  />
                </>
              )}

              {userRole === "learner" && (
                <>
                  <StatsCard
                    title="Enrolled Courses"
                    value="6"
                    description="2 in progress"
                    icon={
                      <BookOpenIcon className="h-5 w-5 text-muted-foreground" />
                    }
                  />
                  <StatsCard
                    title="Overall Progress"
                    value="64%"
                    description="Keep going!"
                    icon={
                      <BarChart3Icon className="h-5 w-5 text-muted-foreground" />
                    }
                  />
                  <StatsCard
                    title="Learning Time"
                    value="28h"
                    description="This month"
                    icon={
                      <ClockIcon className="h-5 w-5 text-muted-foreground" />
                    }
                  />
                  <StatsCard
                    title="Achievements"
                    value="12"
                    description="3 new badges"
                    icon={
                      <TrophyIcon className="h-5 w-5 text-muted-foreground" />
                    }
                  />
                </>
              )}
            </div>

            {/* Recent Courses Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {userRole === "admin"
                    ? "Recently Added Courses"
                    : userRole === "instructor"
                      ? "Your Courses"
                      : "Your Learning"}
                </h2>
                <a href="#" className="text-sm text-primary hover:underline">
                  View all
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userRole === "admin" && (
                  <>
                    <CourseCard
                      title="Introduction to Data Science"
                      instructor="Dr. Jane Smith"
                      students={124}
                      lastUpdated="2 days ago"
                      userRole={userRole}
                    />
                    <CourseCard
                      title="Advanced Web Development"
                      instructor="Prof. Michael Johnson"
                      students={98}
                      lastUpdated="1 week ago"
                      userRole={userRole}
                    />
                    <CourseCard
                      title="Business Analytics Fundamentals"
                      instructor="Dr. Robert Chen"
                      students={156}
                      lastUpdated="3 days ago"
                      userRole={userRole}
                    />
                  </>
                )}

                {userRole === "instructor" && (
                  <>
                    <CourseCard
                      title="Introduction to Machine Learning"
                      students={86}
                      progress={65}
                      lastUpdated="Updated yesterday"
                      userRole={userRole}
                    />
                    <CourseCard
                      title="Advanced Algorithms"
                      students={42}
                      progress={80}
                      lastUpdated="Updated 3 days ago"
                      userRole={userRole}
                    />
                    <CourseCard
                      title="Data Structures"
                      students={120}
                      progress={45}
                      lastUpdated="Updated 1 week ago"
                      userRole={userRole}
                    />
                  </>
                )}

                {userRole === "learner" && (
                  <>
                    <CourseCard
                      title="Introduction to Machine Learning"
                      instructor="Dr. Jane Smith"
                      progress={65}
                      deadline="Assignment due in 2 days"
                      userRole={userRole}
                    />
                    <CourseCard
                      title="Advanced Algorithms"
                      instructor="Prof. Michael Johnson"
                      progress={80}
                      deadline="Quiz on Friday"
                      userRole={userRole}
                    />
                    <CourseCard
                      title="Data Structures"
                      instructor="Dr. Robert Chen"
                      progress={45}
                      deadline="Project due in 1 week"
                      userRole={userRole}
                    />
                  </>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Analytics Tab Content (Admin Only) */}
          {userRole === "admin" && (
            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Analytics</CardTitle>
                  <CardDescription>
                    Overview of system performance and user engagement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>User Engagement</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <Progress value={78} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Course Completion Rate</span>
                        <span className="font-medium">68%</span>
                      </div>
                      <Progress value={68} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>System Resource Usage</span>
                        <span className="font-medium">42%</span>
                      </div>
                      <Progress value={42} />
                    </div>
                    <div className="pt-4 text-center">
                      <p className="text-sm text-muted-foreground">
                        Detailed analytics reports are available for download
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Courses Tab Content */}
          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userRole === "admin" && (
                <>
                  <CourseCard
                    title="Introduction to Data Science"
                    instructor="Dr. Jane Smith"
                    students={124}
                    lastUpdated="2 days ago"
                    userRole={userRole}
                  />
                  <CourseCard
                    title="Advanced Web Development"
                    instructor="Prof. Michael Johnson"
                    students={98}
                    lastUpdated="1 week ago"
                    userRole={userRole}
                  />
                  <CourseCard
                    title="Business Analytics Fundamentals"
                    instructor="Dr. Robert Chen"
                    students={156}
                    lastUpdated="3 days ago"
                    userRole={userRole}
                  />
                  <CourseCard
                    title="Artificial Intelligence Basics"
                    instructor="Dr. Sarah Williams"
                    students={112}
                    lastUpdated="5 days ago"
                    userRole={userRole}
                  />
                  <CourseCard
                    title="Digital Marketing Strategies"
                    instructor="Prof. David Lee"
                    students={87}
                    lastUpdated="1 week ago"
                    userRole={userRole}
                  />
                  <CourseCard
                    title="Project Management Professional"
                    instructor="Dr. Emily Chen"
                    students={143}
                    lastUpdated="2 days ago"
                    userRole={userRole}
                  />
                </>
              )}

              {userRole === "instructor" && (
                <>
                  <CourseCard
                    title="Introduction to Machine Learning"
                    students={86}
                    progress={65}
                    lastUpdated="Updated yesterday"
                    userRole={userRole}
                  />
                  <CourseCard
                    title="Advanced Algorithms"
                    students={42}
                    progress={80}
                    lastUpdated="Updated 3 days ago"
                    userRole={userRole}
                  />
                  <CourseCard
                    title="Data Structures"
                    students={120}
                    progress={45}
                    lastUpdated="Updated 1 week ago"
                    userRole={userRole}
                  />
                  <CourseCard
                    title="Computer Architecture"
                    students={65}
                    progress={90}
                    lastUpdated="Updated 2 days ago"
                    userRole={userRole}
                  />
                  <CourseCard
                    title="Database Systems"
                    students={78}
                    progress={60}
                    lastUpdated="Updated 4 days ago"
                    userRole={userRole}
                  />
                  <CourseCard
                    title="Software Engineering Principles"
                    students={92}
                    progress={75}
                    lastUpdated="Updated yesterday"
                    userRole={userRole}
                  />
                </>
              )}

              {userRole === "learner" && (
                <>
                  <CourseCard
                    title="Introduction to Machine Learning"
                    instructor="Dr. Jane Smith"
                    progress={65}
                    deadline="Assignment due in 2 days"
                    userRole={userRole}
                  />
                  <CourseCard
                    title="Advanced Algorithms"
                    instructor="Prof. Michael Johnson"
                    progress={80}
                    deadline="Quiz on Friday"
                    userRole={userRole}
                  />
                  <CourseCard
                    title="Data Structures"
                    instructor="Dr. Robert Chen"
                    progress={45}
                    deadline="Project due in 1 week"
                    userRole={userRole}
                  />
                  <CourseCard
                    title="Web Development Fundamentals"
                    instructor="Prof. Sarah Williams"
                    progress={92}
                    deadline="Completed"
                    userRole={userRole}
                  />
                  <CourseCard
                    title="Database Management"
                    instructor="Dr. David Lee"
                    progress={30}
                    deadline="Module 3 unlocks tomorrow"
                    userRole={userRole}
                  />
                  <CourseCard
                    title="UI/UX Design Principles"
                    instructor="Prof. Emily Chen"
                    progress={0}
                    deadline="Starts next week"
                    userRole={userRole}
                  />
                </>
              )}
            </div>
          </TabsContent>

          {/* Progress Tab Content (Instructor & Learner) */}
          {userRole !== "admin" && (
            <TabsContent value="progress" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {userRole === "instructor"
                      ? "Course Progress Overview"
                      : "Your Learning Progress"}
                  </CardTitle>
                  <CardDescription>
                    {userRole === "instructor"
                      ? "Track student progress across your courses"
                      : "Track your progress across all enrolled courses"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {userRole === "instructor" ? (
                      <>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Introduction to Machine Learning</span>
                            <span className="font-medium">65% completed</span>
                          </div>
                          <Progress value={65} />
                          <p className="text-xs text-muted-foreground">
                            86 students enrolled
                          </p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Advanced Algorithms</span>
                            <span className="font-medium">80% completed</span>
                          </div>
                          <Progress value={80} />
                          <p className="text-xs text-muted-foreground">
                            42 students enrolled
                          </p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Data Structures</span>
                            <span className="font-medium">45% completed</span>
                          </div>
                          <Progress value={45} />
                          <p className="text-xs text-muted-foreground">
                            120 students enrolled
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Introduction to Machine Learning</span>
                            <span className="font-medium">65% completed</span>
                          </div>
                          <Progress value={65} />
                          <p className="text-xs text-muted-foreground">
                            Assignment due in 2 days
                          </p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Advanced Algorithms</span>
                            <span className="font-medium">80% completed</span>
                          </div>
                          <Progress value={80} />
                          <p className="text-xs text-muted-foreground">
                            Quiz on Friday
                          </p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Data Structures</span>
                            <span className="font-medium">45% completed</span>
                          </div>
                          <Progress value={45} />
                          <p className="text-xs text-muted-foreground">
                            Project due in 1 week
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Students Tab Content (Instructor Only) */}
          {userRole === "instructor" && (
            <TabsContent value="students" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Management</CardTitle>
                  <CardDescription>
                    View and manage students across your courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="p-2 text-left font-medium">
                              Student
                            </th>
                            <th className="p-2 text-left font-medium">
                              Course
                            </th>
                            <th className="p-2 text-left font-medium">
                              Progress
                            </th>
                            <th className="p-2 text-left font-medium">
                              Last Activity
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2">Alex Johnson</td>
                            <td className="p-2">
                              Introduction to Machine Learning
                            </td>
                            <td className="p-2">65%</td>
                            <td className="p-2">Yesterday</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">Sarah Williams</td>
                            <td className="p-2">Advanced Algorithms</td>
                            <td className="p-2">78%</td>
                            <td className="p-2">2 days ago</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">Michael Brown</td>
                            <td className="p-2">Data Structures</td>
                            <td className="p-2">42%</td>
                            <td className="p-2">Today</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">Emily Davis</td>
                            <td className="p-2">
                              Introduction to Machine Learning
                            </td>
                            <td className="p-2">90%</td>
                            <td className="p-2">Yesterday</td>
                          </tr>
                          <tr>
                            <td className="p-2">David Lee</td>
                            <td className="p-2">Advanced Algorithms</td>
                            <td className="p-2">55%</td>
                            <td className="p-2">3 days ago</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="text-center">
                      <a
                        href="#"
                        className="text-sm text-primary hover:underline"
                      >
                        View all students
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-muted-foreground">
              {title}
            </span>
            <span className="text-2xl font-bold">{value}</span>
            <span className="text-xs text-muted-foreground">{description}</span>
          </div>
          <div className="rounded-full bg-muted p-2">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardContent;
