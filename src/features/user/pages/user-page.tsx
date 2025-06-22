import { Input } from "@/components/shadcn/input";
import { User } from "@/models/user";
import { Search } from "lucide-react";
import { useState } from "react";
import { UserCard } from "../components/user-card";
import { AddUserDialog } from "../components/add-user-dialog";

export default function UserPage() {
    const [searchUser, setSearchUser] = useState("");

    const users: User[] = [
        {
            id: "1",
            username: "rainerevan",
            fullname: "Rainer Evan",
            email: "rainerevan@gmail.com",
            role: "owner|divisi|admin",
            isActive: true
        },
        {
            id: "2",
            username: "userowner",
            fullname: "Owner",
            email: "owner@gmail.com",
            role: "owner",
            isActive: true
        },
        {
            id: "3",
            username: "userdivisi",
            fullname: "Divisi",
            email: "divisi@gmail.com",
            role: "divisi",
            isActive: true
        },
        {
            id: "4",
            username: "userwshead",
            fullname: "WS Head",
            email: "wshead@gmail.com",
            role: "wshead",
            isActive: true
        },
        {
            id: "5",
            username: "userdriver",
            fullname: "Driver",
            email: "driver@gmail.com",
            role: "driver",
            isActive: false
        }
    ]

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchUser.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col">
            {/* Main content */}
            <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">User</h1>
                    <AddUserDialog />
                </div>

                <div className="flex flex-col gap-3">
                    {/* Search Bar */}
                    <div className="relative flex w-full items-center space-x-2">
                        <Search className="h-5 w-5 absolute top-1/2 -translate-y-1/2 left-3 text-medium" />
                        <Input
                            type="text"
                            placeholder="Cari nama user"
                            className="w-full pl-10"
                            value={searchUser}
                            onChange={(e) => setSearchUser(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center">
                        <p className="text-sm text-muted-foreground">
                            Total Data: <span className="font-medium">{filteredUsers.length}</span>
                        </p>
                    </div>

                    <div className="flex flex-col gap-5">
                        {filteredUsers.map((user) => (
                            <UserCard
                                key={user.id}
                                user={user}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}