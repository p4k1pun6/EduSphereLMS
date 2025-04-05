import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, BookOpen, MoreVertical, Play } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CourseCardProps {
  id?: string;
  title?: string;
  description?: string;
  instructor?: string;
  progress?: number;
  dueDate?: string;
  category?: string;
  thumbnail?: string;
  userRole?: "admin" | "instructor" | "learner";
  lastAccessed?: string;
}

const CourseCard = ({
  id = "1",
  title = "Introduction to React",
  description = "Learn the fundamentals of React including components, state, and props.",
  instructor = "Jane Smith",
  progress = 65,
  dueDate = "2023-12-15",
  category = "Web Development",
  thumbnail = "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
  userRole = "learner",
  lastAccessed = "2 days ago",
}: CourseCardProps) => {
  // Format the due date
  const formattedDueDate = new Date(dueDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="w-full max-w-[350px] overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-[140px] overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-3 right-3" variant="secondary">
          {category}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold line-clamp-1">
            {title}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {userRole === "admin" && (
                <>
                  <DropdownMenuItem>Edit Course</DropdownMenuItem>
                  <DropdownMenuItem>Manage Enrollments</DropdownMenuItem>
                  <DropdownMenuItem>View Analytics</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    Archive Course
                  </DropdownMenuItem>
                </>
              )}
              {userRole === "instructor" && (
                <>
                  <DropdownMenuItem>Edit Content</DropdownMenuItem>
                  <DropdownMenuItem>Grade Assignments</DropdownMenuItem>
                  <DropdownMenuItem>View Student Progress</DropdownMenuItem>
                </>
              )}
              {userRole === "learner" && (
                <>
                  <DropdownMenuItem>Mark as Favorite</DropdownMenuItem>
                  <DropdownMenuItem>Download Materials</DropdownMenuItem>
                  <DropdownMenuItem>View Grades</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="line-clamp-2 text-sm text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <BookOpen className="mr-1 h-4 w-4" />
          <span>Instructor: {instructor}</span>
        </div>

        {userRole === "learner" && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {(userRole === "admin" || userRole === "instructor") && (
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>Last updated: {lastAccessed}</span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between pt-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-1 h-4 w-4" />
          <span>Due: {formattedDueDate}</span>
        </div>

        <Button size="sm" className="gap-1">
          <Play className="h-4 w-4" />
          {userRole === "learner" ? "Continue" : "View"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
