"use client";

import { useState } from "react";
import {
  Calendar,
  Users,
  BarChart2,
  Settings,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("events");

  // Dummy data
  const pendingEvents = [
    { id: 1, title: "Tech Conference", organizer: "TechCo", date: "2025-04-15", category: "Conference" },
    { id: 2, title: "AI Workshop", organizer: "DevHub", date: "2025-04-20", category: "Workshop" },
    { id: 3, title: "Startup Pitch Day", organizer: "StartUp Inc.", date: "2025-04-25", category: "Competition" },
  ];

  const approvedEvents = [
    { id: 4, title: "Annual Developer Summit", organizer: "Dev Community", date: "2025-05-01", category: "Conference" },
    { id: 5, title: "Data Science Bootcamp", organizer: "Education Hub", date: "2025-05-10", category: "Workshop" },
  ];

  const users = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Organizer" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Admin" },
    { id: 3, name: "Carol Williams", email: "carol@example.com", role: "Attendee" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4 border-b font-bold text-lg">Admin Panel</div>
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab("events")}
            className={`flex items-center gap-2 w-full text-left p-2 rounded-md ${
              activeTab === "events"
                ? "bg-purple-100 text-purple-700"
                : "hover:bg-gray-100"
            }`}
          >
            <Calendar size={18} />
            Events
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-2 w-full text-left p-2 rounded-md ${
              activeTab === "users"
                ? "bg-purple-100 text-purple-700"
                : "hover:bg-gray-100"
            }`}
          >
            <Users size={18} />
            Users
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-2 w-full text-left p-2 rounded-md ${
              activeTab === "analytics"
                ? "bg-purple-100 text-purple-700"
                : "hover:bg-gray-100"
            }`}
          >
            <BarChart2 size={18} />
            Analytics
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 w-full text-left p-2 rounded-md ${
              activeTab === "settings"
                ? "bg-purple-100 text-purple-700"
                : "hover:bg-gray-100"
            }`}
          >
            <Settings size={18} />
            Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center mb-6 rounded-md">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <Input type="search" placeholder="Search..." className="w-64" />
        </header>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Events Tab */}
          {activeTab === "events" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Event Management</CardTitle>
                  <CardDescription>Review and manage submitted events</CardDescription>
                </CardHeader>
                <CardContent>
                  <h3 className="font-medium mb-4">Pending Events</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Organizer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingEvents.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">{event.title}</TableCell>
                          <TableCell>{event.organizer}</TableCell>
                          <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{event.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                              Pending
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" className="mr-2">
                              View
                            </Button>
                            <Button size="sm" className="bg-green-500 hover:bg-green-600">
                              Approve
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <h3 className="font-medium mt-8 mb-4">Approved Events</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Organizer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {approvedEvents.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">{event.title}</TableCell>
                          <TableCell>{event.organizer}</TableCell>
                          <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{event.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-500">Approved</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" className="mr-2">
                              View
                            </Button>
                            <Button variant="outline" size="sm" className="mr-2">
                              Edit
                            </Button>
                            <Button variant="destructive" size="sm">
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage users and their roles</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              user.role === "Admin"
                                ? "bg-purple-100 text-purple-800"
                                : user.role === "Organizer"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date().toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" className="mr-2">
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="mr-2">
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm">
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <Card>
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
                <CardDescription>View key metrics and statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">25</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-yellow-600">Pending Approval</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-yellow-600">3</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-blue-600">Total Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">150</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-purple-600">Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-purple-600">10</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Event Distribution</CardTitle>
                      <CardDescription>By Category</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-40 flex items-end justify-around">
                        {[{ name: "Conferences", count: 7 }, { name: "Workshops", count: 5 }, { name: "Competitions", count: 4 }, { name: "Other", count: 3 }].map((item, index) => (
                          <div key={index} className="flex flex-col items-center">
                            <div
                              className="bg-purple-500 w-10 rounded-t-md"
                              style={{ height: `${item.count * 20}px` }}
                            ></div>
                            <span className="mt-2 text-xs text-center">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>User Growth</CardTitle>
                      <CardDescription>Monthly growth trend</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-40 flex items-end justify-around">
                        {[10, 15, 20, 25, 35, 45, 60, 80, 100, 120, 135, 150].map((value, index) => (
                          <div key={index} className="flex flex-col items-center">
                            <div
                              className="bg-blue-500 w-2 rounded-t-md"
                              style={{ height: `${value / 2}px` }}
                            ></div>
                            <span className="mt-2 text-xs text-center">{["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][index]}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure general platform settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input id="site-name" defaultValue="EventHub" className="md:col-span-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <Label htmlFor="email-from">Email From Address</Label>
                  <Input id="email-from" defaultValue="noreply@eventhub.com" className="md:col-span-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input id="support-email" defaultValue="support@eventhub.com" className="md:col-span-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue="USD">
                    <SelectTrigger id="currency" className="md:col-span-2">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto bg-purple-500 hover:bg-purple-600">Save Changes</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}