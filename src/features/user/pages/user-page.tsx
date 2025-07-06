import { useEffect, useState } from "react"
import { Input } from "@/components/shadcn/input"
import { Search } from "lucide-react"
import { UserCard } from "../components/user-card"
import { AddUserDialog } from "../components/add-user-dialog"
import { useLoading } from "@/lib/loading-context"
import { supabase } from "@/lib/supabaseClient"
import { User } from "@/models/user"

export default function UserPage() {
  const { setLoading } = useLoading();
  const [searchUser, setSearchUser] = useState("")
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.rpc("get_all_users");


        if (error) {
          console.error("Failed to fetch users:", error.message);
          return;
        }

        const mappedUsers: User[] = (data || []).map((u: any) => ({
          id: u.id,
          username: u.username || u.email,
          fullname: u.username || "", // kamu bisa pakai fullname kalau ada field-nya
          email: u.email,
          role: u.role || "-",
          isActive: u.status === "active", // asumsi field `status` ada: "active"/"inactive"
        }));

        setUsers(mappedUsers);
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 md:max-w-6xl md:mx-auto md:w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">User</h1>
          <AddUserDialog />
        </div>

        <div className="flex flex-col gap-3">
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
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
